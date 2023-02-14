import React from 'react'
import{
    View,
    Text,
    StyleSheet,
} from 'react-native';
function NewConverstionTab() {
  return (
    <View style={styles.usercontainer}>
      <Text style={styles.welcometext}>Welcome To New Converstion Tab</Text>
    </View>
  );
}

export default  NewConverstionTab

const styles=StyleSheet.create({
    usercontainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#86c4b5',
    },
    welcometext:{
        fontSize:25,
        color:'black',
    },
})