import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, db } from '../../firebase';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from '@firebase/firestore';
import programData from '../../program.json';
import { setProgram } from '../redux/action';
import { useDispatch } from 'react-redux';

export function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    //Handles Already logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Logged In Already');
        createUserDocument(user.uid);
        navigation.replace('App');
      }
    });
    return unsubscribe;
  }, []);

  //No need for a Seperate Sign up page right now as we only ask for Email + Password right now.
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        const user = userCredentials.user;
        await addDoc(collection(db, 'users', user.uid), {
          first: 'Jim',
          last: 'Jones',
          born: 1815,
        })
          .then((doc) => console.log(doc.id))
          .catch((error) => console.log(error));
        console.log(`Registered in with `, user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleAnonLogin = () => {
    signInAnonymously(auth).then(async (userCredentials) => {
      const user = userCredentials.user;
      const newDocRef = doc(collection(db, 'users'));
      // await setDoc(newDocRef, {
      //   id: user.uid,
      //   last: 'Jones',
      //   born: 1815,
      // });
      await setDoc(doc(db, `users`, user.uid), {
        id: user.uid,
        last: 'Jones',
        born: 1815,
      })
        .then((document) => console.log('Setting Doc ID'))
        .catch((error) => alert(error.message));

      console.log(`Logged In as Guest User`);
    });
  };

  const createUserDocument = async (id: string) => {
    const userRef = doc(db, `users/${id}`);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) return;

    await setDoc(doc(db, `users`, id), {
      first: 'Dan',
      born: 1815,
    });

    await addDoc(collection(db, `programs`), {
      owner: id,
      items: programData,
    });

    console.log('Loaded Workout');
    console.log(programData);

    dispatch(setProgram(programData));
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(`Logged in with `, user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAnonLogin} style={styles.button}>
          <Text style={styles.buttonText}>Guest Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
});
