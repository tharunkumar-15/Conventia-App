import React, { useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
} from 'react-native';
import { useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';

function ImageCapture() {
  const [imagePath, setImagePath] = useState('');
  function takePhoto() {
    console.warn("Captured");
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image.path);
      setImagePath(image.path);
    });
  }
  return (
    <View>
      <Button title="Camera" onPress={takePhoto}></Button>
      {imagePath !== '' ? <Image
        source={{ uri: imagePath }}
        style={styles.images}
      /> : <></>}
    </View>
  );
}

export default ImageCapture

const styles = StyleSheet.create({
  usercontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#86c4b5',
  },
  welcometext: {
    fontSize: 25,
    color: 'black',
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  },
})