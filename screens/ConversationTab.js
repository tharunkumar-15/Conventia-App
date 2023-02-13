import React from 'react'
import{
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Pressable,
} from 'react-native';
import CustomButton from '../CustomButton';
function ConversationTab() {
  
  const convcards=[
    {image:require('../Loginimage.jpg'),name:'Surya S',relation:'Friend',Date:'[19-01-23] consume tablets on time'},
    {image:require('../Loginimage.jpg'),name:'Surya S',relation:'Friend',Date:'[19-01-23] consume tablets on time'},
    {image:require('../Loginimage.jpg'),name:'Surya S',relation:'Friend',Date:'[19-01-23] consume tablets on time'},
    {image:require('../Loginimage.jpg'),name:'Surya S',relation:'Friend',Date:'[19-01-23] consume tablets on time'},
    {image:require('../Loginimage.jpg'),name:'Surya S',relation:'Friend',Date:'[19-01-23] consume tablets on time'},
  ]



  return (
    <View style={styles.usercontainer}>
       <ScrollView  contentContainerStyle={{ alignItems: 'center'}}>
      <Text style={styles.welcometext}>Conversation Tab</Text>
      {
        convcards.map((cards,index)=>
        <View style={styles.carddesign} key={index}>
          <Image
          source={cards.image}
          style={styles.cardimage}
          />
          <View 
          style={styles.carddetails}
          >
           <Text style={styles.relativedetails}>Name: {cards.name}</Text>
           <Text style={styles.relativedetails}>Relation: {cards.relation}</Text>
           <Text style={styles.relativedetails}>Recordings: {cards.Date}</Text>
           <Pressable
           style={styles.buttonContainer}
           >
            <Text style={styles.buttonText}>
              More Info
            </Text>
          </Pressable>
          </View>
        </View>
      )
    }
    </ScrollView>
    </View>
  );
}

export default ConversationTab;

const styles=StyleSheet.create({
    usercontainer:{
        flex:1,
        backgroundColor:'#86c4b5',
        justifyContent:'center',
        paddingBottom:120,
        paddingTop:15,
    },
    welcometext:{
        textAlign:'center',
        fontSize:25,
        color:'black',
        marginBottom:10,
    },
   
    carddesign:{
      width:'90%',
      borderRadius:5,
      backgroundColor:'#f8f6f3',
      marginTop:15,
      marginBottom:15,
      padding:10,
      flexDirection:'row',
    },
    cardimage:{
       width:125,
       height:125,
       borderRadius:80,
    },
    carddetails:{
    flex: 1,
    flexDirection: 'column',   
    justifyContent: 'center',
    padding:10,
    },
    relativedetails:{
      fontSize:18,
      color:'black',
    },
    buttonContainer: {
      marginTop: 10,
      width: '70%',
      backgroundColor: '#131E3A',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 3,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ffffff',
      fontFamily: 'Lato-Regular',
    },
})