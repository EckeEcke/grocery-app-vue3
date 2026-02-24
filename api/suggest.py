from fastapi import FastAPI
from pydantic import BaseModel
import google.generativeai as genai
import os
import json

app = FastAPI()

class RecipeRequest(BaseModel):
    time: str = "egal"
    diet: str = "egal"
    difficulty: str = "egal"
    language: str = "de"

@app.post("/api/suggest")
def get_suggestion(data: RecipeRequest):
    try:
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            return {"error": "API Key nicht gefunden"}

        genai.configure(api_key=api_key)

        model = genai.GenerativeModel('models/gemini-1.5-flash-latest')
        
        prompt = f"Erstelle ein Rezept: Zeit {data.time}, Diät {data.diet}, Sprache {data.language}. Antworte NUR als JSON."
        response = model.generate_content(prompt)
        
        # cleanup markdown
        clean_json = response.text.replace("```json", "").replace("```", "").strip()
        return json.loads(clean_json)
    except Exception as e:
        return {"error": str(e)}

handler = app