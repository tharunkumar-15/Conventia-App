import {StyleSheet, Text, View, Modal,TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from '../CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ConversationModal from './ConversationModal';
import {db} from '../config';
import {doc, deleteDoc, updateDoc} from 'firebase/firestore';

import {format} from 'date-fns';
import {useSelector} from 'react-redux';

export default function CustomCard({
  info,
  index,
  setModalStates,
  modalStates,
  setData,
  relativeid,
  relativeName,
  relativeRelation,
  setImportant
}) {
  const [imp, setImp] = useState(info.Important);
  const {user} = useSelector(state => state.useReducer);

  const modalHandler = index => {
    setModalStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };
  useEffect(() => {
    setImp(info.Important);
  }, [info.Important]);

  const updateImportant = async id => {
    setImp(!imp);
    const docRef = doc(
      db,
      'Users',
      user,
      'Relatives',
      relativeid,
      'RecordedConversation',
      id
    );
    await updateDoc(docRef, {
      Important: !imp,
    });
  };

  
  const deleterelative = async (docid,docidrelative) => {
    try {
      const conversationRef = doc(
        db,
        'Users',
        user,
        'Relatives',
         docidrelative,
        'RecordedConversation',
        docid,
      );
      await deleteDoc(conversationRef).then(() => {
        alert('Deleted Data Successfully');
        setImportant(prevData => prevData.filter(item => item.id !== docid));
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.cards}>
      <Text style={styles.remaininfo} numberOfLines={2}>
        {info.SummaryDate?.seconds && (
          <Text style={styles.remaininfo} numberOfLines={2}>
            {format(
              new Date(info.SummaryDate.seconds * 1000),
              'MMM d, yyyy h:mm a',
            )}
            : {info.Summary}
          </Text>
        )}
      </Text>
      <Text style={styles.remaininfo} numberOfLines={2}>
        {relativeName}
      </Text>
      <Text style={styles.remaininfo} numberOfLines={2}>
        {relativeRelation}
      </Text>
      <View style={styles.logostyle}>
        <AntDesign
          size={25}
          color={'white'}
          name="delete"
          style={{marginTop: 15}}
          onPress={() => deleterelative(info.id,relativeid)}
        />
       <TouchableOpacity
          onPress={() => updateImportant(info.id)}
          activeOpacity={0.7}
        >
          {info.Important ? (
            <AntDesign name="star" size={25} color="gold" style={styles.staricon}/>
          ) : (
            <AntDesign name="staro" size={20} color="white" style={styles.staricon}/>
          )}
        </TouchableOpacity>
        <View style={styles.buttonstyles}>
          <CustomButton
            buttonTitle="More Info"
            buttonStyle={{
              width: '65%',
              backgroundColor: '#f95999',
            }}
            textstyle={{
              fontSize: 15,
            }}
            onPress={() => modalHandler(index)}
          />
        </View>
        <Modal
          visible={modalStates[index]}
          onRequestClose={() => modalHandler(index)}
          animationType="fade"
          transparent={true}>
          <ConversationModal
            conversation={info.Summary}
            modalhandler={() => modalHandler(index)}
          />
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cards: {
    backgroundColor: '#51087E',
    width: '90%',
    padding: 18,
    marginBottom: 20,
    borderRadius: 10,
    margin: 5,
    marginRight: 10,
  },
  remaininfo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  logostyle: {
    flexDirection: 'row',
  },
  buttonstyles: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 20,
  },
  staricon:{
    marginLeft:18,
    marginTop:15,
  },
  relationinfo:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign:'center'
  }
});
