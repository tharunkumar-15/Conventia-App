import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import CustomButton from '../CustomButton';
import {db} from '../config';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
// import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux';

function ConversationTab({navigation}) {
  // const navigation = useNavigation();
  const {user} = useSelector(state => state.useReducer);
  const[data,setdata]=useState([])
  useEffect(() => {
    ReadData();
  }, []);

  const ReadData = () => {
    const relativesRef = collection(db, 'Users', user, 'Relatives');
  
    onSnapshot(relativesRef, (querySnapshot) => {
      const relativesData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setdata(relativesData);
    });
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
                  width: '80%',
                  backgroundColor:"#f95999",
                  marginLeft:10,
                }}
                onPress={() => navigation.navigate("Camera",{screen:'PreviousConverstionTab',params:{cards:cards}})}
                // onPress={() => navigation.navigate('Camera',{screen:'PreviousConverstionTab'},{cards})}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default ConversationTab;

const styles=StyleSheet.create({
    usercontainer:{
        flex:1,
        backgroundColor:'#fff',
        justifyContent:'center',
        // paddingBottom:120,
        paddingTop:15,
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
    margin:7,
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
