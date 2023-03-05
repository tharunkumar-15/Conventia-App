import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from './config';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dimensions} from 'react-native';
import CustomButton from './CustomButton';
import { doc, setDoc } from "firebase/firestore";
import { db } from './config';

const windowHeight = Dimensions.get('window').height;

function SignupPage({navigation}) {
  // const navigation = useNavigation();
  const [userdetail, setuserdetail] = useState({
    email:"",password:"",name:""
  });
  

  const signup = () => {
    createUserWithEmailAndPassword(auth, userdetail.email, userdetail.password)
      .then( userCredential => {
         setDoc(doc(db, "Users", userCredential.user.uid), {
          Email: userdetail.email,
          Name: userdetail.name,
        });
        alert('User created successfully');
        navigation.navigate('userloginpage');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };  
  return (
    <View style={styles.loginmainpage}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.appcontainer}>
          <Text style={styles.appname}>Conventia</Text>
          <Image
            source={require('./Loginimage.jpg')}
            style={styles.loginimage}
            resizeMode="stretch"
          />
        </View>
        <Text style={styles.loginpagetext}>SignUp</Text>
        <View style={styles.iconcontainer}>
          <View style={styles.icon}>
            <Fontisto size={25} color={'black'} name="email" />
          </View>
          <TextInput
            style={styles.emailfield}
            placeholder="Email"
            placeholderTextColor="black"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType='email-address'
            onChangeText={text => setuserdetail({...userdetail,email:text})}
          />
        </View>
        <View style={styles.iconcontainer}>
          <View style={styles.icon}>
            <Ionicons size={25} color={'black'} name="ios-person-outline" />
          </View>
          <TextInput
            style={styles.emailfield}
            placeholder="Name"
            placeholderTextColor="black"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => setuserdetail({...userdetail,name:text})}
          />
        </View>
        <View style={styles.iconcontainer}>
          <View style={styles.icon}>
            <AntDesign size={25} color={'black'} name="lock" />
          </View>
          <TextInput
            style={styles.emailfield}
            placeholder="Password"
            placeholderTextColor="black"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => setuserdetail({...userdetail,password:text})}
          />
        </View>
        <View style={styles.iconcontainer}>
          <View style={styles.icon}>
            <AntDesign size={25} color={'black'} name="lock" />
          </View>
          <TextInput
            style={styles.emailfield}
            placeholder="Confirm Password"
            placeholderTextColor="black"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => setuserdetail({...userdetail,password:text})}
          />
        </View>
        <CustomButton 
        onPress={() => signup()} 
        buttonStyle={{
          backgroundColor:'#f95999',
          margin:10,
        }}
        buttonTitle="SignUp" />
      </ScrollView>
    </View>
  );
}

export default SignupPage;

const styles = StyleSheet.create({
  loginmainpage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#51087E',
    paddingTop: 40,
  },
  appname: {
    fontWeight: 'bold',
    fontSize: 35,
    marginBottom: 20,
    color: 'white',
  },
  logincontainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginimage: {
    width: 150,
    height: 150,
    borderRadius: 80,
    marginBottom: 20,
  },
  loginpagetext: {
    fontWeight: 'bold',
    fontSize: 27,
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  emailfield: {
    width: '80%',
    fontSize: 16,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  register: {
    color: 'white',
    fontSize: 17,
    margin: 15,
  },
  iconcontainer: {
    marginTop: 10,
    marginBottom: 20,
    width: '95%',
    borderColor: 'black',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: windowHeight / 15,
  },
  icon: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: 'black',
    borderRightWidth: 1,
    width: 60,
  },
});
