import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function Settings() {
  return (
    <View style={styles.container}>
      <Text>User Settings Under Construction</Text>
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
