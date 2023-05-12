import React, {useState, useEffect} from 'react';
import {Buffer} from 'buffer';
import mime from 'mime';
import Permissions from 'react-native-permissions';
import AudioRecord from 'react-native-audio-record';
import {
  View,
  Pressable,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  ToastAndroid,
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
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
  uploadBytes,
} from 'firebase/storage';
import {doc,onSnapshot} from 'firebase/firestore';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import { useRoute } from '@react-navigation/native';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  OutputFormatAndroidType
} from 'react-native-audio-recorder-player';


const NewConversationTab = ({navigation}) => {
  const {user} = useSelector(state => state.useReducer);
  const [userdata, setUserdata] = useState([]);
  const [recorderPlayer, setRecorderPlayer] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioPath, setAudioPath] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [downloadURL, setDownloadURL] = useState('');
  const [important, setImportant] = useState(false);
  const route = useRoute();
  const { relativeid, relativename } = route.params || {};

  const [title, setTitle] = useState('');

  useEffect(() => {
    // Initialize AudioRecorderPlayer
    const initRecorderPlayer = async () => {
      const player = new AudioRecorderPlayer();
      await player.setSubscriptionDuration(0.1); // Set subscription duration for real-time recording updates
      setRecorderPlayer(player);
    };
    initRecorderPlayer();
  }, []);

  const audioSet = {
    AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
    AudioSourceAndroid: AudioSourceAndroidType.MIC,
    AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
    AVNumberOfChannelsKeyIOS: 2,
    AVFormatIDKeyIOS: AVEncodingOption.aac,
    OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
  };
  console.log('audioSet', audioSet);

const startRecording = async () => {
    // setIsRecording(true);
     const path = `${RNFS.DocumentDirectoryPath}/audio.mp3`; // Specify the file path for the recorded audio
    //enable here
    // const path = `${RNFS.DocumentDirectoryPath}/audio.mp3`;
    const audio_start_uri =await recorderPlayer.startRecorder(path, audioSet);
    
    console.log('audio start uri: ',audio_start_uri);
  };

  const stopRecording = async () => {
    // setIsRecording(false);
    const result = await recorderPlayer.stopRecorder(); // Stop recording
    console.log('The result is:', result);
    setAudioPath(result); // Set the audio path to the recorded audio file
  };

  useEffect(() => {
    if (audioPath != '') {
      uploadAudio();
      modalHandler();
    }
  }, [audioPath]);

  const animationHandler = () => {
    setIsRecording(!isRecording);
  };

  useEffect(() => {
    if (isRecording) startRecording();
    else stopRecording();
  }, [isRecording]);

  const modalHandler = () => {
    setModalOpen(!modalOpen);
  };

  const toggleHandler = () => {
    setImportant(!important);
  };

  const uploadAudio = async () => {
    console.log('upload function called');
    if (audioPath) {
      console.log('upload function called');
      console.log('AudioFilePathUploading: ', audioPath);
      const blobAudio = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError('Newtork error failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', audioPath, true);
        xhr.send(null);
      });

      const metadata = {
        contentType:'audio/mp3',
      };

      // const storageRef = ref(storage, 'ConversationAudio/' + Date.now());
      const storageRef = ref(storage, 'ConversationAudio/' + 'audio.mp3');
      const snapshot = await uploadBytesResumable(
        storageRef,
        blobAudio,
        metadata,
      );
      const AudiodownloadURL = await getDownloadURL(snapshot.ref);
      setDownloadURL(AudiodownloadURL);
      console.log('downloadAudioURL: ', AudiodownloadURL);
    }
  };

  useEffect(()=>{
    Userdata();
  },[])

  const Userdata = async () => {
    try {
      const UserRef = doc(db,'Users',user);
      onSnapshot(UserRef, (doc) => {
        setUserdata(doc.data());
        console.log(doc.data);
      });
      console.log(userdata)
    } catch (error) {
      console.log(error);
    }
  };

  const submitdata = () => {
    modalHandler();
    console.log("Axios is working");
    console.log("Username:",userdata.Name);
    axios
      .post(`http://192.168.1.35:5000/perform-summarization`, {
        userId: user,
        UserName: userdata.Name,
        RelativeId: relativeid,
        RelativeName: relativename,
        url: downloadURL,
        SummaryTitle: title,
        Important: important,
      })
      .then(response => {
        ToastAndroid.show(
          'Conversation will be added soon',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        console.log('AudioResponse: ',response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const playAudio = async () => {
    if (audioPath) {
      setIsPlaying(true);

      const sound = new Sound(audioPath, '', error => {
        if (error) {
          console.error('Failed to load the sound', error);
          setIsPlaying(false);
        } else {
          sound.play(() => {
            setIsPlaying(false);
            sound.release();
          });
        }
      });
    }
  };

  useEffect(() => {
    console.log('The path of audio is: ', audioPath);
  }, [audioPath]);

  return (
    // <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    //   <Button onPress={startRecording} title="Start Recording" />
    //   <Button onPress={stopRecording} title="Stop Recording" />
    //   <Button onPress={playAudio} title="Play Audio" />
    //   {audioPath && <Button title="Upload Audio" onPress={uploadAudio} />}
    // </View>

    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Pressable style={[styles.dot, styles.center]}>
        {isRecording &&
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
