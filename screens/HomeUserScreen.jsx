import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React from 'react'
import ImportantConversationCard from './ImportantConversationCard'

export default function HomeUserScreen() {
  return (
    <View style={styles.homecontainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{alignItems: 'center'}} style={styles.scrollcontainer}>
        <ImportantConversationCard/>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    homecontainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#F8F6F3',
    },
    scrollcontainer:{
      width:'100%',
    }
})