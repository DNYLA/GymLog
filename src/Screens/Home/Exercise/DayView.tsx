import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Day, Week, Workout } from '../../../utils/types';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Task from '../../../Components/Task';
import { useSelector } from 'react-redux';

interface DayViewProps {
  route: any;
  navigation: any;
}

export function DayView({ route, navigation }: DayViewProps) {
  const { weekDayText } = route.params;
  const weekDayIndex = parseInt(Week[weekDayText]);

  const { program } = useSelector((state: any) => state.programReducer);

  const programCopy = [...program];
  const curWorkout: Day = programCopy[weekDayIndex];
  const [exerciseItems, setExerciseItems] = useState<Workout[]>(
    curWorkout.exercises
  );

  const deleteTask = (index: number) => {
    let itemsCopy = [...exerciseItems];
    itemsCopy.splice(index, 1);
    setExerciseItems(itemsCopy);
  };

  console.log(weekDayText);

  return (
    <ScrollView style={styles.container}>
      {/* Todays Tasks */}
      <View style={styles.tasksWrapper}>
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>{weekDayText}s Routine</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Exercise', {
                exerciseObj: { name: '', sets: 0, reps: 0 },
                weekDayIndex,
                newExc: true,
              });
            }}
          >
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.items}>
          {exerciseItems.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  console.log('Touched Routine Opacity');
                  navigation.navigate('Exercise', {
                    exerciseObj: item,
                    weekDayIndex,
                  });
                }}
              >
                <Task
                  exercise={item}
                  deleteTaskFunc={() => deleteTask(index)}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
    color: 'pink',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    marginLeft: 95,
    marginBottom: 5,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginHorizontal: 15,
    borderRadius: 4,
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
