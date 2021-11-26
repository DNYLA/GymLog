import { NavigationContainer } from '@react-navigation/native';
import { useKeepAwake } from 'expo-keep-awake';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Home, HomeStackScreen } from './src/Screens/Home';
import { Plan } from './src/Screens/Plans';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCog,
  faExclamationCircle,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routine } from './src/Screens/Routine';

export default function App() {
  const Tab = createBottomTabNavigator();
  useKeepAwake();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let icon = faExclamationCircle;

            if (route.name === 'Home') {
              icon = focused ? faHome : faHome;
            } else if (route.name === 'Settings') {
              icon = focused ? faCog : faCog;
            }

            // You can return any component that you like here!
            return <FontAwesomeIcon icon={icon} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Routine" component={Routine} />
        <Tab.Screen name="Settings" component={Plan} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
