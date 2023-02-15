import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import CameraResultTab from './CameraResultTab';
import PreviousConverstionTab from './PreviousConversationTab';
import NewConversationTab from './NewConversationTab';

const Stack= createStackNavigator();

function CameraTab() {
  return (
    <Stack.Navigator screenOptions={{header:()=>null}}>
      <Stack.Screen name="CameraResultTab" component={CameraResultTab} />
      <Stack.Screen name="PreviousConverstionTab" component={PreviousConverstionTab} />
      <Stack.Screen name="NewConversationTab" component={NewConversationTab} />

    </Stack.Navigator>
  );
}

export default CameraTab;

