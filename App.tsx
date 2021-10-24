import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [day, setDay] = useState('monday');
  const workout = {
    monday: {
      name: 'Heavy Lower',
      squat: {
        sets: 3,
        reps: 6,
      },
      deadlift: {
        sets: 2,
        reps: 6,
      },
    },
    tuesday: {
      name: 'Heavy Upper',
      benchPress: {
        name: 'Bench Press',
        sets: 3,
        reps: 6,
      },
    },
  };
  const name = 'dan';
  return (
    <View style={styles.container}>
      <Text>GymLog App {name}</Text>
      <Text>Here Is Your Workout Routine</Text>
      <Text>{workout.monday.squat.sets}</Text>
      <TextInput style={styles.inputBox} defaultValue="Enter Your Day" />
      <StatusBar style="auto" />
      <Button
        onPress={() => {
          setDay('tuesday');
        }}
        title="Tuesday"
      />
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
