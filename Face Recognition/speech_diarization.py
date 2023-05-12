from pyannote.audio import Pipeline
from pyannote.core import Segment
from pyannote.audio import Audio
import urllib.request
import whisper
import os
from pydub import AudioSegment
from io import BytesIO



def startDiarization(url,UserName,RelativeName):
    speaker_diarization = Pipeline.from_pretrained("pyannote/speaker-diarization@2.1", 
                           use_auth_token="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")
    
    audio_url=url
    audio_path = 'D:/DownloadedFiles/audio'
    urllib.request.urlretrieve(audio_url, audio_path)
    # convert audio file to WAV format using pydub
    audio = AudioSegment.from_file(audio_path)
    audio = audio.set_frame_rate(16000) # set the frame rate to 16000 Hz
    audio = audio.set_channels(1) # set the number of channels to 1 (mono)
    audio_path_wav = os.path.splitext(audio_path)[0] + '.wav'
    audio.export(audio_path_wav, format="wav") # export the audio to WAV format

    # audio_file="D:/DownloadedFiles/audio.wav"
    who_speaks_when = speaker_diarization(audio_path_wav, num_speakers=2, min_speakers=1, max_speakers=2)
    who_speaks_when = who_speaks_when.rename_labels({"SPEAKER_00": UserName, "SPEAKER_01": RelativeName})
    model = whisper.load_model("small")
    # transcribing first minute
    audio = Audio(sample_rate=16000, mono=True)
    first_minute = Segment(0, 60)
    result=""
    for segment, _, speaker in who_speaks_when.crop(first_minute).itertracks(yield_label=True):
        waveform, sample_rate = audio.crop(audio_path_wav, segment)
        text = model.transcribe(waveform.squeeze().numpy())["text"]
        # result+=(f"{speaker}: {text}\n")
        result += f"{speaker}: {text}{os.linesep}"
        # result = result + ({speaker} +":"+ {text}) + '\n' 
        # print(f"{speaker}: {text}")
    return result
