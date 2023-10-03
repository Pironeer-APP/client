import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../assets/Theme';

export default function IsFaceBox(props) {
  if (props.isFace === 0) {
    return (
      <View style={[styles.isFaceBox, { backgroundColor: COLORS.green }]}>
        <Text style={styles.isFaceText}>ONLINE</Text>
      </View>
    )
  } else if (props.isFace === 1) {
    return (
      <View style={[styles.isFaceBox, { backgroundColor: 'skyblue' }]}>
        <Text style={styles.isFaceText}>OFFLINE</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  isFaceBox: {
    width: 77,
    height: 25,
    // paddingVertical: 10,
    // paddingHorizontal: 5,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  isFaceText: {
    color: 'black',
    fontSize: 16,
  },
});