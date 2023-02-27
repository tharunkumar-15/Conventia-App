import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import CustomButton from '../CustomButton';
import {db} from '../config';
import {doc, getDoc,collection,getDocs} from 'firebase/firestore';
// import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux';

function ConversationTab({navigation}) {
  // const navigation = useNavigation();
  const {user} = useSelector(state => state.useReducer);
  const[data,setdata]=useState([])
  useEffect(() => {
    ReadData();
  }, []);

  // const ReadData =  () => {
  //   try {
  //     const docRef = doc(db, "Users",user);
  //     const docSnap=getDoc(docRef).then((doc)=>{
  //       console.log(doc.data(),doc.id);
  //       setdata(doc.data())
  //     })
  //     // console.log(docSnap)
      
  //   } catch (error){ 
  //     console.log("Tharun",error);
  //   }
  // };

  const ReadData = async () => {
    try {
      const docRef = doc(db, 'Users', user);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const userData = docSnap.data();
  
        // Get reference to the "Relatives" subcollection
        const relativesRef = collection(db, 'Users', user, 'Relatives');
        const relativesSnap = await getDocs(relativesRef);
  
        const relativesData = relativesSnap.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
  
        console.log(userData, relativesData);
        setdata(relativesData);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.log('Tharun', error);
    }
  };

  return (
    <View style={styles.usercontainer}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.welcometext}>Conversation Tab</Text>
        <Text>{data.Name}</Text>
        {data.map((cards, index) => (
          <View style={styles.carddesign} key={index}>
            <Image source={{uri: cards.ImageUri}} style={styles.cardimage} />
            <View style={styles.carddetails}>
              <Text style={styles.relativedetails}>Name: {cards.RelativeName}</Text>
              <Text style={styles.relativedetails}>
                Relation: {cards.Relation}
              </Text>
              <CustomButton
                buttonTitle="More Info"
                buttonStyle={{
                  width: '75%',
                }}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default ConversationTab;

const styles = StyleSheet.create({
  usercontainer: {
    flex: 1,
    backgroundColor: '#86c4b5',
    justifyContent: 'center',
    // paddingBottom:120,
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
    backgroundColor: '#f8f6f3',
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
    color: 'black',
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
});
