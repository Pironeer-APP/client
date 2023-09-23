import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LoginInput from './LoginInput'
import { LoginButton } from '../components/Button'
import useLogin from './use-login'

export default function LoginForm() {
  const {
    phoneId,
    password,
    setPhoneId,
    setPassword,
    onPressFetchData
  } = useLogin();
  
  return (
    <View style={styles.loginInputContainer}>
      <LoginInput
        placeholder="아이디(전화번호)"
        keyboardType="numeric"
        value={phoneId}
        onChangeText={setPhoneId}
        />
      <LoginInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
      />
      <LoginButton onPress={onPressFetchData}>로그인</LoginButton>
    </View>
  )
}

const styles = StyleSheet.create({
  loginInputContainer: {
    flex: 1,
    width: '100%'
  }
})