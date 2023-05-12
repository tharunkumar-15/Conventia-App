import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomButton from '../CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';
import {auth, db, storage} from '../config';
import axios from 'axios';
import {useSelector} from 'react-redux';
export default function Camerabuttontab({navigation}) {
  const [imagePath, setImagePath] = useState('');
  const [photoTaken, setPhotoTaken] = useState(false);
  const [responseData, setResponseData] = useState({});
  const [loading, setLoading] = useState(false);
  const {user} = useSelector(state => state.useReducer);
  
  useEffect(() => {
    if (imagePath !== '') {
      uploadimage();
      setImagePath('');
    }
  }, [imagePath]);

  useEffect(() => {
    console.log('UseEffect called for response');
    if (Object.keys(responseData).length > 0) responsedata();
  }, [responseData]);

  function takePhoto() {
    console.warn('Captured');
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image.path);
      setImagePath(image.path);
    });
  }

  const selectFile = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        // Update the imagePath state with the selected image path
        setImagePath(image.path);
        setPhotoTaken(true);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

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

    console.log('Download URL : ', downloadURL);
    //setLoading(true)
    axios
      .post(`http://192.168.1.35:5000/predict-face?id=${user}`, {
        url: downloadURL,
      })
      .then(response => {
        console.log('hello world');
        setResponseData(response.data);
        console.log('ResponseData:', responseData.face);
        console.log('Response: ', response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const responsedata = () => {
    if (responseData.face == 'Unknown') {
      setLoading(false);
      console.log('Called inside response of unknown');
      ToastAndroid.show(
        'Unknown Face is been detected',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
      //navigation.navigate("Home", { screen: 'UserPage' });
    } else if (responseData.face == 'Face not found') {
      setLoading(false);
      ToastAndroid.show(
        'Face not found',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
      //navigation.navigate("Home", { screen: 'UserPage' });
    } else {
      setLoading(false);
      console.log('ResponseData:', responseData.face);
      navigation.navigate('CameraResultTab', {relativeid: responseData.face});
    }
  };

  return (
    <View style={styles.camerabuttoncontainer}>
      {loading ? (
        <View>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <View style={styles.buttoncontent}>
          <Text style={styles.pagetext}>
            Select the below options for Face Recognition
          </Text>
          <CustomButton
            buttonTitle="Open Camera"
            buttonStyle={{
              width: '65%',
              marginTop: 25,
              backgroundColor: '#f95999',
            }}
            onPress={() => takePhoto()}
          />
          <CustomButton
            buttonTitle="Select File"
            buttonStyle={{
              width: '63%',
              marginTop: 20,
              backgroundColor: '#f95999',
            }}
            onPress={selectFile}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  camerabuttoncontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F6F3',
  },
  pagetext: {
    fontSize: 19,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttoncontent: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#51087E',
    padding: 30,
    borderRadius: 20,
  },
});
