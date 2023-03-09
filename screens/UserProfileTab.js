import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Modal} from 'react-native';
import CustomButton from '../CustomButton';
import {signOut} from 'firebase/auth';
import {auth} from '../config';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
// import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../Redux/Actions';
import {db} from '../config';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import CustomInput from '../CustomInput';

function UserProfileTab({navigation}) {
  const [userdata, setUserdata] = useState([]);
  const [modal, setModal] = useState(false);
  const [update, setUpdate] = useState({
    Name: '',
    Address: '',
    Caregiverno: '',
  });
  const {user} = useSelector(state => state.useReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    Userdata();
  }, []);

  const Userdata = async () => {
    try {
      const UserRef = doc(db, 'Users', user);
      const UserSnap = await getDoc(UserRef);
      setUserdata(UserSnap.data());
    } catch (error) {
      console.log(error);
    }
  };

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
      setModal(!modal);
      Userdata();
    });
  };
  
  const logout = () => {
    try {
      signOut(auth).then(() => {
        AsyncStorage.removeItem('UserData');
        dispatch(setUser(''));
        navigation.navigate('userloginpage');
      });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <View style={styles.usercontainer}>
      <View style={styles.userdetails}>
        <View>
          <Text style={styles.datacontainer}>Name:{userdata.Name}</Text>
          {userdata.Address && (
            <Text style={styles.datacontainer}>Address:{userdata.Address}</Text>
          )}
          {userdata.Caregiverno && (
            <Text style={styles.datacontainer}>
              Care-Giver No:{userdata.Caregiverno}
            </Text>
          )}
        </View>
      </View>
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
              <CustomInput
                placeholderText="Name"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => setUpdate({...update, Name: text})}
                Icon={Ionicons}
                Icontype="person-outline"
              />
              <CustomInput
                placeholderText="Address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => setUpdate({...update, Address: text})}
                Icon={FontAwesome}
                Icontype="address-card-o"
              />
              <CustomInput
                placeholderText="Card-Giver Number"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => setUpdate({...update, Caregiverno: text})}
                Icon={Feather}
                Icontype="phone"
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
  },
  welcometext: {
    fontSize: 25,
    color: 'black',
  },
  userdetails: {
    flex: 2,
  },
  datacontainer: {
    textAlign: 'center',
    color: 'black',
    fontSize: 19,
    margin: 7,
    marginTop: 25,
  },
  buttonstyle: {
    flex: 1,
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
});
