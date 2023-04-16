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
  onSnapshot
} from 'firebase/firestore';
import {LogBox} from 'react-native';
import {useSelector} from 'react-redux';
import {format} from 'date-fns';
import CustomCard from './CustomCard';


// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();


function PreviousConverstionTab(props) {
  const [modalStates, setModalStates] = useState([]);
  const [data, setData] = useState([]);
  const {user} = useSelector(state => state.useReducer);

  // const modalHandler = index => {
  //   setModalStates(prevStates => {
  //     const newStates = [...prevStates];
  //     newStates[index] = !newStates[index];
  //     return newStates;
  //   });
  // };
  const { id, RelativeName, Relation, ImageUri } = props.route.params.cards;
  useEffect(() => {
   ReadData();
  }, [data]);

  const ReadData=async()=>{
    const conversationsRef =collection(
      db,
      'Users',
      user,
      'Relatives',
       id,
      'RecordedConversation',
    );
    const unsubscribe =onSnapshot(conversationsRef, snapshot => {
      const conversationsData =snapshot.docs.map(conversationDoc => ({
        ...conversationDoc.data(),
        id: conversationDoc.id,
      }));
      setData(conversationsData);
      setModalStates(new Array(conversationsData.length).fill(false));
    });
    return () => unsubscribe();
  }

  //   const ReadData = async () => {
  //     try {
  //       const conversationsRef = collection(
  //         db,
  //         'Users',
  //         user,
  //         'Relatives',
  //         'uUvRiipoUTGqRSD6UAUF',
  //         'RecordedConversation',
  //       );
  //       const conversationsSnap = await getDocs(conversationsRef);
  //       const conversationsData = conversationsSnap.docs.map(conversationDoc => ({
  //         ...conversationDoc.data(),
  //         id: conversationDoc.id,
  //       }));
  //       setData(conversationsData);
  //       setModalStates(new Array(conversationsData.length).fill(false));
  //     } catch (error) {
  //       console.log('Tharun', error);
  //     }
  //   };
  
  // const deleterelative = async docid => {
  //   try {
  //     const conversationRef = doc(
  //       db,
  //       'Users',
  //       user,
  //       'Relatives',
  //       'uUvRiipoUTGqRSD6UAUF',
  //       'RecordedConversation',
  //       docid,
  //     );
  //     await deleteDoc(conversationRef).then(() => {
  //       alert('Deleted Data Successfully');
  //       setData(prevData => prevData.filter(item => item.id !== docid));
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const imporconv = async (docid, currentImportantState) => {
  //   try {
  //     const Imporconv = doc(
  //       db,
  //       'Users',
  //       user,
  //       'Relatives',
  //       'uUvRiipoUTGqRSD6UAUF',
  //       'RecordedConversation',
  //       docid,
  //     );
  //     await updateDoc(Imporconv, {
  //       Important: !currentImportantState,
  //     });
  //     setData(prevData => {
  //       const updatedIndex = prevData.findIndex(item => item.id === docid);
  //       const updatedItem = {...prevData[updatedIndex], Important: !currentImportantState};
  //       const newData = [...prevData];
  //       newData[updatedIndex] = updatedItem;
  //       return newData;
  //     });
  //   } catch (error) {
  //     console.log('Suhas:', error);
  //   }
  // };

  
  return (
    <View style={styles.usercontainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.welcometext}>Previous Converstions</Text>
        <View style={styles.relativedetails}>
          <Image
            source={{uri:ImageUri}}
            style={styles.relativeimage}
          />
          <View style={styles.rightdetails}>
            <Text style={styles.details}>Name:{RelativeName}</Text>
            <Text style={styles.details}>Relation: {Relation}</Text>
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
          {data.map((info, index) =>(
            <View key={index} style={styles.cardstyle}>
              <CustomCard info={info} modalStates={modalStates} setModalStates={setModalStates}index={index} setData={setData}/>
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
