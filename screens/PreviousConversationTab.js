import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Modal} from 'react-native';
import CustomButton from '../CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ConversationModal from './ConversationModal';
import {db} from '../config';
import {
  doc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import {useSelector} from 'react-redux';
import {format} from 'date-fns';

function PreviousConverstionTab() {
  const [icon, seticon] = useState(false);
  const [modalStates, setModalStates] = useState([]);
  const [data, setdata] = useState([]);
  const {user} = useSelector(state => state.useReducer);

  const modalHandler = index => {
    setModalStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  useEffect(() => {
    ReadData();
  }, []);

  // useEffect(()=>{
  //     // imporconv();
  // },[icon])

  const ReadData = async () => {
    try {
      const conversationsRef = collection(
        db,
        'Users',
        user,
        'Relatives',
        'uUvRiipoUTGqRSD6UAUF',
        'RecordedConversation',
      );
      const conversationsSnap = await getDocs(conversationsRef);
      const conversationsData = conversationsSnap.docs.map(conversationDoc => ({
        ...conversationDoc.data(),
        id: conversationDoc.id,
      }));
      setdata(conversationsData);
      setModalStates(new Array(conversationsData.length).fill(false));
    } catch (error) {
      console.log('Tharun', error);
    }
  };

  const deleterelative = async docid => {
    try {
      const conversationRef = doc(
        db,
        'Users',
        user,
        'Relatives',
        'uUvRiipoUTGqRSD6UAUF',
        'RecordedConversation',
        docid,
      );
      await deleteDoc(conversationRef).then(() => {
        alert('Deleted Data Successfully');
        setdata(prevData => prevData.filter(item => item.id !== docid));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const imporconv = async (docid, currentImportantState) => {
    try {
      const Imporconv = doc(
        db,
        'Users',
        user,
        'Relatives',
        'uUvRiipoUTGqRSD6UAUF',
        'RecordedConversation',
        docid,
      );
      await updateDoc(Imporconv, {
        Important: !currentImportantState,
      });
      setdata(prevData =>
        prevData.map(info => {
          if (info.id === docid) {
            return {...info, Important: !currentImportantState};
          } else {
            return info;
          }
        }),
      );
    } catch (error) {
      console.log('Suhas:', error);
    }
  };

  return (
    <View style={styles.usercontainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.welcometext}>Previous Converstions</Text>
        <View style={styles.relativedetails}>
          <Image
            source={require('../Loginimage.jpg')}
            style={styles.relativeimage}
          />
          <View style={styles.rightdetails}>
            <Text style={styles.details}>Name: Surya S</Text>
            <Text style={styles.details}>Relation: Friend</Text>
            <CustomButton
              buttonTitle="Remove Person"
              buttonStyle={{
                width: '65%',
                marginLeft: 10,
              }}
              textstyle={{
                fontSize: 15,
              }}
            />
          </View>
        </View>
        <Text style={styles.details}>Recordings</Text>
        <View style={styles.recordingdetails}>
          {data.map((info, index) => (
            <View key={index} style={styles.cards}>
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
              <View style={styles.logostyle}>
                <AntDesign
                  size={25}
                  color={'white'}
                  name="delete"
                  style={{marginTop: 15}}
                  onPress={() => deleterelative(info.id)}
                />
                <AntDesign
                  size={25}
                  color={'white'}
                  name={info.Important ? 'star' : 'staro'}
                  style={{marginTop: 15, marginLeft: 20}}
                  onPress={() => imporconv(info.id, info.Important)}
                />

                <View style={styles.buttonstyles}>
                  <CustomButton
                    buttonTitle="MoreInfo"
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
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default PreviousConverstionTab;

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
    paddingBottom: 20,
    paddingTop: 20,
    textAlign: 'center',
  },
  relativedetails: {
    flex: 1,
    flexDirection: 'row',
  },
  relativeimage: {
    width: 135,
    height: 135,
    borderRadius: 80,
    marginLeft: 15,
  },
  rightdetails: {
    width: '55%',
    marginLeft: 20,
    marginTop: 20,
  },
  details: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    padding: 5,
    marginLeft: 10,
  },
  recordingdetails: {
    flex: 2,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cards: {
    backgroundColor: '#51087E',
    width: '90%',
    padding: 18,
    marginBottom: 20,
    borderRadius: 10,
    margin: 5,
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
});
