import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ImportantTab from './ImportantTab';
import HomeUserScreen from './HomeUserScreen';

function UserPage() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="HomeScreen" component={HomeUserScreen}/>
      <Stack.Screen name="ImportantTab" component={ImportantTab} />
    </Stack.Navigator>
  );
}

export default UserPage;