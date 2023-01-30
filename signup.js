import React,{useState} from 'react'
import{
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  ScrollView,
}from 'react-native';
import {createUserWithEmailAndPassword } from "firebase/auth";
import  {auth} from './config';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function SignupPage({navigation}) {

  // const navigation = useNavigation();
  const[email,setemail]=useState();
  const[password,setpassword]=useState();
   

//   // const{signup}=useContext(AuthContext)
//   GoogleSignIn.signIn()
//     .then((data) => {
//     const { idToken, accessToken } = data;
//     const credential =auth.GoogleAuthProvider.credential(idToken, accessToken);
//     return firebase.auth().signInWithCredential(credential);
//     })
//     .then(() => {
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'UserPage' }],
//       });
//     })
//     .catch((error) => {
//          console.log(error)
//     });

  const signup=()=>{
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert('User created successfully');
      navigation.navigate('userloginpage')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
   }
  return (
    <View style={styles.loginmainpage}>
    <ScrollView  contentContainerStyle={{ alignItems: 'center'}}>
    <View style={styles.appcontainer}>
    <Text style={styles.appname}>Conventia</Text>
    </View>
      <Text style={styles.loginpagetext}>
          SignUp
      </Text>
    <View style={styles.iconcontainer}>
      <View style={styles.icon}>
      <Fontisto size={25} color={'black'} name='email'/>
      </View>
      <TextInput 
       style={styles.emailfield}
       placeholder='Email'
       placeholderTextColor='black'
        autoCapitalize='none'
       autoCorrect={false}
       onChangeText={(email)=>setemail(email)}
      />
    </View>
    <View style={styles.iconcontainer}>
      <View style={styles.icon}>
      <Ionicons size={25} color={'black'} name='ios-person-outline'/>
      </View>
      <TextInput 
       style={styles.emailfield}
       placeholder='Name'
       placeholderTextColor='black'
       autoCapitalize='none'
       autoCorrect={false}
       onChangeText={(password)=>setpassword(password)}
       />
      </View>
    <View style={styles.iconcontainer}>
      <View style={styles.icon}>
      <AntDesign size={25} color={'black'} name='lock'/>
      </View>
      <TextInput 
       style={styles.emailfield}
       placeholder='Password'
       placeholderTextColor='black'
       secureTextEntry={true}
       autoCapitalize='none'
       autoCorrect={false}
       onChangeText={(password)=>setpassword(password)}
       />
      </View>
      <View style={styles.iconcontainer}>
      <View style={styles.icon}>
      <AntDesign size={25} color={'black'} name='lock'/>
      </View>
      <TextInput 
       style={styles.emailfield}
       placeholder='Confirm Password'
       placeholderTextColor='black'
       secureTextEntry={true}
       autoCapitalize='none'
       autoCorrect={false}
       onChangeText={(password)=>setpassword(password)}
       />
      </View>
       <Pressable
        onPress={()=>signup()}
       style={styles.submitbutton}
       >
        <Text style={styles.submittext}>SignIn</Text>
       </Pressable>
       </ScrollView>
    </View>
)
}

export default SignupPage;


const styles=StyleSheet.create({
  loginmainpage:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#000075",
    paddingTop:40,
   },
   appname:{
    fontWeight:'bold',
    fontSize:35,
    marginBottom:20,
    color:'white',
  },
  logincontainer:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center'
  },
  loginimage:{
    width:150,
    height:150,
    borderRadius:80,
    marginBottom:20,
  },
   loginpagetext:{
    fontWeight:'bold',
    fontSize:27,
    color:'white',
    marginBottom:15,
    textAlign:'center',
   },
   emailfield:{
    width:'80%',
    fontSize:16,
    color:'black',
    justifyContent:'center',
    alignItems:'center',
    paddingLeft:10,
   },
   submitbutton:{
    padding:15,
    backgroundColor:"#131E3A",
    width:'50%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:30,
    margin:15,
  },
  submittext:{
     fontSize:20,
     color:"white"
  },
   register:{
    color:'white',
    fontSize:17,
    margin:15,
   },
   iconcontainer:{
    marginTop:10,
    marginBottom:20,
    width: '95%',
    borderColor: 'black',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: windowHeight / 15,
   },
   icon:{
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: 'black',
    borderRightWidth: 1,
    width:60,
   },
})