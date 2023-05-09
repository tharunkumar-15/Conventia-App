from pyannote.audio import Pipeline
from pyannote.core import Segment
from pyannote.audio import Audio
import urllib.request
import whisper
import os


def startDiarization(url,UserName,RelativeName):
    speaker_diarization = Pipeline.from_pretrained("pyannote/speaker-diarization@2.1", 
                           use_auth_token="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")
    
    audio_url=url
    urllib.request.urlretrieve(audio_url, 'D:/DownloadedFiles/audio.wav')
    audio_file="D:/DownloadedFiles/audio.wav"
    who_speaks_when = speaker_diarization(audio_file, num_speakers=2, min_speakers=1, max_speakers=2)
    who_speaks_when = who_speaks_when.rename_labels({"SPEAKER_00": UserName, "SPEAKER_01": RelativeName})
    model = whisper.load_model("small")
    # transcribing first minute
    audio = Audio(sample_rate=16000, mono=True)
    first_minute = Segment(0, 60)
    result=""
    for segment, _, speaker in who_speaks_when.crop(first_minute).itertracks(yield_label=True):
        waveform, sample_rate = audio.crop(audio_file, segment)
        text = model.transcribe(waveform.squeeze().numpy())["text"]
        # result+=(f"{speaker}: {text}\n")
        result += f"{speaker}: {text}{os.linesep}"
        # result = result + ({speaker} +":"+ {text}) + '\n' 
        # print(f"{speaker}: {text}")
    
    return result
