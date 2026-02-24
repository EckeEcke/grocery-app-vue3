from http.server import BaseHTTPRequestHandler
import google.generativeai as genai
import json
import os

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # 1. Daten einlesen
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)

            # 2. Gemini Setup
            api_key = os.environ.get("GEMINI_API_KEY")
            if not api_key:
                raise ValueError("API Key fehlt")

            genai.configure(api_key=api_key)
            model = genai.GenerativeModel('models/gemini-1.5-flash-latest')

            # 3. KI-Anfrage
            prompt = f"Erstelle ein Rezept: {data.get('diet', 'egal')}, Zeit: {data.get('time', '15 min')}. Sprache: {data.get('language', 'de')}. Antworte NUR als valides JSON-Objekt mit title (string), ingredients (list), instructions (string)."
            
            response = model.generate_content(prompt)
            
            # Säubern von Markdown-Blöcken
            answer_text = response.text
            if "```json" in answer_text:
                answer_text = answer_text.split("```json")[1].split("```")[0]
            elif "```" in answer_text:
                answer_text = answer_text.split("```")[1].split("```")[0]

            # 4. Erfolg senden
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(answer_text.strip().encode('utf-8'))

        except Exception as e:
            # Fehler senden
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            error_response = json.dumps({"error": str(e)})
            self.wfile.write(error_response.encode('utf-8'))