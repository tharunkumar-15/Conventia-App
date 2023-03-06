import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddPeopleTab from '../screens/AddPeopleTab';
import CameraTab from '../screens/CameraTab';
import ConversationTab from '../screens/ConversationTab';
import UserPage from '../screens/UserPage';
import UserProfileTab from '../screens/UserProfileTab';
import CameraResultTab from '../screens/CameraResultTab';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import PreviousConverstionTab from '../screens/PreviousConversationTab';
import ImageCapture from '../screens/ImageCapture';
import NewConversationTab from '../screens/NewConversationTab';
import {useSelector, useDispatch} from 'react-redux';


const Tab = createBottomTabNavigator();

const Tabs = () => {
    const { conversationScreen} = useSelector(state => state.useReducer);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          elevation: 0,
          backgroundColor: '#51087E',
          height: 60,
        },
        //tabBarIconStyle:{display:"none"},
        headerShown: false,
        ...styles.shadow,
      }}>
      <Tab.Screen
        name="Home"
        component={UserPage}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
              <Image
                source={require('./home.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#ffffff' : '#9F8BCC',
                }}
              />
              <Text
                style={{color: focused ? '#ffffff' : '#9F8BCC', fontSize: 12}}>
                Home
              </Text>
            </View>
          ),
        }}
      />

      {conversationScreen? (
        <Tab.Screen
          name="Conversation"
          component={ConversationTab}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 5,
                }}>
                <Image
                  source={require('./conversation.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#ffffff' : '#9F8BCC',
                  }}
                />
                <Text
                  style={{
                    color: focused ? '#ffffff' : '#9F8BCC',
                    fontSize: 12,
                  }}>
                  Conversation
                </Text>
              </View>
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="Conversation"
          component={PreviousConverstionTab}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 5,
                }}>
                <Image
                  source={require('./AddUser.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#ffffff' : '#9F8BCC',
                  }}
                />
                <Text
                  style={{
                    color: focused ? '#ffffff' : '#9F8BCC',
                    fontSize: 12,
                  }}>
                  Conversation
                </Text>
              </View>
            ),
          }}
        />
      )}

 { true ?
      <Tab.Screen
        name="Image"
        component={ImageCapture}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
              <Image
                source={require('./camera.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#ffffff' : '#9F8BCC',
                }}
              />
              <Text
                style={{color: focused ? '#ffffff' : '#9F8BCC', fontSize: 12}}>
                Camera
              </Text>
            </View>
          ),
        }}
      />
      : true ? 
      <Tab.Screen
        name="Camera"
        component={CameraResultTab}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
              <Image
                source={require('./camera.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#ffffff' : '#9F8BCC',
                }}
              />
              <Text
                style={{color: focused ? '#ffffff' : '#9F8BCC', fontSize: 12}}>
                Camera
              </Text>
            </View>
          ),
        }}
      />
      :
      <Tab.Screen
        name="NewConversationTab"
        component={NewConversationTab}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
              <Image
                source={require('./camera.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#ffffff' : '#9F8BCC',
                }}
              />
              <Text
                style={{color: focused ? '#ffffff' : '#9F8BCC', fontSize: 12}}>
                Camera
              </Text>
            </View>
          ),
        }}
      />
    }


      <Tab.Screen
        name="Add People"
        component={AddPeopleTab}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
              <Image
                source={require('./AddUser.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#ffffff' : '#9F8BCC',
                }}
              />
              <Text
                style={{color: focused ? '#ffffff' : '#9F8BCC', fontSize: 12}}>
                Add People
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="User Profile"
        component={UserProfileTab}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
              <Image
                source={require('./user.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#ffffff' : '#9F8BCC',
                }}
              />
              <Text
                style={{color: focused ? '#ffffff' : '#9F8BCC', fontSize: 12}}>
                Account
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
