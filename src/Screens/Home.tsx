import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import workoutData from '../../workout.json';
import { WorkoutDay } from '../Components/WorkoutDay';
import { Day, Week } from '../utils/types';

export default function Home() {
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
  },
});
