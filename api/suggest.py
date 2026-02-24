from fastapi import FastAPI
from pydantic import BaseModel
import google.generativeai as genai
import os
import json

app = FastAPI()

class RecipeRequest(BaseModel):
    time: str = "unset"
    diet: str = "unset"
    difficulty: str = "unset"
    language: str = "de"

@app.post("/api/suggest")
def get_suggestion(data: RecipeRequest):
    genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    prompt = f"""
    Suggest a recipe:
    Time: {data.time}, Diet: {data.diet}, Difficulty: {data.difficulty}.
    Language: {data.language}.
    Return ONLY JSON: {{"title": "", "ingredients": [], "instructions": ""}}
    """
    
    response = model.generate_content(prompt)
    
    # cleanup json
    clean_text = response.text.replace('```json', '').replace('```', '').strip()
    return json.loads(clean_text)