import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import ImportantTab from './ImportantTab';

export default function ImportantConversationCard() {
    
  return (
       <View style={styles.cards}>
          <Text style={styles.title}>Important conversation</Text>
             <ImportantTab/>
       </View>
  )
}

const styles = StyleSheet.create({
    cards:{
        flex:1,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    title:{
        color:'black',
        fontSize:22,
        fontWeight:'bold'
    },
    
})