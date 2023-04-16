import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CustomInput = ({ placeholderText, Icon, Icontype, coloricon, ...rest }) => {
  return (
    <View style={styles.iconcontainer}>
      <View style={styles.icon}>
        {Icon && <Icon name={Icontype} size={25} color={'black'} />}
      </View>
      <TextInput
        style={styles.emailfield}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="black"
        maxLength={50}
        multiline={false}
        {...rest}
      />
    </View>
  );
};
export default CustomInput;

const styles = StyleSheet.create({
  iconcontainer: {
    marginTop: 10,
    marginBottom: 20,
    width: 290,
    borderColor: 'black',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: windowHeight / 15,
  },
  emailfield: {
    width: '90%',
    fontSize: 16,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  icon: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: 'black',
    borderRightWidth: 1,
    width: 60,
  },
});
