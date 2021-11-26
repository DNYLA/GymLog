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
    'Wedday',
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
              onPress={() => navigation.navigate('Bone')}
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

export function DayView({}: any) {
  const [day, setDay] = useState<Week>(Week.Monday);
  const dayDisplay = [
    'Monday',
    'Tuesday',
    'Wedday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  return (
    <View style={homeStyles.container}>
      <Text>Hello</Text>
    </View>
  );
}

const HomeStack = createNativeStackNavigator();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Welcome Dan" component={Home} />
      <HomeStack.Screen name="Bone" component={DayView} />
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
