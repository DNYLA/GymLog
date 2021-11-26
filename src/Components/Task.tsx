import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TaskProps {
  text: string;
  deleteTaskFunc: any;
}

function Task({ text, deleteTaskFunc }: TaskProps) {
  const [completed, setCompleted] = useState(false);

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity onPress={() => setCompleted(!completed)}>
          <View
            style={[
              styles.square,
              {
                backgroundColor: completed ? 'green' : 'red',
              },
            ]}
          ></View>
        </TouchableOpacity>
        <Text style={styles.itemText}>{text}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteTaskFunc()}>
        <View style={styles.circular}></View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: 'red',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Task;
