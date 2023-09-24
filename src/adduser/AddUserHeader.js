import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { LeftArrowBtn } from '../components/Button.js';

export default function AddUserHeader({onPressBack}) {
  return (
    <View style={styles.headerContainer}>
      <LeftArrowBtn onPress={onPressBack} />
      <View style={{ flex: 1 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    height: 50,
    width: '100%',
  },
  image: {
    resizeMode: 'contain',
    height: '100%'
  }
})