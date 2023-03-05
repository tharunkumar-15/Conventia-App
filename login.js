import React, {useState, useEffect} from 'react';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {auth} from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import {Dimensions} from 'react-native';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
import CustomButton from './CustomButton';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from './Redux/Actions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function LoginPage({navigation}) {
  // const navigation = useNavigation();
  const {user} = useSelector(state => state.useReducer);
  const dispatch = useDispatch();

  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [isloaded, setisloaded] = useState(true);
  useEffect(() => {
    getdata();
    // GoogleSignin.configure({
    //   webClientId:
    //     '67422949635-q5vndsjn79ea1mu433u8ftusm4dvhiv0.apps.googleusercontent.com',
    //   offlineAccess: false,
    // });
    getuid();
  }, []);

  // const handleGoogleSignIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true}); // <-- Add this
  //     const {idToken} = await GoogleSignin.signIn().then(() =>
  //       navigation.navigate('UserPage'),
  //     );
  //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  //     return auth().signInWithCredential(googleCredential);
  //   } catch (error) {
  //     // This will show you if GooglePlayServices is missing
  //     console.log(error);
  //   }
  // };

  const getdata = () => {
    try {
      AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          setisloaded(false);
          navigation.reset({
            index: 0,
            routes: [{name: 'UserPage'}],
          });
        } else {
          setisloaded(false);
        }
      });
    } catch (e) {
      alert(e);
    }
  };
  const getuid = () => {
    try {
      AsyncStorage.getItem('UserUid').then(value => {
        if (value != null) {
          dispatch(setUser(value));
        }
      });
    } catch (e) {
      alert(e);
    }
  };

  const forgotpassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Password reset email has been sent successfully');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  const login = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        var user1 = {
          Email: email,
          Password: password,
        };
        await AsyncStorage.setItem('UserData', JSON.stringify(user1));
        dispatch(setUser(userCredential.user.uid));
        await AsyncStorage.setItem('UserUid', userCredential.user.uid);
        navigation.replace('UserPage');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <View style={styles.loginmainpage}>
      {isloaded ? (
        <View>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
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
          <Text style={styles.loginpagetext}>Login</Text>
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
              keyboardType="email-address"
              onChangeText={email => setemail(email)}
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
              onChangeText={password => setpassword(password)}
            />
          </View>
          <CustomButton
            onPress={() => login()}
            buttonStyle={{
              backgroundColor: '#f95999',
              margin: 10,
            }}
            buttonTitle="Login"
          />
          <Text style={styles.forgotpassword} onPress={() => forgotpassword()}>
            Forgot Password?
          </Text>
          <Pressable>
            <Text style={styles.googlebutton}>Sign in with Google</Text>
          </Pressable>
          <Text
            style={styles.register}
            onPress={() => navigation.navigate('Signpage')}>
            Dont have an account?Create here
          </Text>
        </ScrollView>
      )}
    </View>
  );
}

export default LoginPage;

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
  forgotpassword: {
    fontSize: 15,
    color: 'white',
    marginTop: 5,
    marginBottom: 5,
  },
  googlebutton: {
    color: 'red',
    fontSize: 20,
  },
});
