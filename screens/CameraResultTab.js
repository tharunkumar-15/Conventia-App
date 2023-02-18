import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import CustomButton from '../CustomButton';
import PreviousConverstionTab from './PreviousConversationTab';
import NewConverstionTab from './NewConversationTab';

function CameraResultTab({navigation}) {
  return (
    <View style={styles.usercontainer}>
      <Text style={styles.welcometext}>Details of detected face</Text>
      <Image
        source={require('../Loginimage.jpg')}
        style={styles.loginimage}
        resizeMode="stretch"
      />
      <Text style={styles.detecteddetails}>Surya S</Text>
      <Text style={styles.detecteddetails}>Friend</Text>
      <CustomButton
        buttonTitle="Access Previous Conversations"
        buttonStyle={{
          width: '50%',
        }}
        onPress={() => navigation.navigate(PreviousConverstionTab)}
      />
      <CustomButton
        buttonTitle="Start Recording a new Conversation"
        buttonStyle={{
          width: '50%',
        }}
        onPress={() => navigation.navigate(NewConverstionTab)}
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
    backgroundColor: '#86c4b5',
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
