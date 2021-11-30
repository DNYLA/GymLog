import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import programData from '../../../program.json';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { setProgram } from '../../redux/action';

export function HomeView({ navigation }: any) {
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

  // const { program } = useSelector((state: any) => state.workoutReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Resetting Workout Data');
    dispatch(setProgram(programData));
  }, []);

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
