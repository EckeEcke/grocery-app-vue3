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

            models = []
            for m in genai.list_models():
                if 'generateContent' in m.supported_generation_methods:
                    models.append(m.name)
            
            # Schick die Liste SOFORT zurück, bevor irgendwas anderes schiefgehen kann
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"available_models": models}).encode('utf-8'))
            return
            # self.wfile.write(answer_text.strip().encode('utf-8'))

        except Exception as e:
            # Fehler senden
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            error_response = json.dumps({"error": str(e)})
            self.wfile.write(error_response.encode('utf-8'))