import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WorkoutView } from './Exercise/WorkoutView';
import { ExerciseView } from './Exercise/ExerciseView';
import { HomeView } from './HomeView';

const HomeStack = createNativeStackNavigator();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Welcome Dan" component={HomeView} />
      <HomeStack.Screen name="Workout" component={WorkoutView} />
      <HomeStack.Screen name="Exercise" component={ExerciseView} />
    </HomeStack.Navigator>
  );
}
