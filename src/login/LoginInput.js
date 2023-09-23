import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../assets/Theme'

export default function LoginInput({placeholder, keyboardType}) {
  return (
    <TextInput
      style={styles.loginTextInput}
      placeholder={placeholder}
      placeholderTextColor={COLORS.light_gray}
      keyboardType={keyboardType}
    />
  )
}

const styles = StyleSheet.create({
  loginTextInput: {
    height: 60,
    marginBottom: 15,
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: COLORS.gray,
    color: 'white',
    width: '100%'
  }
})