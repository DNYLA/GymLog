import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { setProgram } from '../../../redux/action';
import { RootState } from '../../../redux/store';
import { Workout } from '../../../utils/types';

export function ExerciseView({ route, navigation }: any) {
  const { exerciseObj, newItem, weekDayIndex, newExc } = route.params;
  const dispatch = useDispatch();
  const { program } = useSelector((state: RootState) => state.programReducer);

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
      let programCopy = [...program];

      if (newExc) {
        console.log('New Item');
        const newId = programCopy[weekDayIndex].exercises.length;
        const exc: Workout = {
          id: newId,
          name: exercise.name,
          sets: exercise.sets,
          reps: exercise.reps,
        };
        programCopy[weekDayIndex].exercises.push(exc);
        dispatch(setProgram(programCopy));
        navigation.goBack();
        return;
      }

      let exIndex = programCopy[weekDayIndex].exercises.findIndex(
        (exc: any) => exc.id === exercise.id
      );

      programCopy[weekDayIndex].exercises[exIndex].name = exercise.name;
      programCopy[weekDayIndex].exercises[exIndex].sets = exercise.sets;
      programCopy[weekDayIndex].exercises[exIndex].reps = exercise.reps;

      dispatch(setProgram(programCopy));
      navigation.goBack();
    }
  };

  const deleteData = () => {
    console.log('Deleting');
    //Item is "New"
    if (newExc) {
      navigation.goBack();
      return;
    }

    let programCopy = [...program];
    let exIndex = programCopy[weekDayIndex].exercises.findIndex(
      (exc: any) => exc.id === exercise.id
    );

    programCopy[weekDayIndex].exercises[exIndex].name = 'Test Change';
    programCopy[weekDayIndex].exercises.splice(exIndex, 1);

    dispatch(setProgram(programCopy));
    navigation.goBack();
  };

  if (newItem) {
    return (
      <View>
        <Text>Hello</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.areaBox}>
          <Text style={styles.boxTitle}>Name:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setExercise({ ...exercise, name: text })}
            value={exercise.name}
            placeholder={'Enter Exercise name...'}
          />
        </View>
        <View style={styles.areaBox}>
          <Text style={styles.boxTitle}>Sets:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) =>
              setExercise({ ...exercise, sets: Number(text) })
            }
            value={String(exercise.sets)}
            placeholder={'Enter amount of sets...'}
            keyboardType={'numeric'}
          />
        </View>
        <View style={styles.areaBox}>
          <Text style={styles.boxTitle}>Reps:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) =>
              setExercise({ ...exercise, reps: Number(text) })
            }
            value={String(exercise.reps)}
            placeholder={'Enter amount of reps...'}
            keyboardType={'numeric'}
          />
        </View>
        <View style={styles.areaBox}>
          <Text style={[styles.boxTitle, { paddingLeft: 0, marginRight: 5 }]}>
            Completed:
          </Text>
          <BouncyCheckbox size={30} fillColor={'green'} />
        </View>
      </SafeAreaView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={deleteData}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Delete</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={saveData}>
          <View
            style={[
              styles.button,
              {
                borderColor: '#696969',
                borderWidth: 2,
                backgroundColor: 'trasnparent',
              },
            ]}
          >
            <Text style={[styles.buttonText, { color: 'black' }]}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
