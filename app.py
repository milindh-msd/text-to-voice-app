from flask import Flask, render_template, request, redirect, url_for
import pyttsx3
import threading

app = Flask(__name__)

selected_voice = None

def speak(text):
    engine = pyttsx3.init()
    voices = engine.getProperty('voices')

    engine.setProperty('rate', 170)
    engine.setProperty('volume', 1.0)

    if selected_voice == "female" and len(voices) > 1:
        engine.setProperty('voice', voices[1].id)
    else:
        engine.setProperty('voice', voices[0].id)

    engine.say(text)
    engine.runAndWait()
    engine.stop()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/select')
def select_voice():
    return render_template('select.html')

@app.route('/setvoice', methods=['POST'])
def set_voice():
    global selected_voice
    selected_voice = request.form['voice']
    return redirect(url_for('app_page'))

@app.route('/app')
def app_page():
    return render_template('app.html')

@app.route('/speak', methods=['POST'])
def speak_text():
    text = request.form.get('text')

    if text:
        threading.Thread(target=speak, args=(text,)).start()

    return '', 204

if __name__ == '__main__':
    app.run(debug=True)