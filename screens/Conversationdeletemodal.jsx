import {StyleSheet, Text, View, Modal} from 'react-native';
import React from 'react';
import {db} from '../config';
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import CustomButton from '../CustomButton';
export default function Conversationdeletemodal(props) {

  const deleterelativedata = async docidrelative => {
    console.log('docid:', docidrelative);
    // try {
    //   const conversationRef = doc(
    //     db,
    //     'Users',
    //     user,
    //     'Relatives',
    //     doc // Use the deleteRelativeId from the state
    //   );
    //   await deleteDoc(conversationRef).then(() => {
    //     alert('Deleted Data Successfully');
    //     //setDeleteRelativeId(null); // Reset the deleteRelativeId state
    //     setDeleteRelative(!props.deleteRelative);
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };
  console.log("Modal props:",props);
  return (
    <Modal
      visible={props.deleteRelative}
      onRequestClose={() => props.deletemodal}
      animationType="fade"
      transparent={true}>
      <View style={styles.modalcontainer}>
        <View style={styles.modalcontent}>
          <Text style={styles.deletetext}>
            Are your sure want to delete the relative? Press ok to continue
          </Text>
          <View style={styles.deletebuttons}>
            <CustomButton
              buttonTitle="Cancel"
              onPress={() => props.deletemodal()}
            />
            <CustomButton
              buttonTitle="Ok"
              onPress={deleterelativedata(props.cards.id)}
              buttonStyle={{marginLeft: 15}}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalcontent: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    position: 'relative',
  },
  deletebuttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  deletetext: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
