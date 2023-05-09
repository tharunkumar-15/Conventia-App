import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView,Modal,Alert} from 'react-native';
import CustomButton from '../CustomButton';
import {db} from '../config';
import {collection, getDocs, onSnapshot,doc,deleteDoc} from 'firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Conversationdeletemodal from './Conversationdeletemodal';
function ConversationTab({navigation}) {
  // const navigation = useNavigation();
  const {user} = useSelector(state => state.useReducer);
  const [data, setdata] = useState([]);
  const [deleteRelative,setDeleteRelative]=useState(false);
  //const [deleteRelativeId, setDeleteRelativeId] = useState(null);
  
  useEffect(() => {
    ReadData();
  }, []);

  const ReadData = () => {
    const relativesRef = collection(db, 'Users', user, 'Relatives');

    onSnapshot(relativesRef, querySnapshot => {
      const relativesData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setdata(relativesData);
     // console.log('Data', data);
    });
  };


  const deletemodal = (relativeid) => {
    Alert.alert('Delete Relative', 'Are you sure you want to delete the relative ?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {text: 'OK', onPress: ()=>{deleterelativedata(relativeid)}} ,
    ]);
    // setDeleteRelative(!deleteRelative);
  }

  const deleterelativedata =async(docidrelative) => {
    // Update deleterelativedata function to use the deleteRelativeId from the state
   // console.log("Relative id from alert:",docidrelative)
   // console.log("docid:", docidrelative);
    try {
      const conversationRef = doc(
        db,
        'Users',
        user,
        'Relatives',
        docidrelative ,
      );
      await deleteDoc(conversationRef).then(() => {
        alert('Deleted Data Successfully');
        //setDeleteRelativeId(null); // Reset the deleteRelativeId state
        setDeleteRelative(!deleteRelative);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.usercontainer}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.welcometext}>Conversation Tab</Text>
        <Text>{data.Name}</Text>
        {data.map((cards,index) => {
          // console.log('cards:', cards);
          return (
            <View style={styles.carddesign} key={index}>
              <Image source={{uri: cards.ImageUri}} style={styles.cardimage} />
              <View style={styles.carddetails}>
                <Text style={styles.relativedetails}>
                  Name: {cards.RelativeName}
                </Text>
                <Text style={styles.relativedetails}>
                  Relation: {cards.Relation}
                </Text>
                <Text style={styles.relativedetails}>
                  Relationid: {cards.id}
                </Text>
                <View style={styles.deleteiconandmoreinfo}>
                <CustomButton
                buttonTitle="More Info"
                buttonStyle={{
                width: '80%',
                backgroundColor:"#f95999",
                marginLeft:10,
                }}
                onPress={() => navigation.navigate("Camera",{screen:'PreviousConverstionTab',params:{cards:cards}})}
                //onPress={() => navigation.navigate('Camera',{screen:'PreviousConverstionTab'},{cards})}
              />
                <AntDesign
                  size={25}
                  color={'white'}
                  name="delete"
                  style={styles.deleteicon}
                  onPress={() => deletemodal(cards.id)}
                />
                {/* <Conversationdeletemodal deletemodal={deletemodal} deleteRelative={deleteRelative} cards={cards}/> */}
              </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default ConversationTab;

const styles = StyleSheet.create({
  usercontainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    //paddingBottom:120,
    paddingTop: 15,
  },
  welcometext: {
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  carddesign: {
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#51087E',
    marginTop: 15,
    marginBottom: 15,
    padding: 10,
    flexDirection: 'row',
  },
  cardimage: {
    width: 125,
    height: 125,
    borderRadius: 80,
  },
  carddetails: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },
  relativedetails: {
    fontSize: 18,
    color: 'white',
    margin: 7,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 10,
    width: '70%',
    backgroundColor: '#131E3A',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  deletetext:{
    color:'black',
    fontSize:15,
    fontWeight:'bold'
  },
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
  deletebuttons:{
    flexDirection:'row',
    justifyContent:'space-around',
  },
  deleteiconandmoreinfo:{
    flex:1,
    flexDirection:'row'
  },
  deleteicon:{
    marginTop:20,
    marginLeft:10,
  },
});
