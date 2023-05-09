import {StyleSheet, Text, View, ScrollView, Image, Modal,Pressable} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {collection, query, where, onSnapshot} from 'firebase/firestore';
import {db} from '../config';
import {useSelector} from 'react-redux';
import CustomCard from './CustomCard';
import CustomInput from '../CustomInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {format} from 'date-fns';

export default function ImportantTab() {
  const {user} = useSelector(state => state.useReducer);
  const [data, setData] = useState([]);
  const [modalStates, setModalStates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [importantData, setImportantData] = useState([]);
  const [filterselected, setFilterselected] = useState({
    Ascendingrelativename: true,
    Descendingrelativename: false,
    Ascendingrelation: false,
    Descendingrelation: false,
    // Default: true,
  });
  const [relatives, setRelatives] = useState({});
  const keys = ['SummaryTitle', 'SummaryDate'];
  const [importantconversation, setImportantConversation] = useState([]);
  const [filtermodal, setFilterModal] = useState(false);

  useEffect(() => {
    if (data) {
      let obj = Object.keys(data).map(relativeId => data[`${relativeId}`]);
      let res = [];
      for (let i = 0; i < obj.length; i++) {
        res = [...res, ...obj[i]];
      }
      let result=res.sort((a, b) =>
      relatives[`${a.RelativeId}`].name.localeCompare(
        relatives[`${b.RelativeId}`].name,
      ),
    );
      setImportantConversation(result);
    }
  }, [data]);

  useEffect(() => {
    setImportantData(importantconversation);
    console.log('Data for filter:', importantData);
  }, [importantconversation]);

  useEffect(() => {
    console.log('Relatives fetched', relatives);
  }, [relatives]);

  useEffect(() => {
    searchfilter();
  }, [searchQuery]);

  const searchfilter = () => {
    const filteredData = importantData.filter(info =>
      keys.some(key => {
        const filterKey = info[key];
        return (
          filterKey &&
          typeof filterKey === 'string' &&
          filterKey.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }),
    );
    console.log('filtered data:', filteredData);
    if (searchQuery != '') {
      setImportantData(filteredData);
    } else {
      setImportantData(importantconversation);
    }
  };

  // const defaultdata = () => {
  //   console.log('Defaultdata called');
  //   console.log('ImportantData called:', importantconversation);
  //   setImportantData(importantconversation);
  //   console.log('Inside Defaultdata', importantData);
  //   openmodal();
  // };

  const ascendingordername = () => {
    let result = importantData.sort((a, b) =>
      relatives[`${a.RelativeId}`].name.localeCompare(
        relatives[`${b.RelativeId}`].name,
      ),
    );
    setImportantData(result);
    openmodal()
  };

  const descendingordername = () => {
    let result = importantData.sort((a, b) =>
      relatives[`${b.RelativeId}`].name.localeCompare(
        relatives[`${a.RelativeId}`].name,
      ),
    );
    setImportantData(result);
    openmodal();
  };

  const ascendingorderrelative = () => {
    let result = importantData.sort((a, b) =>
      relatives[`${a.RelativeId}`].relation.localeCompare(
        relatives[`${b.RelativeId}`].relation,
      ),
    );
    setImportantData(result);
    openmodal();
  };

  const descendingorderrelative = () => {
    let result = importantData.sort((a, b) =>
      relatives[`${b.RelativeId}`].relation.localeCompare(
        relatives[`${a.RelativeId}`].relation,
      ),
    );
    setImportantData(result);
    openmodal();
  };

  useEffect(() => {
    if (user != '') {
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
    }
  }, [user]);

  const openmodal = () => {
    console.log('modal is opening wait');
    setFilterModal(!filtermodal);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{alignItems: 'center'}}
      style={styles.scrollcontainer}>
      <View style={styles.filtercontainer}>
        <View style={styles.searchcontainer}>
          <CustomInput
            placeholderText="Search"
            autoCapitalize="none"
            autoCorrect={false}
            Icon={FontAwesome}
            Icontype="search"
            onChangeText={text => setSearchQuery(text)}
            value={searchQuery}
          />
        </View>
        {/* <Button onPress={openmodal} title='hii'></Button> */}
        <View style={styles.filtericon} onPress={openmodal}>
          <Pressable onPress={openmodal}>
            <Image source={require('../filter.png')} style={styles.Icon} />
          </Pressable>
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
              {/* <View style={styles.selectedicon}>
                <Text
                  style={styles.filtertext}
                  onPress={() => {
                    defaultdata();
                    setFilterselected({
                      Ascendingrelation: false,
                      Ascendingrelativename: false,
                      Descendingrelation: false,
                      Descendingrelativename: false,
                      Default: true,
                    });
                  }}>
                  Default
                </Text>
                {filterselected.Default && (
                  <AntDesign
                    style={styles.selecticon}
                    size={22}
                    name="checkcircle"
                    color="green"
                  />
                )}
              </View> */}
              <View style={styles.selectedicon}>
                <Text
                  style={styles.filtertext}
                  onPress={() => {
                    ascendingordername(),
                      setFilterselected({
                        Ascendingrelation: false,
                        Ascendingrelativename: true,
                        Descendingrelation: false,
                        Descendingrelativename: false,
                        //Default: false,
                      });
                  }}>
                  Ascending Order based on relativename
                </Text>
                {filterselected.Ascendingrelativename && (
                  <AntDesign
                    style={styles.selecticon}
                    size={22}
                    name="checkcircle"
                    color="green"
                  />
                )}
              </View>
              <View style={styles.selectedicon}>
                <Text
                  style={styles.filtertext}
                  onPress={() => {
                    descendingordername();
                    setFilterselected({
                      Ascendingrelation: false,
                      Ascendingrelativename: false,
                      Descendingrelation: false,
                      Descendingrelativename: true,
                      //Default: false,
                    });
                  }}>
                  Descending Order based on relativename
                </Text>
                {filterselected.Descendingrelativename && (
                  <AntDesign
                    style={styles.selecticon}
                    size={22}
                    name="checkcircle"
                    color="green"
                  />
                )}
              </View>
              <View style={styles.selectedicon}>
                <Text
                  style={styles.filtertext}
                  onPress={() => {
                    ascendingorderrelative();
                    setFilterselected({
                      Ascendingrelation: true,
                      Ascendingrelativename: false,
                      Descendingrelation: false,
                      Descendingrelativename: false,
                      //Default: false,
                    });
                  }}>
                  Ascendig Order based on relation
                </Text>
                {filterselected.Ascendingrelation && (
                  <AntDesign
                    style={styles.selecticon}
                    size={22}
                    name="checkcircle"
                    color="green"
                  />
                )}
              </View>
              <View style={styles.selectedicon}>
                <Text
                  style={styles.filtertext}
                  onPress={() => {
                    descendingorderrelative();
                    setFilterselected({
                      Ascendingrelation: false,
                      Ascendingrelativename: false,
                      Descendingrelation: true,
                      Descendingrelativename: false,
                      //Default: false,
                    });
                  }}>
                  Descending Order based on relation
                </Text>
                {filterselected.Descendingrelation && (
                  <AntDesign
                    style={styles.selecticon}
                    size={22}
                    name="checkcircle"
                    color="green"
                  />
                )}
              </View>
            </View>
          </View>
        </Modal>
      </View>
      {importantData && importantData.length > 0 ? (
        importantData.map((infodata, index) => {
          return (
            <View key={index} style={styles.cardstyle}>
              <CustomCard
                info={infodata}
                modalStates={modalStates}
                setModalStates={setModalStates}
                index={index}
                setData={setData}
                relativeid={infodata.RelativeId}
                relativeName={relatives[`${infodata.RelativeId}`].name}
                relativeRelation={relatives[`${infodata.RelativeId}`].relation}
                setImportant={setImportantData}
              />
            </View>
          );
        })
      ) : (
        <Text style={styles.nodatatext}>No results found</Text>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  Cardcontainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 30,
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
    marginLeft: 10,
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
    height: 290,
    alignItems: 'center',
    backgroundColor: '#F8F6F3',
    borderRadius: 7,
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  filtertext: {
    color: 'black',
    fontSize: 15,
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
  selectedicon: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  selecticon: {
    marginLeft: 7,
  },
  nodatatext: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});
