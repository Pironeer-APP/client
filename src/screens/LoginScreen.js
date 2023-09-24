import { SafeAreaView, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { COLORS } from '../assets/Theme'
import HeaderLogo from '../login/HeaderLogo'
import LoginForm from '../login/LoginForm'

export default function LoginScreen({navigation}) {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={45}
      behavior={Platform.select({ios: 'padding', android: undefined})}
      style={{flex: 1}}>
      <SafeAreaView style={styles.loginScreen}>
        <HeaderLogo />
        <LoginForm navigation={navigation} />
      </SafeAreaView>
    </KeyboardAvoidingView>
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