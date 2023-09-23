import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import { FontStyledText } from './Text'
import { COLORS } from '../assets/Theme'

export const MainButton = ({content, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <FontStyledText style={styles.text}>{content}</FontStyledText>
    </TouchableOpacity>
  )
}

export const MiniButton = ({outline, children}) => {
  return (
    <TouchableOpacity style={miniStyles({outline}).miniContainer}>
      <FontStyledText style={miniStyles({outline}).miniText}>{children}</FontStyledText>
    </TouchableOpacity>
  )
}

export const LoginButton = ({content, onPress}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <FontStyledText></FontStyledText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
    height: 70,
    backgroundColor: COLORS.green,
    borderRadius: 15,
  },
  text: {
    fontSize: 22,
    textAlign: 'center',
    color: '#000000',
  },
})

const miniStyles = ({outline}) => StyleSheet.create({
  miniContainer: {
    justifyContent: 'center',
    width: '100%',
    height: 50,
    backgroundColor: outline ? 'transparent' : COLORS.green,
    borderRadius: 13,
    borderColor: outline ? COLORS.green : 'none',
    borderWidth: 3,
  },
  miniText: {
    fontSize: 18,
    textAlign: 'center',
    color: outline ? 'white' : '#000000',
  }
})