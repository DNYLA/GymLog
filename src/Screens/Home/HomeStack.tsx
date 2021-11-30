import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DayView } from './Exercise/DayView';
import { ExerciseView } from './Exercise/ExerciseView';
import { HomeView } from './HomeView';

const HomeStack = createNativeStackNavigator();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Welcome Dan" component={HomeView} />
      <HomeStack.Screen name="Workout" component={DayView} />
      <HomeStack.Screen name="Exercise" component={ExerciseView} />
    </HomeStack.Navigator>
  );
}
