from google import genai
from google.genai import types
from dotenv import load_dotenv
import os

load_dotenv()
GEMINI_API_KEY=os.getenv("GEMINI_API_KEY")

model = genai.Client(api_key=GEMINI_API_KEY)

def get_matching_products(user_query: str, product_names: list[str]) -> list[str]:
    prompt = f"""
You are a smart shopping assistant.

The customer said: "{user_query}"

Here is the list of all available product names:
{product_names}

From this list, return a plain Python list of product names that match what the user is asking for.
Only include relevant matches. You can infer meaning even if exact words are not present (e.g. 'music' → 'Bluetooth speaker').
Your response must be a plain Python list, e.g.: ['Wireless Bluetooth Headphones', 'Portable Bluetooth Speaker']
"""

    try:
        response = model.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.4,
                top_p=1.0,
                top_k=40
            )
        )
        output = response.text.strip()

        # Evaluate safely
        matches = eval(output)
        if isinstance(matches, list):
            return matches
    except Exception as e:
        print("Gemini product match error:", e)

    return []