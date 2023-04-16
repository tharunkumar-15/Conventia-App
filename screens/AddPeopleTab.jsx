import {Image} from '@motify/components';
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../CustomButton';
import {auth, db, storage} from '../config';
import {collection, doc, getDoc, updateDoc, addDoc} from 'firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';

function AddPeopleTab() {
  const {user} = useSelector(state => state.useReducer);
  const [image, setImage] = useState(
    'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg',
  );
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [showloader, setShowloader] = useState(false);
  const input = useRef(null);

  function takePhoto() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image.path);
        setImage(image.path);
      })
      .catch(error => {
        console.log('Error taking photo:', error);
      });
  }

  const senddata = async () => {
    setShowloader(true);
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
      xhr.open('GET', image, true);
      xhr.send(null);
    });

    const metadata = {
      contentType: 'image/jpeg',
    };

    const storageRef = ref(storage, 'RelativeImage/' + Date.now());
    const snapshot = await uploadBytesResumable(
      storageRef,
      blobImage,
      metadata,
    );
    const downloadURL = await getDownloadURL(snapshot.ref);

    const relativesRef = collection(db, 'Users', user, 'Relatives');
    await addDoc(relativesRef, {
      Relation: relation,
      RelativeName: name,
      ImageUri: downloadURL,
    }).then(() => {
      setName('');
      setRelation('');
      setImage(
        'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg',
      );
      setShowloader(false);
      ToastAndroid.show('Relative Added',ToastAndroid.SHORT,ToastAndroid.BOTTOM)
    });

    console.log('downloadURL', downloadURL);
  };

  // const senddata = async () => {
  //   const relativesRef = collection(db, 'Users', user, 'Relatives');
  //   await addDoc(relativesRef, {
  //     Relation: relation,
  //     RelativeName: name,
  //     ImageUri: downloadURL,
  //   }).then(() => {
  //     setName('');
  //     setRelation('');
  //     setImage('');
  //   });
  //   // uploadimage();
  // };

  return (
    <View style={styles.usercontainer}>
      <ScrollView styles={styles.usercontainer}>
        <View style={styles.imagecomponent}>
          <Image
            source={{
              uri: image,
            }}
            style={styles.imagestyle}
          />
          <Pressable style={styles.dotStyle}>
            <Icon
              name="camera"
              size={30}
              color="#fff"
              onPress={() => takePhoto()}
            />
          </Pressable>
        </View>

        <Text style={styles.headtext}>Enter details</Text>

        <View style={styles.inputtextstyle}>
          <Text style={styles.inputtext}>Name:</Text>
          <TextInput
            style={styles.textstyle}
            onChangeText={text => {
              setName(text);
            }}
            value={name}
          />

          <Text style={styles.inputtext1}>Relation:</Text>
          <TextInput
            style={styles.textstyle}
            onChangeText={text => {
              setRelation(text);
            }}
            value={relation}
          />
        </View>
        <CustomButton
          buttonStyle={{marginLeft: 200}}
          onPress={() => senddata()}
        />
      </ScrollView>
      {showloader && (
        <View style={styles.loading}>
          <ActivityIndicator
            size="large"
            color="#51087E"
            animating={showloader}
          />
        </View>
      )}
    </View>
  );
}

export default AddPeopleTab;

const styles = StyleSheet.create({
  usercontainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imagecomponent: {
    alignItems: 'center',
  },
  headtext: {
    fontSize: 25,
    color: 'black',
    marginTop: 20,
    paddingLeft: 20,
  },
  inputtext: {
    fontSize: 25,
    color: 'black',
    paddingLeft: 20,
  },
  inputtext1: {
    fontSize: 25,
    color: 'black',
    paddingLeft: 20,
    marginTop: 15,
  },
  textstyle: {
    height: 40,
    borderBottomWidth: 2,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    color: '#000',
    fontSize: 18,
  },
  inputtextstyle: {
    margin: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ddd',
  },
  imagestyle: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginTop: 80,
  },
  dotStyle: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: '#6E01EF',
    alignItems: 'center',
    marginLeft: 90,
    justifyContent: 'center',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
