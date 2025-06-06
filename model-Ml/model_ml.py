import io
import numpy as np
import pandas as pd
import tensorflow as tf
import tensorflow_hub as hub
import librosa
import tempfile
import os

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from moviepy import VideoFileClip

app = FastAPI()

model = hub.load('https://tfhub.dev/google/yamnet/1')

class_map_path = tf.keras.utils.get_file(
    'yamnet_class_map.csv',
    'https://raw.githubusercontent.com/tensorflow/models/master/research/audioset/yamnet/yamnet_class_map.csv')
class_names = pd.read_csv(class_map_path)['display_name']

VIDEO_EXT = [".mp4", ".mkv", ".webm", ".mov", ".avi"]

def extract_audio_from_video(file_path: str) -> np.ndarray:
    with VideoFileClip(file_path) as video:
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp_audio:
            tmp_audio_path = tmp_audio.name
        # Bỏ verbose và logger vì moviepy không nhận nữa
        video.audio.write_audiofile(tmp_audio_path, fps=16000)
        wav_data, _ = librosa.load(tmp_audio_path, sr=16000, mono=True)
        os.remove(tmp_audio_path)
        return wav_data.astype(np.float32)

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    filename = file.filename.lower()
    suffix = os.path.splitext(filename)[1]

    # Lưu tạm file upload
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp_file:
        tmp_path = tmp_file.name
        tmp_file.write(await file.read())
        tmp_file.flush()

    try:
        if suffix in VIDEO_EXT:
            wav_data = extract_audio_from_video(tmp_path)
        else:
            # Xử lý như file audio bình thường
            audio_bytes = None
            with open(tmp_path, 'rb') as f:
                audio_bytes = f.read()
            audio_buffer = io.BytesIO(audio_bytes)
            wav_data, _ = librosa.load(audio_buffer, sr=16000, mono=True)
            wav_data = wav_data.astype(np.float32)

        scores, embeddings, spectrogram = model(wav_data)
        mean_scores = tf.reduce_mean(scores, axis=0).numpy()
        top5_idx = np.argsort(mean_scores)[-5:][::-1]
        genres = [class_names[i] for i in top5_idx]

        return JSONResponse(content={"genre": genres})

    except Exception as e:
        return JSONResponse(content={"error": f"Processing failed: {str(e)}"}, status_code=500)

    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
