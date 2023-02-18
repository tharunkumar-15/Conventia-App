import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { setUser } from '../Redux/Actions';

function UserPage() {
  const { user} = useSelector(state => state.useReducer);
  return (
    <View style={styles.usercontainer}>
      <Text style={styles.welcometext}>Welcome To Home Tab</Text>
      <Text>{user}</Text>
    </View>
  );
}

export default UserPage;

const styles = StyleSheet.create({
  usercontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#86c4b5',
  },
  welcometext: {
    fontSize: 25,
    color: 'black',
  },
});
