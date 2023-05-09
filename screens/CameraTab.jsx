import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CameraResultTab from './CameraResultTab';
import PreviousConverstionTab from './PreviousConversationTab';
import NewConversationTab from './NewConversationTab';
import Camerabuttontab from './Camerabuttontab';
const Stack = createStackNavigator();
function CameraTab() {
  return (
      <Stack.Navigator screenOptions={{header: () => null}}>
        <Stack.Screen name="Camerabuttontab" component={Camerabuttontab} />
        <Stack.Screen name="CameraResultTab" component={CameraResultTab} />
        <Stack.Screen name="NewConversationTab" component={NewConversationTab} />
       <Stack.Screen
        name="PreviousConverstionTab"
        component={PreviousConverstionTab}
      />
    </Stack.Navigator>
  );
}


export default CameraTab;
