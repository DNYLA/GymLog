import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import workoutData from '../../workout.json';
import { WorkoutDay } from '../Components/WorkoutDay';
import { Week } from '../utils/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import style from './../../styles.json';
import { create } from 'tailwind-rn';

const { tailwind, getColor } = create(style);

export function Home({ navigation }) {
  const [day, setDay] = useState<Week>(Week.Monday);
  const dayDisplay = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  //Rework to include DAY somewhere in the array (Currently assumes index 0 = Monday index 6 = Saturday)
  const workout = workoutData;
  const name = 'Dan';

  return (
    <View style={styles.container}>
      <Text>GymLog App {name}</Text>
      <Text>
        Here Is Your Workout Routine for {Week[day]}
        {'\n'}
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate('Bone')}>
        <View style={homeStyles.screenSwitch}>
          <Text style={homeStyles.screenText}>New Main</Text>
        </View>
      </TouchableOpacity>
      <WorkoutDay workout={workout[day]} />

      <StatusBar style="auto" />
      <Text>{'\n'}</Text>
      {dayDisplay.map((day, i) => (
        <Button
          key={i}
          onPress={() => {
            setDay(i);
          }}
          title={day}
        />
      ))}
      <TouchableHighlight
        onPress={() => {
          setDay(2);
        }}
        style={homeStyles.box}
        underlayColor="#FFF"
      ></TouchableHighlight>

      <View style={homeStyles.container}>
        {dayDisplay.map((day, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              setDay(i);
            }}
            style={homeStyles.touchContainer}
          >
            <View key={i} style={homeStyles.box}>
              <View style={homeStyles.inner}>
                <Text style={{}}>{day}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export function Home2() {
  return (
    <View>
      <Text>Test</Text>
    </View>
  );
}

const homeStyles = StyleSheet.create({
  screenSwitch: {
    width: '100%',
    backgroundColor: 'red',
  },
  screenText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  container2: {
    backgroundColor: 'pink',
  },
  container: {
    backgroundColor: 'pink',
    height: '15%',
    width: '40%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  touchContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'yellow',
    // flex: 1,
  },

  box: {
    flex: 1,
    width: '50%',
    height: '50%',
    padding: 5,
    margin: 4,
  },
  inner: {
    // flex: 1,
    // backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const homeStyles2 = StyleSheet.create({
  // touchContainer: {
  // width: '90%',
  // backgroundColor: 'yellow',
  // },
  // container: {
  //   width: '100%',
  //   height: '85%',
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  // backgroundColor: 'pink',
  // },
  // box: {
  //   width: '50%',
  //   height: '50%',
  //   padding: 5,
  // },
  // inner: {
  //   flex: 1,
  //   backgroundColor: '#eee',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});

const HomeStack = createNativeStackNavigator();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Welcome Dan" component={Home} />
      <HomeStack.Screen name="Bone" component={Home2} />
    </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  // inputBox: {
  //   height: 40,
  //   width: '90%',
  //   borderColor: 'gray',
  //   borderWidth: 1,
  // },
});
