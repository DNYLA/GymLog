import { Text, View } from 'react-native';
import { Day, Workout } from '../utils/types';
import React from 'react';

export type Props = {
  workout: Day;
};

export const WorkoutDay = ({ workout }: Props) => {
  if (workout.exercises.length > 0)
    return (
      <View>
        <Text>
          {workout.name}
          {'\n'}
        </Text>
        {workout.exercises.map((x: any, i: any) => (
          <View key={i}>
            <Text>
              {x.name} - {x.sets} x {x.reps}
            </Text>
          </View>
        ))}
      </View>
    );
  else {
    return <Text>No Workout Planned Today!</Text>;
  }
};
