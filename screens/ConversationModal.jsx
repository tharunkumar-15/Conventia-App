import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

function ConversationModal({conversation, modalhandler}) {
  return (
    <View style={styles.container}>
      <View style={styles.modalcontent}>
        <Entypo
          size={35}
          color={'black'}
          name="cross"
          onPress={modalhandler}
          style={styles.cross}
        />
        <Text style={styles.text}>{conversation}</Text>
      </View>
    </View>
  );
}

export default ConversationModal;

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 18,
    lineHeight: 27,
    marginTop: 23,
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
  cross: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
  },
});
