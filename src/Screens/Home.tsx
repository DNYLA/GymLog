import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import workoutData from '../../workout.json';
import { WorkoutDay } from '../Components/WorkoutDay';
import { Day, Week, Workout } from '../utils/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import style from './../../styles.json';
import { create } from 'tailwind-rn';
import { useRoute } from '@react-navigation/core';
import Task from '../Components/Task';

const { tailwind, getColor } = create(style);

// export function Home({ navigation }) {
//   const [day, setDay] = useState<Week>(Week.Monday);
//   const dayDisplay = [
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//     'Sunday',
//   ];

//   //Rework to include DAY somewhere in the array (Currently assumes index 0 = Monday index 6 = Saturday)
//   const workout = workoutData;
//   const name = 'Dan';

//   return (
//     <View style={styles.container}>
//       <Text>GymLog App {name}</Text>
//       <Text>
//         Here Is Your Workout Routine for {Week[day]}
//         {'\n'}
//       </Text>

//       <TouchableOpacity onPress={() => navigation.navigate('Bone')}>
//         <View style={homeStyles.screenSwitch}>
//           <Text style={homeStyles.screenText}>New Main</Text>
//         </View>
//       </TouchableOpacity>
//       <WorkoutDay workout={workout[day]} />

//       <StatusBar style="auto" />
//       <Text>{'\n'}</Text>
//       {dayDisplay.map((day, i) => (
//         <Button
//           key={i}
//           onPress={() => {
//             setDay(i);
//           }}
//           title={day}
//         />
//       ))}
//       <TouchableHighlight
//         onPress={() => {
//           setDay(2);
//         }}
//         style={homeStyles.box}
//         underlayColor="#FFF"
//       ></TouchableHighlight>

//       <View style={homeStyles.container}>
//         {dayDisplay.map((day, i) => (
//           <TouchableOpacity
//             key={i}
//             onPress={() => {
//               setDay(i);
//             }}
//             style={homeStyles.touchContainer}
//           >
//             <View key={i} style={homeStyles.box}>
//               <View style={homeStyles.inner}>
//                 <Text style={{}}>{day}</Text>
//               </View>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// }

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

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.weekWrapper}>
        <Text style={homeStyles.sectionTitle}>Weekly Routine</Text>
        <View style={homeStyles.weekContainer}>
          {dayDisplay.map((day, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigation.navigate('Bone', {
                  weekDayText: day,
                });
              }}
            >
              <View style={homeStyles.day}>
                <Text style={homeStyles.dayText}>{day}</Text>
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
    // paddingLeft: 10,
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

export function DayView({ route, navigateion }: any) {
  const { weekDayText } = route.params;
  const weekDayIndex = parseInt(Week[weekDayText]);
  const workout: Day = workoutData[weekDayIndex];

  const [exercise, setExercise] = useState<Workout>({
    name: '',
    sets: 0,
    reps: 0,
  });
  const [exerciseItems, setExerciseItems] = useState<Workout[]>(
    workout.exercises
  );

  const handleAddTask = () => {
    Keyboard.dismiss();
    setExerciseItems([...exerciseItems, exercise]);
    setExercise({ name: '', sets: 0, reps: 0 });
  };

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
    <View style={styles.container}>
      {/* Todays Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>{weekDayText}s Routine</Text>
        <View style={styles.items}>
          {exerciseItems.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                // onPress={() => completeTask(index)}
              >
                <Task
                  exercise={item}
                  deleteTaskFunc={() => deleteTask(index)}
                />
              </TouchableOpacity>
            );
          })}
          {/* This is where the tasks will go */}
        </View>
      </View>

      {/* Write a Task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Write a Task...'}
          value={exercise.name}
          onChangeText={(text) => setExercise({ name: text, sets: 0, reps: 0 })}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
    color: 'pink',
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
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});

const HomeStack = createNativeStackNavigator();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Welcome Dan" component={Home} />
      <HomeStack.Screen name="Bone" component={DayView} />
    </HomeStack.Navigator>
  );
}
