import speech_recognition as sr
import language_tool_python
import pronouncing
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Initialize grammar checking tool
grammar_tool = language_tool_python.LanguageTool('en-US')

def recognize_speech():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Speak now...")
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)

    try:
        text = recognizer.recognize_google(audio)
        return text
    except sr.UnknownValueError:
        return "Speech not recognized"
    except sr.RequestError:
        return "Could not request results"

def check_grammar(text):
    matches = grammar_tool.check(text)
    grammar_issues = []
    for match in matches:
        grammar_issues.append({"message": match.message, "incorrect": match.replacements})
    return grammar_issues

def check_pronunciation(text):
    words = text.split()
    pronunciation_issues = {}
    for word in words:
        phonemes = pronouncing.phones_for_word(word)
        if not phonemes:
            pronunciation_issues[word] = "Pronunciation data not found"
    return pronunciation_issues

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/process", methods=["POST"])
def process():
    text = recognize_speech()
    if text in ["Speech not recognized", "Could not request results"]:
        return jsonify({"error": text})
    
    grammar_issues = check_grammar(text)

    pronunciation_issues = check_pronunciation(text)

    return jsonify({"transcribed_text": text, "grammar_issues": grammar_issues, "pronunciation_issues": pronunciation_issues})

if __name__ == "__main__":
    app.run(debug=True)
print("Detected Pronunciation Issues:", pronunciation_issues)