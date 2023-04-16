import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import CustomButton from '../CustomButton';
import PreviousConverstionTab from './PreviousConversationTab';
import NewConversationTab from './NewConversationTab';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';

function CameraResultTab() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { user } = useSelector(state => state.useReducer);
  const [imagePath, setImagePath] = useState('');
  const [photoTaken, setPhotoTaken] = useState(false);

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
      navigation.navigate("CameraResultTab");
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
