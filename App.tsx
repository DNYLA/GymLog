import React from 'react';
import { StyleSheet, View } from 'react-native';
import Home from './src/Screens/Home';

export default function App() {
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
  },
});
