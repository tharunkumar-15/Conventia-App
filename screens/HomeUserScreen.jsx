import { StyleSheet, Text, View,ScrollView,Image} from 'react-native'
import React,{useState,useEffect} from 'react'
import ImportantTab from './ImportantTab'
import {db} from '../config';
import {doc,onSnapshot} from 'firebase/firestore';
import {useSelector} from 'react-redux';

export default function HomeUserScreen() {
  const [userdata, setUserdata] = useState([]);
  const {user} = useSelector(state => state.useReducer);
  
  useEffect(()=>{
    Userdata();
  },[])

  const Userdata = async () => {
    try {
      const UserRef = doc(db, 'Users', user);
      onSnapshot(UserRef, (doc) => {
        setUserdata(doc.data());
      });
      console.log(userdata)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.homecontainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{alignItems: 'center'}} style={styles.scrollcontainer}>
      <View style={styles.headercontainer}>
       <Text style={styles.appname}>
            Conventia
       </Text>
      <View style={styles.ushapecontainer}>
        <View style={styles.uleft}>
          <Text style={styles.headertext}>
             Welcome 
          </Text>
           <Text style={styles.headername}>
               {userdata&&userdata.Name}
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
    </View>
      <View style={styles.cards}>
        <Text style={styles.title}>Important conversation</Text>
             <ImportantTab/>
      </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    homecontainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },
    scrollcontainer:{
      width:'100%',
    },
    cards:{
      flex:1,
      width:'100%',
      justifyContent:'center',
      alignItems:'center',
  },
  title:{
      color:'black',
      fontSize:22,
      fontWeight:'bold'
  },
  headercontainer:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
 },
 ushapecontainer:{
   flexDirection:'row',
   height:250,
   backgroundColor: '#51087E',
 },
 uleft:{
   flex:1,
 },
 uright:{
   flex:1,
   justifyContent:'center',
   alignItems:'center'
 },
 oval: {
   width: 190,
   height: 40,
   marginTop:-40,
   borderTopLeftRadius:200,
   borderTopRightRadius:200,
   backgroundColor: "white",
   transform: [{ scaleX: 2 }],
 },
 headerimage:{
   width:150,
   height:150,
   borderRadius:80,
   marginBottom:20,
 },
 headertext:{
   color:'white',
   fontSize:23,
   fontWeight:'bold',
   marginTop:60,
   marginLeft:18,
 },
 headername:{
   color:'white',
   fontSize:23,
   fontWeight:'bold',
   textAlign:'center',
   marginTop:15,
   marginLeft:20,
 },
 appname:{
   color:'white',
   width:'100%',
   fontSize:35,
   fontWeight:'bold',
   fontFamily:'Quicksand',
   backgroundColor:"#51087E",
   paddingLeft:20,
   paddingTop:10,
 }
})