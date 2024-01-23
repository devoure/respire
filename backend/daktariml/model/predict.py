import librosa
import numpy as np
from tensorflow.keras.models import load_model

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

classes = ["COPD", "Bronchiolitis ", "Pneumoina", "URTI", "Healthy"]


def predict(audio):
    val = []
    model = load_model(BASE_DIR / 'model/gru-model.h5')
    audio_dir = audio
    features = 52
    data_x, sampling_rate = librosa.load(audio_dir, res_type='kaiser_fast')
    mfccs = np.mean(librosa.feature.mfcc(y=data_x, sr=sampling_rate,
                                         n_mfcc=features).T, axis=0)
    val.append(mfccs)
    val = np.expand_dims(val, axis=1)

    return(classes[np.argmax(model.predict(val))])


