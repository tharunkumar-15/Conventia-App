import {StyleSheet, Text, View, ScrollView, Image, Modal} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {collection, query, where, onSnapshot} from 'firebase/firestore';
import {db} from '../config';
import {useSelector} from 'react-redux';
import CustomCard from './CustomCard';
import CustomInput from '../CustomInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {format} from 'date-fns';

export default function ImportantTab() {
  const {user} = useSelector(state => state.useReducer);
  const [data, setData] = useState([]);
  const [modalStates, setModalStates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterselected,setFilterselected] = useState({
    Ascendingrelativename: false,
    Descendingrelativename: false,
    Ascendingrelation: false,
    Descendingrelation: false,
  });
  const [relatives, setRelatives] = useState({});
  const keys = ['Summary', 'SummaryDate'];
  const [importantconversation, setImportantConversation] = useState([]);
  const [filtermodal, setFilterModal] = useState(false);

  useEffect(() => {
    if (data) {
      let obj = Object.keys(data).map(relativeId => data[`${relativeId}`]);
      let res = [];
      for (let i = 0; i < obj.length; i++) {
        res = [...res, ...obj[i]];
      }
      setImportantConversation(res);
    }
  }, [data]);

  useEffect(() => {
    console.log('Relatives fetched', relatives);
  }, [relatives]);

  useEffect(() => {
    const relativesRef = collection(db, 'Users', user, 'Relatives');
    const relativesData = [];
    const unsubscribe = onSnapshot(relativesRef, querySnapshot => {
      querySnapshot.forEach(doc => {
        const relativeInfo = doc.data();
        setRelatives(prev => {
          return {
            ...prev,
            [doc.id]: {
              name: relativeInfo.RelativeName,
              relation: relativeInfo.Relation,
            },
          };
        });
        const importRef = collection(
          db,
          'Users',
          user,
          'Relatives',
          doc.id,
          'RecordedConversation',
        );

        const importQuery = query(importRef, where('Important', '==', true));

        onSnapshot(importQuery, importSnapshot => {
          const importData = importSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          relativesData.push(...importData);
          console.log('Important Data:', importData);
          setData(prevData => {
            return {...prevData, [doc.id]: importData};
          });
          setModalStates(new Array(relativesData.length).fill(false));
        });
      });
    });
    return unsubscribe;
  }, []);

  const openmodal = () => {
    setFilterModal(!filtermodal);
  };

  return (
    <View style={styles.Cardcontainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}
        style={styles.scrollcontainer}>
        <Text style={styles.Tabtext}>Important Conversation Tab</Text>
        <View style={styles.filtercontainer}>
          <View style={styles.searchcontainer}>
            <CustomInput
              placeholderText="Search"
              autoCapitalize="none"
              autoCorrect={false}
              Icon={FontAwesome}
              Icontype="search"
              onChangeText={text => setSearchQuery(text)}
            />
          </View>
          <View style={styles.filtericon}>
            <TouchableOpacity onPress={() => openmodal()}>
              <Image
                source={require('../filter.png')}
                style={styles.Icon}
                // resizeMode="stretch"
              />
            </TouchableOpacity>
          </View>
          <Modal
            visible={filtermodal}
            onRequestClose={() => openmodal()}
            animationType="fade"
            transparent={true}>
            <View style={[styles.modalstyle, {justifyContent: 'flex-end'}]}>
              <View style={styles.modalbackground}>
                <Entypo
                  size={35}
                  color={'black'}
                  name="cross"
                  onPress={() => openmodal()}
                  style={styles.cross}
                />
                <Text
                  style={
                   filterselected.Ascendingrelativename
                      ? styles.selectedstyle
                      : styles.filtertext
                  }
                  onPress={() => {
                    setFilterselected({Ascendingrelation:false,Ascendingrelativename:true,Descendingrelation:false,Descendingrelativename:false});
                  }}>
                  Ascending Order based on relativename
               </Text>
                <Text
                  style={
                    filterselected.Descendingrelativename
                      ? styles.selectedstyle
                      : styles.filtertext
                  }
                  onPress={() => {
                    setFilterselected({Ascendingrelation:false,Ascendingrelativename:false,Descendingrelation:false,Descendingrelativename:true});
                  }}>
                  Descending Order based on relativename
                </Text>
                <Text
                  style={
                    filterselected.Ascendingrelation
                      ? styles.selectedstyle
                      : styles.filtertext
                  }
                  onPress={() => {
                    setFilterselected({Ascendingrelation:true,Ascendingrelativename:false,Descendingrelation:false,Descendingrelativename:false});
                  }}>
                  Ascendig Order based on relation
                </Text>
                <Text
                  style={
                    filterselected.Descendingrelation
                      ? styles.selectedstyle
                      : styles.filtertext
                  }
                  onPress={() => {
                    setFilterselected({Ascendingrelation:false,Ascendingrelativename:false,Descendingrelation:true,Descendingrelativename:false});
                  }}>
                  Descending Order based on relation
                </Text>
              </View>
            </View>
          </Modal>
        </View>
        {importantconversation &&
          importantconversation
            .filter(info =>
              keys.some(key => {
                console.log('Infodate', info);
                const filterKey =
                  key === 'SummaryDate'
                    ? format(
                        new Date(info.SummaryDate.seconds * 1000),
                        'MMM d, yyyy h:mm a',
                      )
                    : info[key];
                return (
                  filterKey &&
                  typeof filterKey === 'string' &&
                  filterKey.toLowerCase().includes(searchQuery.toLowerCase())
                );
              }),
            )
            .map((info, index) => (
              <View key={index} style={styles.cardstyle}>
                <CustomCard
                  info={info}
                  modalStates={modalStates}
                  setModalStates={setModalStates}
                  index={index}
                  setData={setData}
                  relativeid={info.RelativeId}
                  relativeName={relatives[`${info.RelativeId}`].name}
                  relativeRelation={relatives[`${info.RelativeId}`].relation}
                  setImportant={setImportantConversation}
                />
              </View>
            ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  Cardcontainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F6F3',
  },
  Tabtext: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
  },
  cardstyle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollcontainer: {
    width: '100%',
  },
  filtercontainer: {
    flex: 1,
    flexDirection: 'row',
  },
  searchcontainer: {
    flex: 6,
    marginLeft: 15,
  },
  filtericon: {
    flex: 1,
  },
  Icon: {
    width: 28,
    height: 27,
    marginLeft: 5,
    marginTop: 21,
  },
  modalstyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalbackground: {
    width: '100%',
    height: 270,
    alignItems: 'center',
    backgroundColor: '#F8F6F3',
    borderRadius: 7,
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  filtertext: {
    color: 'black',
    fontSize: 17,
    textAlign: 'center',
    marginTop: 15,
    fontWeight: 'bold',
  },
  cross: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingBottom: 10,
    marginRight: 10,
  },
  selectedstyle: {
    width: '80%',
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 10,
    color: 'black',
    fontSize: 17,
    paddingLeft: 8,
    marginTop: 10,
  },
});
