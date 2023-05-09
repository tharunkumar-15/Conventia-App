from email.policy import default
from flask import Flask,request,jsonify
from werkzeug.utils import secure_filename
import recognition as faceRecognition
import speech_diarization
import summarization
import numpy
import cv2
from firebase_admin import credentials,initialize_app,firestore
from PIL import Image
import requests
from io import BytesIO
from urllib.request import urlopen
import requests
import datetime
from PIL import Image
from flask_cors import CORS

cred=credentials.Certificate("key.json")
default_app=initialize_app(cred)
db=firestore.client()
app=Flask(__name__)
CORS(app)

def getRelativesImages(userId):
    try:
      print("Userid",userId)
      userRelationsRef=db.collection('Users').document(userId).collection('Relatives')
      relatives=[doc.to_dict() for doc in userRelationsRef.stream()]
      relativeImages={}
      print("Relatives",relatives)
      for relative in relatives:
        resp = urlopen(relative['ImageUri'])
        img = numpy.asarray(bytearray(resp.read()), dtype="uint8")
        img = cv2.imdecode(img, cv2.IMREAD_COLOR)
        print("Relativeid:",relative['Id'],str(relative['Id']))
        relativeImages[str(relative['Id'])]=img
    except Exception as e:
      return f"Tharun error An error occured: {e}"
    return relativeImages

def postSummarizedText(userId, RelativeId, Important, SummaryTitle,Summary,SummaryDate):
  try:
    userConversation=db.collection('Users').document(userId).collection('Relatives').document(RelativeId).collection('RecordedConversation').document()
    userConversation.set({
      'Important':Important,
      'RelativeId':RelativeId,
      'SummaryTitle':SummaryTitle,
      'Summary':Summary,
      'SummaryDate':SummaryDate
    })
  except Exception as e:
    return f"Sending Data Error: {e}"
  return f"Success"


@app.route('/predict-face',methods=['POST'])
def predictFace():
  print("predict fun called")
  userId=request.args.get('id')
  data = request.get_json()
  print("user image: ",data['url'])
  resp = urlopen(data['url'])
  img = numpy.asarray(bytearray(resp.read()), dtype="uint8")
  img = cv2.imdecode(img, cv2.IMREAD_COLOR)
  images=getRelativesImages(userId)
  predictedFace=faceRecognition.predictFace(img,images)
  return jsonify({'face':predictedFace})

# @app.route('/predict-face',methods=['POST'])
# def predictFace():
#   userId=request.args.get('id')
#   if 'file' not in request.files:
#     return jsonify({'error':'media not provided'}),400
#   file=request.files['file']
#   if file.filename=='':
#     return jsonify({'error': 'no file selected'}),400
#   if file:
#     filename=secure_filename(file.filename)
#     #read image file string data
#     filestr = file.read()
#     #convert string data to numpy array
#     file_bytes = numpy.fromstring(filestr, numpy.uint8)
#     # convert numpy array to image
#     img = cv2.imdecode(file_bytes, cv2.IMREAD_UNCHANGED)
#     images=getRelativesImages(userId)
#     predictedFace=faceRecognition.predictFace(img,images)
#     return jsonify({'face':predictedFace})

@app.route('/perform-summarization',methods=['POST'])
def speechDiarization():
  data = request.get_json()
  DiarizationResult= speech_diarization.startDiarization(data['url'],data['UserName'],data['RelativeName'])
  SummarizationResult= summarization.perform_summarization(DiarizationResult)
  currentDate = datetime.datetime.now()
  formattedDate=((currentDate.strftime("%d-%m-%Y"))+" "+currentDate.strftime("%I:%M:%S %p"))
  finalresult=postSummarizedText(data['userId'],data['RelativeId'],data['Important'],data['SummaryTitle'],SummarizationResult,formattedDate)
  print(finalresult)
  return jsonify({'Summarization':SummarizationResult})
  

  

if __name__=='__main__':
  app.run(debug=True)
