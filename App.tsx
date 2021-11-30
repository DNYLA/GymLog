import { NavigationContainer } from '@react-navigation/native';
import { useKeepAwake } from 'expo-keep-awake';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Settings } from './src/Screens/Settings';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faHouseUser,
  faCompass,
  faUserCog,
} from '@fortawesome/free-solid-svg-icons';
import { Explore } from './src/Screens/Explore';
import { Provider } from 'react-redux';
import { Store } from './src/redux/store';
import { HomeStackScreen } from './src/Screens/Home/HomeStack';
import { LoginScreen } from './src/Screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  useKeepAwake();

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="App" component={AppTabNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

function AppTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon = faHome;

          if (route.name === 'Home') {
            icon = focused ? faHouseUser : faHome;
          } else if (route.name === 'Explore') {
            icon = focused ? faCompass : faCompass;
          } else if (route.name === 'Settings') {
            icon = focused ? faUserCog : faUserCog;
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
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
