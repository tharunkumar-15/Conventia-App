import React, {useState, useEffect} from 'react';
import {Buffer} from 'buffer';
import Permissions from 'react-native-permissions';
import AudioRecord from 'react-native-audio-record';
import {
  View,
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import {MotiView} from '@motify/components';
import {Easing} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import CustomInput from '../CustomInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../CustomButton';
import {useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {auth, db, storage} from '../config';
import {collection, addDoc} from 'firebase/firestore';
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';
import {error} from 'console';
import AudioRecorderPlayer from 'react-native-audio-recorder-player'
const NewConversationTab = ({navigation}) => {
  const [audioFile, setAudioFile] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('true');
  const [important, setImportant] = useState(false);

  const [title, setTitle] = useState('');
  // const [loaded, setLoaded] = useState(false);
  let audio = '';
  let downloadURL =
    'https://firebasestorage.googleapis.com/v0/b/conventia-application.appspot.com/o/ConversationAudio%2Fpaint.wav?alt=media&token=e6cb0eb0-20e3-4dbc-ab08-a0e8847f3bd6';

  const [recording, setRecording] = useState(false);
  const {user} = useSelector(state => state.useReducer);
  const animationHandler = () => {
    setRecording(!recording);
  };
  let audiopath="";
  useEffect(() => {
    if (recording) start();
    else stop();
  }, [recording]);

  useEffect(() => {
    const initAudioRecord = async () => {
      await checkPermission();
      const options = {
        sampleRate: 16000,
        channels: 1,
        bitsPerSample: 16,
        wavFile: 'test.wav',
      };

      AudioRecord.init(options);

      AudioRecord.on('data', data => {
        const chunck = Buffer.from(data, 'base64');
      });
    };
    initAudioRecord();
  }, []);

  const checkPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Microphone Permission',
        message: 'Needs access to your microphone',
        buttonNeutral: 'Ask me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    const p = await Permissions.check('microphone');
    if (p === 'authorized') return;
    return requestPermission();
  };

  const requestPermission = async () => {
    const p = await Permissions.request('microphone');
  };

  const sendaudio = async () => {
    console.log('upload function called');
    console.log('AudioFiePathUploading: ', audio);
    const blobAudio = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError('Newtork error failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', audio, true);
      xhr.send(null);
    });

    const metadata = {
      contentType: 'audio/wav',
    };

    const storageRef = ref(storage, 'ConversationAudio/' + Date.now());
    const snapshot = await uploadBytesResumable(
      storageRef,
      blobAudio,
      metadata,
    );
    const downloadAudioURL = await getDownloadURL(snapshot.ref);
    console.log('downloadAudioURL: ', downloadAudioURL);
  };

  const start = () => {
    setRecording(true);
    AudioRecord.start();
  };

  const stop = async () => {
    audio = await AudioRecord.stop();
    console.log('audiopathcheck', audio);
    //setAudioFile(audiopath);
    setRecording(false);
    modalHandler();
  };

  const modalHandler = () => {
    setModalOpen(!modalOpen);
  };

  const toggleHandler = () => {
    setImportant(!important);
  };

  const submitdata = () => {
    axios
      .post(`https://127.0.0.1:5000/perform-summarization`, {
        id: user,
        url: downloadURL,
        relativename: 'Suhas',
        title: title,
        important: important,
      })
      .then(response => {
        console.log('AudioResponse: ', response.data);
      })
      .catch(error => {
        console.log('AudioError: ', response.data);
        console.error(error);
      });
    modalHandler();
  };
  // const submitdata = () => {
  //   console.log('Title:', title);
  //   const appointquery = collection(
  //     db,
  //     'Users',
  //     user,
  //     'Relatives',
  //     'vcXSI5Ge9zpSyZF4VZin',
  //     'RecordedConversation',
  //   );
  //   addDoc(appointquery, {
  //     Title: title,
  //     Important:important,
  //   })
  //     .then(() => {
  //       setTitle(''); // <-- Reset the title state to an empty string
  //       modalHandler();
  //       alert('Data sent successfully');
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  // const load = () => {
  //   return new Promise((resolve, reject) => {
  //     if (!audioFile) {
  //       return reject('file path is empty');
  //     }

  //     sound = new Sound(audioFile, '', (error) => {
  //       if (error) {
  //         console.log('failed to load the file', error);
  //         return reject(error);
  //       }
  //       setLoaded(true);
  //       return resolve();
  //     });
  //   });
  // };

  // const play = async () => {
  //   if (!loaded) {
  //     try {
  //       await load();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   Sound.setCategory('Playback');
  //   sound.play();
  // };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Pressable style={[styles.dot, styles.center]}>
        {recording &&
          [...Array(3).keys()].map(index => {
            return (
              <MotiView
                from={{opacity: 0.7, scale: 1}}
                animate={{opacity: 0, scale: 4}}
                transition={{
                  type: 'timing',
                  duration: 2000,
                  easing: Easing.out(Easing.ease),
                  delay: index * 400,
                  repeatReverse: false,
                  loop: true,
                }}
                key={index}
                style={[StyleSheet.absoluteFillObject, styles.dot]}
              />
            );
          })}
        <Icon
          name="microphone"
          size={32}
          color="#fff"
          onPress={animationHandler}
        />
      </Pressable>
      {/* <Button onPress={play} title="Play" disabled={!audioFile}/> */}
      <Modal
        visible={modalOpen}
        onRequestClose={() => modalHandler()}
        animationType="fade"
        transparent={true}>
        <View style={styles.container}>
          <View style={styles.modalcontent}>
            <CustomInput
              placeholderText="Title"
              autoCapitalize="none"
              autoCorrect={false}
              Icon={MaterialIcons}
              Icontype="title"
              onChangeText={text => setTitle(text)}
              value={title}
            />
            <View style={styles.tooglecontainer}>
              <Text style={styles.toggleText}>Important Conversation:</Text>
              <TouchableOpacity
                style={styles.toggleicon}
                onPress={toggleHandler}>
                {important ? (
                  <FontAwesome name="toggle-on" size={30} color="black" />
                ) : (
                  <FontAwesome name="toggle-off" size={30} color="black" />
                )}
              </TouchableOpacity>
            </View>
            <CustomButton buttonTitle="Submit" onPress={submitdata} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NewConversationTab;

const styles = StyleSheet.create({
  dot: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#6E01EF',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalcontent: {
    backgroundColor: '#F8F6F3',
    width: '90%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    position: 'relative',
  },
  toggleText: {
    color: 'black',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 18,
  },
  toggleicon: {
    marginLeft: 10,
    marginTop: 10,
  },
  tooglecontainer: {
    flexDirection: 'row',
  },
});
