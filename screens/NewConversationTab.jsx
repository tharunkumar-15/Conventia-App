import React, {useState, useEffect} from 'react';
import {Buffer} from 'buffer';
import Permissions from 'react-native-permissions';
import AudioRecord from 'react-native-audio-record';
import {
  View,
  PermissionsAndroid,
  Button,
  Pressable,
  StyleSheet,
} from 'react-native';
import {MotiView} from '@motify/components';
import {Easing} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import axios from 'axios';
import {auth, db, storage} from '../config';
import {collection, addDoc} from 'firebase/firestore';
import {useSelector} from 'react-redux';
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';
import { error } from 'console';

const NewConversationTab = ({navigation}) => {
  // const [audioFile, setAudioFile] = useState('Demo');
  // const [loaded, setLoaded] = useState(false);
  let audio='';
  const [recording, setRecording] = useState(false);

  const animationHandler = () => {
    setRecording(!recording);
  };

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

  // useEffect(() =>{
  //   if(audiopath!='')
  //   axios.get(`https://127.0.0.1:5000/perform-diarization?id=${user}&url=${audiopath}`)
  //   .then(response => {
  //     console.log("AudioResponse: ", response.data)
  //   })
  //   .catch(error => {
  //     console.log("AudioError: ", response.data)
  //     console.error(error);
  //   });
  // },[audiopath]);

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
    console.log("AudioFiePathUploading: ",audio)
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
    console.log('audiopathcheck',audio);
    //setAudioFile(audiopath);
    setRecording(false);
    sendaudio();
  };

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
});
