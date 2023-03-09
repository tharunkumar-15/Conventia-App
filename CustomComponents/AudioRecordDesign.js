import Icon from 'react-native-vector-icons/SimpleLineIcons';
import React from 'react';
import { StyleSheet, View } from 'react-native/types';


function AudioRecorDesign(){
    return(
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <View style={[styles.dot, styles.center]}>
                <Icon name="microphone" size={32} color="#fff" />
            </View>
        </View>
    );
}
export default AudioRecorDesign;

const styles = StyleSheet.create({
    dot:{
        width: 100,
        height:100,
        borderRadius:100,
        backgroundColor: '#6E01EF'
    },
    center: {
        alignItems:'center',
        justifyContent:'center',
    }
})