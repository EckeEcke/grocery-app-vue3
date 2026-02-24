from http.server import BaseHTTPRequestHandler
import google.generativeai as genai
import json
import os

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)

            api_key = os.environ.get("GEMINI_API_KEY")
            genai.configure(api_key=api_key)

            model = genai.GenerativeModel('models/gemini-flash-lite-latest')

            # Inspiration verarbeiten
            inspiration_list = data.get('inspiration', [])
            inspiration_text = ""
            if inspiration_list:
                titles = [i.get('name') for i in inspiration_list if i.get('name')]
                inspiration_text = f" Der Nutzer mag bereits folgende Gerichte: {', '.join(titles)}. Nutze diese als Inspiration für den Stil oder die Zutaten."

            prompt = (
                f"Erstelle ein neues Rezept: {data.get('diet', 'egal')}, "
                f"Zeit: {data.get('time', '15 min')}.{inspiration_text} "
                f"Sprache: {data.get('language', 'de')}. "
                f"Antworte AUSSCHLIESSLICH mit einem validen JSON-Objekt in folgendem Format: "
                f"{{"
                f"  \"name\": \"Name des Gerichts\","
                f"  \"ingredients\": [\"Menge + Zutat 1\", \"Menge + Zutat 2\"],"
                f"  \"instructions\": \"Ein zusammenhängender Text oder mit \\n getrennte Schritte\""
                f"}}"
            )
            
            response = model.generate_content(prompt)
            answer_text = response.text
            
            if "```json" in answer_text:
                answer_text = answer_text.split("```json")[1].split("```")[0]
            elif "```" in answer_text:
                answer_text = answer_text.split("```")[1].split("```")[0]

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(answer_text.strip().encode('utf-8'))

        except Exception as e:
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))