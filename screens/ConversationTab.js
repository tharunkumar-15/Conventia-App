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
import {auth, db} from '../config';
import {doc, getDoc} from 'firebase/firestore';
// import { useNavigation } from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
function ConversationTab({navigation}) {
  // const navigation = useNavigation();
  const {user} = useSelector(state => state.useReducer);

  useEffect(() => {
    ReadData();
  }, []);

  const ReadData =  () => {
    try {
      const docRef = doc(db, "Users", user);
      console.log(docRef)
      const docSnap =  getDoc(docRef);
      // console.log(docSnap)
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const convcards = [
    {
      image: require('../Loginimage.jpg'),
      name: 'Surya S',
      relation: 'Friend',
      Date: '[19-01-23] consume tablets on time',
    },
    {
      image: require('../Loginimage.jpg'),
      name: 'Surya S',
      relation: 'Friend',
      Date: '[19-01-23] consume tablets on time',
    },
    {
      image: require('../Loginimage.jpg'),
      name: 'Surya S',
      relation: 'Friend',
      Date: '[19-01-23] consume tablets on time',
    },
    {
      image: require('../Loginimage.jpg'),
      name: 'Surya S',
      relation: 'Friend',
      Date: '[19-01-23] consume tablets on time',
    },
    {
      image: require('../Loginimage.jpg'),
      name: 'Surya S',
      relation: 'Friend',
      Date: '[19-01-23] consume tablets on time',
    },
  ];

  return (
    <View style={styles.usercontainer}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.welcometext}>Conversation Tab</Text>
        <Text>{user}</Text>
        {convcards.map((cards, index) => (
          <View style={styles.carddesign} key={index}>
            <Image source={cards.image} style={styles.cardimage} />
            <View style={styles.carddetails}>
              <Text style={styles.relativedetails}>Name: {cards.name}</Text>
              <Text style={styles.relativedetails}>
                Relation: {cards.relation}
              </Text>
              <Text style={styles.relativedetails}>
                Recordings: {cards.Date}
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
