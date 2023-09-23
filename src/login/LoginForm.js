import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LoginInput from './LoginInput'

export default function LoginForm() {
  return (
    <View style={styles.loginInputContainer}>
      <LoginInput
        placeholder="아이디(전화번호)"
        keyboardType="numeric"
        />
      <LoginInput
        placeholder="비밀번호"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  loginInputContainer: {
    flex: 1,
    width: '100%'
  }
})