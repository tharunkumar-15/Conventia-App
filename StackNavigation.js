import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './login';
import UserPage from './screens/UserPage';
import SignupPage from './signup';



const Stack = createNativeStackNavigator();
 function StackNavigation() {
  return (
          <Stack.Navigator screenOptions={{header: () => null}}>
          <Stack.Screen
            name="userloginpage"
            component={LoginPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Signpage"
            component={SignupPage}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen name= "Home" component={UserPage} />

          {/* <Stack.Screen name="CameraResultTab" component={CameraResultTab} />
          <Stack.Screen
            name="NewConversationTab"
            component={NewConversationTab}
          />
          <Stack.Screen
            name="PreviousConverstionTab"
            component={PreviousConverstionTab}
          />
          <Stack.Screen name="UserProfileTab" component={UserProfileTab} /> */}


           </Stack.Navigator>

  );
}

export default StackNavigation;
