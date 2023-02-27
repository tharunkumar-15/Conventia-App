import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Modal} from 'react-native';
import CustomButton from '../CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ConversationModal from './ConversationModal';
import {db} from '../config';
import {doc, getDoc, collection, getDocs} from 'firebase/firestore';
import {useSelector} from 'react-redux';

function PreviousConverstionTab() {
  const [icon, seticon] = useState(false);
  const [modal, setmodal] = useState(false);
  const [data, setdata] = useState([]);
  const {user} = useSelector(state => state.useReducer);
  const modalHandler = () => {
    setmodal(previousState => !previousState);
  };

  const iconhandler = () => {
    seticon(previousState => !previousState);
  };

  useEffect(() => {
    ReadData();
  }, []);

  const ReadData = async () => {
    try {
      const docRef = doc(db, 'Users', user);
      const docSnap = await getDoc(docRef);
    
      if (docSnap.exists()) {
        const userData = docSnap.data();
  
        // Get reference to the "Relatives" subcollection
        const relativesRef = collection(db, 'Users', user, 'Relatives');
        const relativesSnap = await getDocs(relativesRef);
        console.log("relativesnap:",relativesSnap)
        const relativesData = relativesSnap.docs.map(async (doc) => {
          // Get reference to the "RecordedConversation" subcollection
          console.log(doc.id)
          const conversationsRef = collection(db, 'Users', user, 'Relatives', "uUvRiipoUTGqRSD6UAUF", 'RecordedConversation');
          const conversationsSnap = await getDocs(conversationsRef);
        
          const conversationsData = conversationsSnap.docs.map((conversationDoc) => ({
            ...conversationDoc.data(),
            id: conversationDoc.id,
          }));
  
          console.log('Relative ID:', doc.id, 'Recorded Conversations:', conversationsData);
          setdata(conversationsData);
        });
  
        console.log('User Data:', userData);
        console.log('Relatives Data:', relativesData);
      } 
      else {
        console.log('No such document!');
      }
    } catch (error) {
      console.log('Tharun', error);
    }
  };
  
  const infos = [
    {
      date: '[19-02-23]',
      remainder:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus acultrices enim. Proin volutpat sem et nunc commodo, ac vestibulum urnaconsequat. Sed scelerisque, quam vel efficitur pretium, est elit commododio, quis iaculis mi quam id urna.',
    },
    {
      date: '[19-02-23]',
      remainder:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus acultrices enim. Proin volutpat sem et nunc commodo, ac vestibulum urnaconsequat. Sed scelerisque, quam vel efficitur pretium, est elit commododio, quis iaculis mi quam id urna.',
    },
    {
      date: '[19-02-23]',
      remainder:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus acultrices enim. Proin volutpat sem et nunc commodo, ac vestibulum urnaconsequat. Sed scelerisque, quam vel efficitur pretium, est elit commododio, quis iaculis mi quam id urna.',
    },
    {
      date: '[19-02-23]',
      remainder:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus acultrices enim. Proin volutpat sem et nunc commodo, ac vestibulum urnaconsequat. Sed scelerisque, quam vel efficitur pretium, est elit commododio, quis iaculis mi quam id urna.',
    },
    {
      date: '[19-02-23]',
      remainder:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus acultrices enim. Proin volutpat sem et nunc commodo, ac vestibulum urnaconsequat. Sed scelerisque, quam vel efficitur pretium, est elit commododio, quis iaculis mi quam id urna.',
    },
  ];
  return (
    <View style={styles.usercontainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.welcometext}>Previous Converstions</Text>
        {data.map((conversation, index) => (
          <View key={index}>
            <Text>{conversation.Summary}</Text>
          </View>
        ))}
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
                width: '77%',
              }}
            />
          </View>
        </View>
        <Text style={styles.details}>Recordings</Text>
        <Text>{data.Summary}</Text>
        <View style={styles.recordingdetails}>
          {infos.map((info, index) => (
            <View key={index} style={styles.cards}>
              <Text style={styles.remaininfo} numberOfLines={2}>
                {info.date} {info.remainder}
              </Text>
              <View style={styles.logostyle}>
                <AntDesign
                  size={25}
                  color={'black'}
                  name="delete"
                  style={{marginTop: 15}}
                />
                <AntDesign
                  size={25}
                  color={'black'}
                  name={icon ? 'star' : 'staro'}
                  style={{marginTop: 15, marginLeft: 20}}
                  onPress={() => iconhandler()}
                />
                <View style={styles.buttonstyles}>
                  <CustomButton
                    buttonTitle="MoreInfo"
                    buttonStyle={{
                      width: '65%',
                    }}
                    onPress={() => modalHandler()}
                  />
                </View>
                <Modal
                  visible={modal}
                  onRequestClose={() => setmodal(false)}
                  animationType="fade"
                  transparent={true}>
                  <ConversationModal
                    conversation={info.remainder}
                    modalhandler={modalHandler}
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
    backgroundColor: '#86c4b5',
  },
  welcometext: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    paddingBottom: 20,
    paddingTop: 20,
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
    backgroundColor: '#f8f6f3',
    width: '90%',
    padding: 18,
    marginBottom: 20,
    borderRadius: 10,
    margin: 5,
  },
  remaininfo: {
    color: 'black',
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
