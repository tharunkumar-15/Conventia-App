from email.policy import default
from flask import Flask,request,jsonify
from werkzeug.utils import secure_filename
import recognition as faceRecognition
import numpy
import cv2
from firebase_admin import credentials,initialize_app,firestore
from PIL import Image
import requests
from io import BytesIO
from urllib.request import urlopen
import requests
from PIL import Image

cred=credentials.Certificate("key.json")
default_app=initialize_app(cred)
db=firestore.client()
app=Flask(__name__)

def getRelativesImages(userId):
    try:
      userRelationsRef=db.collection('Users').document(userId).collection('Relatives')
      relatives=[doc.to_dict() for doc in userRelationsRef.stream()]
      relativeImages={}
      for relative in relatives:
        resp = urlopen(relative['ImageUri'])
        img = numpy.asarray(bytearray(resp.read()), dtype="uint8")
        img = cv2.imdecode(img, cv2.IMREAD_COLOR)
        relativeImages[str(relative['Id'])]=img
    except Exception as e:
      return f"An error occured: {e}"
    return relativeImages


@app.route('/predict-face',methods=['POST'])
def predictFace():
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

if __name__=='__main__':
  app.run(debug=True)
