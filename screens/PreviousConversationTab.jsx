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
import CustomCard from './CustomCard';
//import {format} from 'date-fns';

function PreviousConverstionTab(props) {
  //const [icon, seticon] = useState(false);
  const [modalStates, setModalStates] = useState([]);
  const [data, setData] = useState([]);
  const {user} = useSelector(state => state.useReducer);
  const {id, RelativeName, Relation, ImageUri } = props.route.params?.cards!=undefined ? props.route.params.cards :props.route.params;

  useEffect(() => {
    ReadData();
  }, [data]);

  const ReadData = async () => {
    try {
      const conversationsRef = collection(
        db,
        'Users',
        user,
        'Relatives',
        id,
        'RecordedConversation',
      );
      const conversationsSnap = await getDocs(conversationsRef);
      const conversationsData = conversationsSnap.docs.map(conversationDoc => ({
        ...conversationDoc.data(),
        id: conversationDoc.id,
      }));
      setData(conversationsData);
      setModalStates(new Array(data.length).fill(false));
    } catch (error) {
      console.log('Tharun', error);
    }
  };
  

  return (
    <View style={styles.usercontainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.welcometext}>Previous Converstion Tab</Text>
        <View style={styles.relativedetails}>
          <Image
             source={{uri:ImageUri}}
             style={styles.relativeimage}
          />
          <View style={styles.rightdetails}>
            <Text style={styles.details}>Name: {RelativeName}</Text>
            <Text style={styles.details}>Relation: {Relation}</Text>
          </View>
        </View>
        <Text style={styles.details}>Recordings</Text>
        <View style={styles.recordingdetails}>
          {data.map((info, index) => (
            <View key={index} style={styles.cardstyle}>
            <CustomCard info={info} modalStates={modalStates} setModalStates={setModalStates} index={index} setData={setData} relativeid={id} setImportant={setData}/>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardstyle:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  }
});