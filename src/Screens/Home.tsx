import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Keyboard } from 'react-native';
import workoutData from '../../workout.json';
import { WorkoutDay } from '../Components/WorkoutDay';
import { Day, Week, Workout } from '../utils/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import style from './../../styles.json';
import { create } from 'tailwind-rn';
import { useRoute } from '@react-navigation/core';
import Task from '../Components/Task';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { defaultDay, setRoutine } from '../utils/slices/routineSlice';
import { RootState } from '../../store';

export function Home({ navigation }: any) {
  const dayDisplay = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const date = new Date();
  let curDay = date.getDay() - 1;
  curDay = curDay >= 0 ? curDay : 6; //GetDay works from 0-6 starting from Sunday

  console.log(curDay);
  console.log(date);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Resetting Workout Data');
    dispatch(setRoutine(workoutData));
  });

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.weekWrapper}>
        <Text style={homeStyles.sectionTitle}>Weekly Routine</Text>
        <View style={homeStyles.weekContainer}>
          {dayDisplay.map((day, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate('Workout', {
                  weekDayText: day,
                });
              }}
            >
              <View
                style={[
                  homeStyles.day,
                  { backgroundColor: curDay === index ? '#000' : '#FFF' },
                ]}
              >
                <Text
                  style={[
                    homeStyles.dayText,
                    { color: curDay === index ? '#FFF' : '#000' },
                  ]}
                >
                  {day}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  weekWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  weekContainer: {
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  day: {
    backgroundColor: '#FFF',
    width: 115,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginRight: 5,
    borderRadius: 5,
  },
  dayText: {
    width: 115,
    paddingRight: 0,
    paddingLeft: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

interface DayViewProps {
  weekDay: string;
  navigation: any;
}

export function DayView({ route, navigation }: any) {
  const { weekDayText } = route.params;
  const weekDayIndex = parseInt(Week[weekDayText]);

  const workouts = useSelector((state: RootState) => state.routine.value);
  const workoutsCopy = [...workouts];
  const workout: Day = workoutsCopy[weekDayIndex];
  const [exerciseItems, setExerciseItems] = useState<Workout[]>(
    workout.exercises
  );

  //Create Function Here and Prop Drill it instead of prop drilling Function
  //Once moved over to State Management Like Redux would move this to Component
  const deleteTask = (index: number) => {
    let itemsCopy = [...exerciseItems];
    itemsCopy.splice(index, 1);
    setExerciseItems(itemsCopy);
    //Handle Opening Up Task Form
  };

  console.log(weekDayText);

  return (
    <ScrollView style={dayStyles.container}>
      {/* Todays Tasks */}
      <View style={dayStyles.tasksWrapper}>
        <View style={dayStyles.titleContainer}>
          <Text style={dayStyles.sectionTitle}>{weekDayText}s Routine</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Exercise', {
                exerciseObj: { name: '', sets: 0, reps: 0 },
                new: true,
              });
            }}
          >
            <View style={dayStyles.addWrapper}>
              <Text style={dayStyles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={dayStyles.items}>
          {exerciseItems.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
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

const dayStyles = StyleSheet.create({
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

export function ExerciseView({ route, navigation }: any) {
  const { exerciseObj, newItem, weekDayIndex } = route.params;
  const dispatch = useDispatch();
  const routine = useSelector((state: RootState) => state.routine.value);
  const [exercise, setExercise] = useState<Workout>(exerciseObj);

  const saveData = () => {
    console.log('Saving');
    let valid = true;

    //Do Checks
    if (!exercise.name) {
      console.log('null');
      valid = false;
    } else if (!exercise.sets) {
      valid = false;
    } else if (!exercise.reps) {
      valid = false;
    }

    if (valid) {
      let workoutsCopy = [...routine];
      console.log(workoutsCopy[0]);
      // workoutsCopy[0].name = 'Test Change';
      console.log('----------------asdNEW LINE=---------');
      // let exIndex = workoutsCopy[weekDayIndex].exercises.findIndex(
      //   (exc) => exc.id === exercise.id
      // );

      // console.log('Index = ' + exIndex);
      // console.log(exercise.name);

      // workoutsCopy[weekDayIndex].exercises[exIndex].name = 'Bobba Fett';
      // workoutsCopy[weekDayIndex].exercises[exIndex].sets = exercise.sets;
      // workoutsCopy[weekDayIndex].exercises[exIndex].reps = exercise.reps;

      // console.log(workoutsCopy[weekDayIndex].exercises[exIndex].name);

      // dispatch(setRoutine([defaultDay]));
      // console.log(routine);

      // console.log(workoutsCopy[weekDayIndex].exercises[exIndex]);
      // console.log(workouts[weekDayIndex].exercises[exIndex]);
      // setExercise({ id: workouts.length, name: '', sets: 0, reps: 0 });

      navigation.goBack();
    }
  };

  if (newItem) {
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
  }

  return (
    <View style={exerciseStyles.container}>
      <SafeAreaView>
        <View style={exerciseStyles.areaBox}>
          <Text style={exerciseStyles.boxTitle}>Name:</Text>
          <TextInput
            style={exerciseStyles.input}
            onChangeText={(text) => setExercise({ ...exercise, name: text })}
            value={exercise.name}
            placeholder={'Enter Exercise name...'}
          />
        </View>
        <View style={exerciseStyles.areaBox}>
          <Text style={exerciseStyles.boxTitle}>Sets:</Text>
          <TextInput
            style={exerciseStyles.input}
            onChangeText={(text) =>
              setExercise({ ...exercise, sets: Number(text) })
            }
            value={String(exercise.sets)}
            placeholder={'Enter amount of sets...'}
            keyboardType={'numeric'}
          />
        </View>
        <View style={exerciseStyles.areaBox}>
          <Text style={exerciseStyles.boxTitle}>Reps:</Text>
          <TextInput
            style={exerciseStyles.input}
            onChangeText={(text) =>
              setExercise({ ...exercise, reps: Number(text) })
            }
            value={String(exercise.reps)}
            placeholder={'Enter amount of reps...'}
            keyboardType={'numeric'}
          />
        </View>
        <View style={exerciseStyles.areaBox}>
          <Text
            style={[
              exerciseStyles.boxTitle,
              { paddingLeft: 0, marginRight: 5 },
            ]}
          >
            Completed:
          </Text>
          <BouncyCheckbox size={30} fillColor={'green'} />
        </View>
      </SafeAreaView>

      <View style={exerciseStyles.buttonContainer}>
        <TouchableOpacity onPress={saveData}>
          <View style={exerciseStyles.button}>
            <Text style={exerciseStyles.buttonText}>Delete</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={saveData}>
          <View
            style={[
              exerciseStyles.button,
              {
                borderColor: '#696969',
                borderWidth: 2,
                backgroundColor: 'trasnparent',
              },
            ]}
          >
            <Text style={[exerciseStyles.buttonText, { color: 'black' }]}>
              Save
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const exerciseStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  input: {
    height: 40,
    width: 250,
    margin: 6,
    marginLeft: 0,
    borderWidth: 1,
    padding: 10,
  },
  areaBox: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxTitle: {
    justifyContent: 'center',
    width: 80,
    paddingLeft: 20,
  },
  button: {
    backgroundColor: 'black',
    justifyContent: 'center',
    flexDirection: 'row',
    width: 185,
    borderRadius: 5,
    marginLeft: 5,
    marginTop: 25,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

const HomeStack = createNativeStackNavigator();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Welcome Dan" component={Home} />
      <HomeStack.Screen name="Workout" component={DayView} />
      <HomeStack.Screen name="Exercise" component={ExerciseView} />
    </HomeStack.Navigator>
  );
}
