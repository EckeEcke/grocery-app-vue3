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

            # Wir nehmen das Basis-Modell ohne Suffix, das ist am wenigsten fehleranfällig
            model = genai.GenerativeModel('gemini-1.5-flash')

            prompt = f"Generiere ein Rezept für: {data.get('diet', 'alles')}. Zeit: {data.get('time', 'kurz')}. Antworte NUR als JSON."
            
            response = model.generate_content(prompt)
            
            # Sicherheits-Check: Hat die KI überhaupt Text geliefert?
            if not response.text:
                raise ValueError("KI hat keine Antwort geliefert")

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
            # Wir senden IMMER JSON, damit dein JavaScript nicht crasht
            self.send_response(200) # Wir senden 200, damit das JSON ankommt
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            error_msg = str(e)
            if "429" in error_msg:
                error_msg = "Google Limit erreicht. Bitte 60 Sek. warten."
            self.wfile.write(json.dumps({"error": error_msg}).encode('utf-8'))