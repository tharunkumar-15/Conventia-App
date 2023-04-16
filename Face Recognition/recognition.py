from pydoc import classname
import cv2
import numpy as np
import face_recognition
import os
from PIL import Image
from urllib.request import urlopen

# path='Stored Images'
# images=[]
# classNames=[]
# myList=os.listdir(path)
# print("myList: ",myList)

# for cl in myList:
#   curImg=cv2.imread(f'{path}/{cl}')
#   images.append(curImg)
#   classNames.append(os.path.splitext(cl)[0])

# def findEncodings(images):  
#   encodeList=[]
#   for img in images:
#     img=cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
#     encode=face_recognition.face_encodings(img)[0]
#     encodeList.append(encode)
#   return encodeList


# print('Encoding Complete')
# encodeListKnown=findEncodings(images)

# testPath='Test'
# testImages=[]
# testList=os.listdir(testPath)
# testClassNames=[]

# for cl in testList:
#   curImg=cv2.imread(f'{testPath}/{cl}')
#   testImages.append(curImg)
#   testClassNames.append(os.path.splitext(cl)[0])

# for img in testImages:

    # if(matches[matchIndex]):
    #   predictedName=classNames[matchIndex]
    #   actualName=classNames[matchIndex]
    #   print("predictedName: ",predictedName)
    #   print("actualName: ",actualName)
    #   print("************************")

def predictFace(image,images={}):
  encodeListKnown=[]
  classNames = list(images.keys())
  for img in images.values():
    img=cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
    encode=face_recognition.face_encodings(img)[0]
    encodeListKnown.append(encode)

  img=cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
  if(len(face_recognition.face_encodings(img))==0): return "Face not found"
  encode=face_recognition.face_encodings(img)[0]
  matches=face_recognition.compare_faces(encodeListKnown,encode)
  faceDis=face_recognition.face_distance(encodeListKnown,encode)
  matchIndex=np.argmin(faceDis)

  if faceDis[matchIndex]< 0.50:
    name = classNames[matchIndex].upper()
  else: name = 'Unknown'

  return name
