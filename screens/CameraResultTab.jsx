import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import CustomButton from '../CustomButton';
import PreviousConverstionTab from './PreviousConversationTab';
import NewConversationTab from './NewConversationTab';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';
import {auth, db, storage} from '../config';
import {
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
  collection,
} from 'firebase/firestore';

function CameraResultTab(props) {
  const navigation = useNavigation();
 // const isFocused = useIsFocused();
  const {user} = useSelector(state => state.useReducer);
  const [relativeData,setRelativeData]=useState({});

  const {relativeid}=props.route.params;
 
  useEffect(()=>{
    if(relativeid!='')
    {
       relativeDetails();
    }
  },[])

  const relativeDetails=()=>{
    console.log("relativesid from button:",relativeid)
    try {
      const UserRef = doc(db,'Users',user,'Relatives',relativeid);
      onSnapshot(UserRef, (doc) => {
        setRelativeData(doc.data());
      });
    } catch (error) {
      console.log("Error in camera result tab",error);
    }
  }            


  // useEffect(()=>{
  //   loadingscreen();
  // },[])

  // const loadingscreen=()=>{
  //   console.log("loadingscreen called");
  //   setLoading(!loading)
  //}

  // useEffect(() => {
  //   if (isFocused) {
  //     takePhoto();
  //   }
  // }, [isFocused]);

  const previousconv=()=>{
    let cards={id:relativeid,RelativeName:relativeData.RelativeName,Relation:relativeData.Relation,ImageUri:relativeData.ImageUri};
    console.log("Cards:",cards)
    navigation.navigate("PreviousConverstionTab",cards)
  }

  // useEffect(() => {
  //   const removeListener = navigation.addListener('beforeRemove', e => {
  //     if (!isFocused) {
  //       return;
  //     }

  //     if (!photoTaken) {
  //       e.preventDefault(); // Prevent default behavior of leaving the screen
  //     }

  //     // Navigate to the home screen
  //     navigation.navigate('Camerabuttontab');
  //   });

  //   return removeListener;
  // }, [navigation, isFocused, photoTaken]);
  console.log("params from resultab:",props.route.params)
  return (
    <View style={styles.usercontainer}>
          <Text style={styles.welcometext}>Details of detected face</Text>
            {relativeData.ImageUri&&<Image
              source={{uri:relativeData.ImageUri}}
              style={styles.relativeimage}
              resizeMode="stretch"
            />}
          <Text style={styles.detecteddetails}>{relativeData.RelativeName}</Text>
          <Text style={styles.detecteddetails}>{relativeData.Relation}</Text>
          <CustomButton
            buttonTitle="Access Previous Conversations"
            buttonStyle={{
              width: '50%',
            }}
            textstyle={{
              fontSize: 16,
            }}
            onPress={() => {previousconv()}}
            disabled={Object.keys(relativeData).length>0 ?false: true}
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
            onPress={() => navigation.navigate('NewConversationTab', { relativeid: relativeid, relativename:relativeData.RelativeName})}
             disabled={Object.keys(relativeData).length>0 ?false: true} 
            // disabled={false} 
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
  relativeimage: {
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
