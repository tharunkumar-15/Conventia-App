import { Button, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import CustomButton from '../CustomButton'
import { useNavigation } from '@react-navigation/native';
export default function ImportantConversationCard() {
    const navigation = useNavigation();
  return (
       <View style={styles.cards}>
          <Text style={styles.title}>Important conversation</Text>
          <CustomButton
            buttonTitle='View'
            buttonStyle={{
                backgroundColor:"#f95999",
                width:'45%',
              }}
              onPress={() => navigation.navigate('ImportantTab')}
          />
          {/* <Button title='VIEW' onPress={() => navigation.navigate('User Profile',{screen:'UserProfileTab'})}/> */}
       </View>
  )
}

const styles = StyleSheet.create({
    convcardcontainer:{
        flex:1,
    },
    cards:{
        width: '90%',
        borderRadius: 10,
        backgroundColor: '#51087E',
        marginTop: 15,
        marginBottom: 15,
        padding: 10,
        alignItems:'center'
    },
    title:{
        color:'white',
        fontSize:22,
        fontWeight:'bold'
    },
    
})