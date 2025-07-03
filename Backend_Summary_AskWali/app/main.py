from fastapi import FastAPI, File
from fastapi import Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
app = FastAPI()
from dotenv import load_dotenv
from google import genai
import os
load_dotenv()

client = genai.Client(api_key = os.getenv("GENAI_API_KEY"))

from pydantic import BaseModel

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def return_reply_to_selected_text(text: str) -> dict:
    prompt = (
        f"""This is an ecommerce website. Probably the message is about some product or some feature of a product. 
        So you have to give a BRIEF meaning/description of it and then 
        If it is a feature: you have tell about it good and bad effects and if someone is buying it its being more is good or its being bad.
        How much of it is the best giving todays senario etc.
        If it is product: then tell about all its feature and that features good and bad effects and if someone is buying it its being more is good or its being bad.
        How much of it is the best giving todays senario etc.
        Otherwise if its a simple message regarding some other if info or a simple hi, hello, thank you message reply politely and respectfully accordingly.
        The message of the user is: {text}
        Only send your reply in response"""
    )
    print("✅ Gemini prompt:\n", prompt)

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )
    print("✅ Gemini response:\n", response.text)
    return response.text


class Message(BaseModel):
    user_input: str

@app.post("/chat")
async def chat(message: Message):
    user_text = message.user_input
    prompt = (
        f"""This is an ecommerce website. Probably the message is about some product or some feature of a product. 
        So you have to give a BRIEF meaning/description of it and then 
        If it is a feature: you have tell about it good and bad effects and if someone is buying it its being more is good or its being bad.
        How much of it is the best giving todays senario etc.
        If it is product: then tell about all its feature and that features good and bad effects and if someone is buying it its being more is good or its being bad.
        How much of it is the best giving todays senario etc.
        Otherwise if its a simple message regarding some other if info or a simple hi, hello, thank you message reply politely and respectfully accordingly.
        The message of the user is: {message}
        Only send your reply in response"""
    )
    print("✅ Gemini prompt:\n", prompt)

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )
    reply_text = response.text 
    print("✅ Gemini response:\n", response.text)

    return {"reply": reply_text}

@app.post("/reply_to_selected_text/")
async def reply_to_selected_text(data: dict):
    text = data.get("text", "")
    response_text = return_reply_to_selected_text(text)
    return response_text


# Summarize!
from typing import List
def summarize_reviews_prompt(reviews: list) -> str:
    reviews_text = "\n".join([f"- {r}" for r in reviews])
    prompt = (
        f"""You are an expert at summarizing customer feedback for an ecommerce website.
Here are several user reviews about a product or service:
{reviews_text}
Please provide a summary of the main points (in bullets), highlighting common praises, complaints, and overall sentiment.
Only send your summary in response."""
    )
    print("✅ Gemini prompt:\n", prompt)
    return prompt

class ReviewsRequest(BaseModel):
    reviews: List[str]

@app.post("/summarize_reviews")
async def summarize_reviews(request: ReviewsRequest):
    prompt = summarize_reviews_prompt(request.reviews)
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )
    summary = response.text
    print("✅ Gemini summary:\n", summary)
    return {"summary": summary}