import tempfile
import os
from pydub import AudioSegment
import speech_recognition as sr

async def transcribe(file):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as temp_input:
        temp_input.write(await file.read())
        input_path = temp_input.name

    try:
        # Convert to PCM WAV
        sound = AudioSegment.from_file(input_path)
        sound = sound.set_channels(1).set_frame_rate(16000)
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_wav:
            output_path = temp_wav.name
            sound.export(output_path, format="wav")

        # Transcribe with Google Speech Recognition
        recognizer = sr.Recognizer()
        with sr.AudioFile(output_path) as source:
            audio = recognizer.record(source)
            text = recognizer.recognize_google(audio)
            return text

    finally:
        os.remove(input_path)
        if os.path.exists(output_path):
            os.remove(output_path)