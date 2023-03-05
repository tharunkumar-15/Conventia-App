import React from 'react'
import{
    View,
    Text,
    StyleSheet,
} from 'react-native';
function NewConversationTab() {
  return (
    <View style={styles.usercontainer}>
      <Text style={styles.welcometext}>Welcome To New Converstion Tab</Text>
    </View>
  );
}

export default  NewConversationTab

const styles=StyleSheet.create({
    usercontainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
    },
    welcometext:{
        fontSize:25,
        color:'black',
    },
})