import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Exercise } from '../utils/types';

interface TaskProps {
  exercise: Exercise;
  flipTaskFunc: any;
  deleteTaskFunc: any;
}

function Task({ exercise, flipTaskFunc, deleteTaskFunc }: TaskProps) {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View
          style={[
            styles.square,
            {
              backgroundColor: exercise.completed ? 'green' : 'red',
            },
          ]}
        ></View>
        {/* Nested Touchable Opacity Makes it Harder to Click */}
        {/* <TouchableOpacity
          onPress={() => {
            console.log('Touched Task Opacity');
            flipTaskFunc();
          }}
        >
          <View
            style={[
              styles.square,
              {
                backgroundColor: exercise.completed ? 'green' : 'red',
              },
            ]}
          ></View>
        </TouchableOpacity> */}

        <Text style={styles.itemText}>
          {exercise.sets} x {exercise.reps} {exercise.name}
        </Text>
      </View>

      {/* <TouchableOpacity onPress={() => deleteTaskFunc()}>
        <View style={styles.circular}></View>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: 'red',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Task;
