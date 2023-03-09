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

const NewConversationTab = ({navigation}) => {
  const [audioFile, setAudioFile] = useState('');
  // const [loaded, setLoaded] = useState(false);
  // let sound = null;

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

  const start = () => {
    setAudioFile('');
    setRecording(true);
    // setLoaded(false);
    AudioRecord.start();
  };

  const stop = async () => {
    let audioFile = await AudioRecord.stop();
    console.log('audioFile', audioFile);
    setAudioFile(audioFile);
    setRecording(false);
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
