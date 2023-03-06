import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CameraResultTab from './CameraResultTab';
import PreviousConverstionTab from './PreviousConversationTab';
import NewConverstionTab from './NewConversationTab';
import ImageCapture from './ImageCapture';
import NewConversationTab from './NewConversationTab';

const Stack = createStackNavigator();
function CameraTab() {
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      {/* <Stack.Screen name="CameraResultTab" component={CameraResultTab} />
      <Stack.Screen name="NewConversationTab" component={NewConversationTab} />
      <Stack.Screen name="ImageCapture" component={ImageCapture}/>
      <Stack.Screen name="CameraResultTab" component={CameraResultTab} />
      <Stack.Screen
        name="PreviousConverstionTab"
        component={PreviousConverstionTab}
      /> */}
    </Stack.Navigator>
  );
}


export default CameraTab;
