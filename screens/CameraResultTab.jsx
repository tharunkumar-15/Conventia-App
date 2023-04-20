import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image,ActivityIndicator } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import CustomButton from '../CustomButton';
import PreviousConverstionTab from './PreviousConversationTab';
import NewConversationTab from './NewConversationTab';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { auth, db, storage } from '../config';
import { doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { detect } from '../Face Recognition/env/Lib/site-packages/cmake/data/doc/cmake/html/_static/underscore-1.3.1';

function CameraResultTab() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { user } = useSelector(state => state.useReducer);
  const [imagePath, setImagePath] = useState('');
  const [photoTaken, setPhotoTaken] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [response, setResponse] = useState("");
  const [loading,setLoading]=useState(true);

  // useEffect(()=>{
  //   loadingscreen();
  // },[])

  // const loadingscreen=()=>{
  //   console.log("loadingscreen called");
  //   setLoading(!loading)
  // }

  useEffect(()=>{
    console.log("UseEffect called for response");
    responsedata();
  },[response])

  const uploadimage = async () => {
    setLoading(true);
    console.log('upload function called');
    const blobImage = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError('Newtork error failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', imagePath, true);
      xhr.send(null);
    });

    const metadata = {
      contentType: 'image/jpeg',
    };

    const storageRef = ref(storage, 'PredictFace/' + Date.now());
    const snapshot = await uploadBytesResumable(
      storageRef,
      blobImage,
      metadata,
    );
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    console.log("Download URL : ", downloadURL)
    setResponse("aYPgBM0d33kNseejSZP3");
    console.log("Response:",response)
    // axios.post(`http://10.0.2.2:5000/predict-face?id=${user}`, { url: downloadURL })
    //   .then(response => {
    //     // Handle the response datarr
    //     console.log("Response: ", response.data);
    //     setResponse("Unknown face");
    //     //store it in useState 
    //     //TODO
    //     // detectedFace
    //     // initial value of useState: {face:''}
    //     // {face:'Face not found'}
    //     // {face:'Unknown'}
    //     // {face:'12345tascuygadua'}
    //   })
      // .catch(error => {
      //   console.log("Error: ", error.response.data)
      //   console.error(error);
      // });

    setIsImageUploaded(true); // <-- Set state variable to true after image upload
  };

  const responsedata=()=>{
    if(response=='Unknown')
    {
      setLoading(false);
      console.log("Called inside response of unknown")
      navigation.navigate("Home", { screen: 'UserPage' });
    }
    else if(response=='Face not found')
    {
      setLoading(false);
      navigation.navigate("Home", { screen: 'UserPage' });
    }
    else if(response!='')
    {
       setLoading(false);
       console.log(response)
    }
    // else
    // {
    //   navigation.navigate("CameraResultTab");
    // }
  }

  useEffect(() => {
    if (imagePath !== '' && !isImageUploaded) {
      // <-- Add check for isImageUploaded
      uploadimage();
      setImagePath('');
    } else if (isImageUploaded) {
      // <-- Reset state variable to false after image upload
      setIsImageUploaded(false);
    }
  }, [imagePath, isImageUploaded]);


  useEffect(() => {
    if (isFocused) {
      takePhoto();
    }
  }, [isFocused]);

  function takePhoto() {
    console.warn("Captured");
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image.path);
      setImagePath(image.path);
      setPhotoTaken(true);
    }).catch(() => {
      navigation.navigate("Home", { screen: 'UserPage' });
    });
  }

  useEffect(() => {
    const removeListener = navigation.addListener('beforeRemove', (e) => {
      if (!isFocused) {
        return;
      }

      if (!photoTaken) {
        e.preventDefault(); // Prevent default behavior of leaving the screen
      }

      // Navigate to the home screen
      navigation.navigate("Home", { screen: 'UserPage' });
    });

    return removeListener;
  }, [navigation, isFocused, photoTaken]);

  return (
    <View style={styles.usercontainer}>
      {loading? (
        <View>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <React.Fragment>
          <Text style={styles.welcometext}>Details of detected face</Text>
          {imagePath ? (
            <Image
              source={{ uri: `file://${imagePath}` }}
              style={styles.loginimage}
              resizeMode="stretch"
            />
          ) : null}
          <Text style={styles.detecteddetails}>Surya S</Text>
          <Text style={styles.detecteddetails}>Friend</Text>
          <CustomButton
            buttonTitle="Access Previous Conversations"
            buttonStyle={{
              width: '50%',
            }}
            textstyle={{
              fontSize: 16,
            }}
            onPress={() => navigation.navigate(PreviousConverstionTab)}
          />
          <CustomButton
            buttonTitle="Start Recording a new Conversation"
            buttonStyle={{
              width: '50%',
              padding: 12,
            }}
            textstyle={{
              fontSize: 16,
            }}
            onPress={() => navigation.navigate(NewConversationTab)}
          />
        </React.Fragment>
      )}
    </View>
  );  
}

export default CameraResultTab;

const styles = StyleSheet.create({
  usercontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcometext: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  loginimage: {
    width: 150,
    height: 150,
    borderRadius: 80,
    marginBottom: 20,
    marginTop: 20,
  },
  detecteddetails: {
    marginBottom: 10,
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
