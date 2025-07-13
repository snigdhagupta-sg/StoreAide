from pymongo.collection import Collection
from bson import ObjectId
from fastapi import HTTPException

def get_cart_items(db, user_id="guest"):
    cart = db.cart.find_one({"userId": user_id})
    if not cart:
        return []

    product_ids = [ObjectId(item["productId"]) for item in cart["items"]]
    products = db.Products.find({"_id": {"$in": product_ids}})

    product_map = {str(prod["_id"]): prod for prod in products}
    final_cart = []
    for item in cart["items"]:
        prod = product_map.get(item["productId"])
        if prod:
            final_cart.append({
                "id": str(prod["_id"]),
                "name": prod["name"],
                "price": prod["price"],
                "quantity": item["quantity"],
                "image": prod.get("image")
            })
    return final_cart


def add_or_update_cart_item(db, product_id, quantity, user_id="guest"):
    if not ObjectId.is_valid(product_id):
        raise HTTPException(status_code=400, detail="Invalid product ID")

    cart = db.cart.find_one({"userId": user_id})
    
    if not cart:
        # Create a new cart
        db.cart.insert_one({
            "userId": user_id,
            "items": [{"productId": product_id, "quantity": quantity}]
        })
    else:
        # Check if the product already exists in the cart
        existing_item = next((item for item in cart["items"] if item["productId"] == product_id), None)
        
        if existing_item:
            # Update the quantity
            db.cart.update_one(
                {"userId": user_id, "items.productId": product_id},
                {"$set": {"items.$.quantity": quantity}}
            )
        else:
            # Add the new product to the cart
            db.cart.update_one(
                {"userId": user_id},
                {"$push": {"items": {"productId": product_id, "quantity": quantity}}}
            )
    
    return {"message": "Item added/updated in cart"}



def remove_cart_item(db, product_id, user_id="guest"):
    result = db.cart.update_one(
        {"userId": user_id},
        {"$pull": {"items": {"productId": product_id}}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Item not found in cart")
    return {"message": "Item removed from cart"}
