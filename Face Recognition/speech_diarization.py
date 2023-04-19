from pyannote.audio import Pipeline
from pyannote.core import Segment
from pyannote.audio import Audio
import whisper


def startDiarization(path):
    speaker_diarization = Pipeline.from_pretrained("pyannote/speaker-diarization@2.1", 
                           use_auth_token="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")
    
    audio_file = "c:/Users/Suhas/Downloads/plans.wav"
    who_speaks_when = speaker_diarization(audio_file, num_speakers=2, min_speakers=1, max_speakers=2)
    who_speaks_when = who_speaks_when.rename_labels({"SPEAKER_00": "Sheldon", "SPEAKER_01": "Leonard"})
    model = whisper.load_model("small")
    # transcribing first minute
    audio = Audio(sample_rate=16000, mono=True)
    first_minute = Segment(0, 60)
    result=""
    for segment, _, speaker in who_speaks_when.crop(first_minute).itertracks(yield_label=True):
        waveform, sample_rate = audio.crop(audio_file, segment)
        text = model.transcribe(waveform.squeeze().numpy())["text"]
        result+=(f"{speaker}: {text}\n")
        # print(f"{speaker}: {text}")
    
    return result
