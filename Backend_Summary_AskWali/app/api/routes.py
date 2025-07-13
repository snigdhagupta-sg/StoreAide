from fastapi import APIRouter, UploadFile, File, Request
from fastapi.responses import JSONResponse
from services import transcription_service
from services import cart_service,gemini
router=APIRouter()

@router.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    try:
        text = await transcription_service.transcribe(file)
        return {"transcription": text}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


# Cart Routes
@router.get("/cart")
def get_cart(request: Request):
    db = request.app.mongodb
    return {"items": cart_service.get_cart_items(db)}

# ➕ Add or update cart_service item
@router.post("/cart")
def add_to_cart(request: Request, payload: dict):
    db = request.app.mongodb
    product_id = payload.get("productId")
    quantity = payload.get("quantity", 1)
    return cart_service.add_or_update_cart_item(db, product_id, quantity)

# ❌ Remove cart_service item
@router.delete("/cart/{product_id}")
def remove_from_cart(request: Request, product_id: str):
    db = request.app.mongodb
    return cart_service.remove_cart_item(db, product_id)

@router.post("/chat")
async def search_products(request: Request):
    db = request.app.mongodb
    body = await request.json()
    query = body.get("message")  # accept both "query" and "message" for flexibility

    if not query:
        return JSONResponse(status_code=400, content={"error": "Missing query or message"})

    # Step 1: Get all product names from DB
    product_docs = list(db.Products.find({}, {"_id": 0, "name": 1}))
    product_names = [prod["name"] for prod in product_docs]

    # Step 2: Ask Gemini to match product names
    matched_names = gemini.get_matching_products(query, product_names)[:5]  # limit to 5 results

    if not matched_names:
        return {"reply": "Sorry, I couldn't find anything relevant.", "products": []}

    # Step 3: Fetch product details from DB for matched names
    matched_products = list(db.Products.find({"name": {"$in": matched_names}}))

    results = []
    for p in matched_products:
        results.append({
            "id": str(p["_id"]),
            "name": p["name"],
            "price": p.get("price", 0),
            "image": p.get("image", "/placeholder.jpg")
        })
    print(results)
    return {
        "reply": "Here are some options you might like:",
        "products": results
    }
