import React,{useState,useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeUserScreen from './HomeUserScreen';
import {View, Text, StyleSheet,Image,ScrollView} from 'react-native';
import {db} from '../config';
import {doc,onSnapshot} from 'firebase/firestore';
import {useSelector} from 'react-redux';
const UserPage = () => {

  const [userdata, setUserdata] = useState([]);
  const {user} = useSelector(state => state.useReducer);
  const CustomHeader = () => {
    return (
    <View style={styles.headercontainer}>
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}
        style={styles.scrollcontainer}>
       <Text style={styles.appname}>
            Conventia
       </Text>
      <View style={styles.ushapecontainer}>
        <View style={styles.uleft}>
          <Text style={styles.headertext}>
             Welcome 
          </Text>
           <Text style={styles.headername}>
               {userdata && userdata.Name}
           </Text>
        </View>
        <View style={styles.uright}>
            <Image
              source={require('../Oldpeopleimage.png')}
              style={styles.headerimage}
              resizeMode="stretch"
            />
        </View>
      </View>
      <View style={styles.oval} />
      </ScrollView>
    </View>
    );
  };  

  const Stack = createStackNavigator();
  return (
    <HomeUserScreen/>
  );
};

export default UserPage;
