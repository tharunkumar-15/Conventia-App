import React, { useEffect, useState } from 'react'
import{
    View,
    Text,
    StyleSheet,
} from 'react-native';
import CustomButton from '../CustomButton';
import { signOut } from 'firebase/auth';
import { auth } from '../config';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector,useDispatch } from 'react-redux';
import { setUser } from '../Redux/Actions';

function UserProfileTab() {
  const navigation = useNavigation();
  const { user} = useSelector(state => state.useReducer);
  const dispatch=useDispatch()

  const logout=()=>{
    try{
        signOut(auth).then(()=>{
          AsyncStorage.removeItem('UserData');
          dispatch(setUser(''));
          navigation.navigate('userloginpage')
        })
      }
        catch(error){
          alert(error);
        }
    }
  return (
    <View style={styles.usercontainer}>
      <CustomButton buttonTitle='Sign Out' onPress={()=>logout()}/> 
    </View>
  );
}
export default UserProfileTab;

const styles=StyleSheet.create({
    usercontainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
    },
    welcometext:{
        fontSize:25,
        color:'black',
    },
})