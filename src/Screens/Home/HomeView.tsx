import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import programData from '../../../program.json';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { setProgram } from '../../redux/action';
import DropDownPicker from 'react-native-dropdown-picker';
import { auth, db } from '../../../firebase';
import { collection, getDoc, query } from '@firebase/firestore';
import { addDoc, doc, getDocs, where } from 'firebase/firestore';
import { ProgramType, Week, Workout } from '../../utils/types';
import DialogButton from 'react-native-dialog/lib/Button';
import Dialog from 'react-native-dialog';
import { RootState } from '../../redux/store';
type LabelType = {
  label: string;
  value: string;
};

export function HomeView({ navigation }: any) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Loading Programs', value: 'Loading' },
  ]);
  const [value, setValue] = useState('Loading Programs');
  const [isVisible, setIsVisible] = useState(false);
  const dayDisplay = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const [dialogText, setDialogText] = useState('');

  const date = new Date();
  let curDay = date.getDay() - 1;
  curDay = curDay >= 0 ? curDay : 6; //GetDay works from 0-6 starting from Sunday

  // const { program } = useSelector((state: any) => state.workoutReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Resetting Workout Data');
    const user = auth.currentUser;
    if (user === null) {
      auth.signOut().then(() => navigation.replace('Login'));
      return;
    }

    fetchProgramDocument(user.uid);
  }, []);

  const fetchProgramDocument = async (id: string) => {
    const programsRef = collection(db, `programs`);
    const q = query(programsRef, where('owner', '==', id));
    const querySnapshot = await getDocs(q);

    //This should never run but included here just incase
    if (querySnapshot.empty) {
      await addDoc(collection(db, `programs`), {
        owner: id,
        items: programData,
      });
      // dispatch(setProgram(programData));
      return;
    }

    //For Now we will only retreive the first item and use that as our program.
    const curProgramDoc: ProgramType = {
      name: querySnapshot.docs[0].data().name,
      owner: querySnapshot.docs[0].data().owner,
      items: querySnapshot.docs[0].data().items,
    };

    dispatch(setProgram(curProgramDoc));

    const programList = new Array<LabelType>();
    // [{ label: 'Loading Programs', value: 'Loading' }]
    // programList.pop();
    querySnapshot.forEach((doc) => {
      const snap = doc.data();
      programList.push({ label: snap.name, value: doc.id });
    });

    programList.push({ label: 'New Program...', value: 'new' });
    setItems(programList);
    setValue(items[0].value);

    // return {
    //   owner: id,
    //   items: programData,
    // };
  };

  const onValueChange = async (value: any) => {
    console.log(value);
    if (value === 'new') {
      setIsVisible(true);
    }

    const programRef = doc(db, `programs/${value}`);
    const programSnap = await getDoc(programRef);
    if (!programSnap.exists()) return;

    const data = programSnap.data();

    const curProgramDoc: ProgramType = {
      name: data.name,
      owner: data.owner,
      items: data.items,
    };

    dispatch(setProgram(programSnap.data().items));
  };

  const handleDialogCreate = async () => {
    console.log('Test');
    const defaultWorkout: Workout[] = new Array<Workout>();
    for (let i = 0; i < 7; i++) {
      defaultWorkout.push({ name: Week[i], exercises: [] });
    }

    console.log('Done');
    const user = auth.currentUser;

    const newProgram: ProgramType = {
      items: defaultWorkout,
      name: dialogText,
      owner: user!.uid,
    };

    dispatch(setProgram(newProgram));
    setIsVisible(false);

    return;
  };

  return (
    <View style={homeStyles.container}>
      <View>
        <Dialog.Container visible={isVisible}>
          <Dialog.Title>Enter New Program Name</Dialog.Title>
          <Dialog.Description>
            Enter the name for the new Program
          </Dialog.Description>
          <Dialog.Input
            placeholder={'Strength/Hypertrophy'}
            value={dialogText}
            onChangeText={(text) => {
              setDialogText(text);
            }}
          ></Dialog.Input>
          <Dialog.Button onPress={() => setIsVisible(false)} label="Cancel" />
          <Dialog.Button
            onPress={() => {
              handleDialogCreate();
            }}
            label="Create"
          />
        </Dialog.Container>
      </View>
      <View style={homeStyles.weekWrapper}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={(value) => onValueChange(value)}
        />
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
