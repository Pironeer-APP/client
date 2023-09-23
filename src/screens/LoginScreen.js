import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../assets/Theme'
import HeaderLogo from '../login/HeaderLogo'
import LoginForm from '../login/LoginForm'

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.loginScreen}>
      <HeaderLogo />
      <LoginForm />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  loginScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.bg_black
  }
})