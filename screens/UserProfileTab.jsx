import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../CustomButton';
import {signOut} from 'firebase/auth';
import {auth, db, storage} from '../config';
import {doc, getDoc, updateDoc,onSnapshot} from 'firebase/firestore';
// import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../Redux/Actions';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import CustomInput from '../CustomInput';
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';

function UserProfileTab({navigation}) {
  const [userdata, setUserdata] = useState([]);
  const [modal, setModal] = useState(false);
  const [update, setUpdate] = useState({
    Name: '',
    Address: '',
    Caregiverno: '',
  });
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [imagePath, setImagePath] = useState('');
  const [inputValue, setInputValue] = useState('');
  const {user} = useSelector(state => state.useReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    Userdata();
  }, []);

  const uploadimage = async () => {
    console.log('upload function called');
    const blobImage = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError('Newtork error failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', imagePath, true);
      xhr.send(null);
    });

    const metadata = {
      contentType: 'image/jpeg',
    };

    const storageRef = ref(storage, 'Userimage/' + Date.now());
    const snapshot = await uploadBytesResumable(
      storageRef,
      blobImage,
      metadata,
    );

    const downloadURL = await getDownloadURL(snapshot.ref);
    const Imageref = doc(db, 'Users', user);

    const storageStatus = await updateDoc(Imageref, {
      UserImage: downloadURL,
    });
    console.log('downloadURL', downloadURL);

    setIsImageUploaded(true); // <-- Set state variable to true after image upload
  };

  useEffect(() => {
    if (imagePath !== '' && !isImageUploaded) {
      // <-- Add check for isImageUploaded
      uploadimage();
      setImagePath('');
    } else if (isImageUploaded) {
      // <-- Reset state variable to false after image upload
      setIsImageUploaded(false);
    }
  }, [imagePath, isImageUploaded]);

  const Userdata = async () => {
    try {
      const UserRef = doc(db, 'Users', user);
      onSnapshot(UserRef, (doc) => {
        setUserdata(doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  };
  

  function takePhoto() {
    console.log('captured');
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image.path);
        setImagePath(image.path);
      })
      .catch(error => {
        console.log('Error taking photo:', error);
      });
  }

  const modalHandler = () => {
    setModal(prevstate => !prevstate);
  };

  const submitbutton = async () => {
    const UserRef = doc(db, 'Users', user);
    await updateDoc(UserRef, {
      Name: update.Name,
      Address: update.Address,
      Caregiverno: update.Caregiverno,
    }).then(() => {
      setInputValue('');
      setModal(!modal);
    });
  };

  const logout = () => {
    try {
      signOut(auth).then(() => {
        AsyncStorage.removeItem('UserData').then(() => {
          dispatch(setUser(''));
          navigation.navigate('userloginpage');
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.usercontainer}>
      <View style={styles.buttonstyle}>
        <CustomButton buttonTitle="Sign Out" onPress={() => logout()} />
        <CustomButton
          buttonTitle="Edit Profile"
          onPress={() => modalHandler()}
        />
        <Modal
          visible={modal}
          onRequestClose={() => modalHandler()}
          animationType="fade"
          transparent={true}>
          <View style={styles.modalstyle}>
            <View style={styles.modalbackground}>
              <Entypo
                size={35}
                color={'black'}
                name="cross"
                onPress={() => modalHandler()}
                style={styles.cross}
              />
              <CustomInput
                placeholderText="Name"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => setUpdate({...update, Name: text})}
                Icon={Ionicons}
                Icontype="person-outline"
                value={update}
              />
              <CustomInput
                placeholderText="Address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => setUpdate({...update, Address: text})}
                Icon={FontAwesome}
                Icontype="address-card-o"
                value={update}
              />
              <CustomInput
                placeholderText="Card-Giver Number"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => setUpdate({...update, Caregiverno: text})}
                Icon={Feather}
                Icontype="phone"
                value={update}
              />
              <CustomButton
                buttonTitle="Submit"
                onPress={() => submitbutton()}
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
export default UserProfileTab;

const styles = StyleSheet.create({
  usercontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  userdetails: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datacontainer: {
    textAlign: 'center',
    color: 'black',
    fontSize: 19,
    margin: 7,
    fontWeight: 'bold',
    marginTop: 25,
  },
  buttonstyle: {
    flex: 1.5,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalstyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalbackground: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F6F3',
    borderRadius: 7,
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  userimage: {
    width: 150,
    height: 150,
    borderRadius: 80,
    marginBottom: 20,
    backgroundColor: '#F8F6F3',
  },
  cross: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingBottom: 10,
  },
});
