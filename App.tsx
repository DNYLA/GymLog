import { NavigationContainer } from '@react-navigation/native';
import { useKeepAwake } from 'expo-keep-awake';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Home, HomeStackScreen } from './src/Screens/Home';
import { Settings } from './src/Screens/Settings';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCog,
  faExclamationCircle,
  faHome,
  faCompass,
  faDraftingCompass,
  faHouseUser,
  faUserCog,
} from '@fortawesome/free-solid-svg-icons';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Explore } from './src/Screens/Explore';
import { Provider } from 'react-redux';
import { Store } from './src/redux/store';

export default function App() {
  const Tab = createBottomTabNavigator();
  useKeepAwake();

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let icon = faHome;

              if (route.name === 'Home') {
                icon = focused ? faHouseUser : faHome;
              } else if (route.name === 'Explore') {
                icon = focused ? faCompass : faCompass;
              } else if (route.name === 'Settings') {
                icon = focused ? faUserCog : faCog;
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
      </NavigationContainer>
    </Provider>
  );
}
