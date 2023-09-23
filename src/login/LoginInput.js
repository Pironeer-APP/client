import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../assets/Theme'

export default function LoginInput(props) {
  return (
    <TextInput
      style={styles.loginTextInput}
      placeholder={props.placeholder}
      placeholderTextColor={COLORS.light_gray}
      keyboardType={props.keyboardType}
      value={props.value}
      onChangeText={props.onChangeText}
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