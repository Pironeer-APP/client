import { View, StyleSheet, Touchable, Pressable } from 'react-native'
import React from 'react'
import LoginInput from './LoginInput'
import { LoginButton } from '../components/Button'
import useLogin from './use-login'
import { FontStyledText, StyledText } from '../components/Text'

export default function LoginForm({ navigation }) {
  const {
    phoneId,
    password,
    loginStatus,
    onChangePhoneId,
    setPassword,
    onPressLogin,
  } = useLogin();

  const onPressFindAccount = () => {
    navigation.navigate('FindAccountScreen');
  }

  return (
    <View style={styles.loginInputContainer}>
      <LoginInput
        placeholder="아이디(전화번호)"
        keyboardType="numeric"
        value={phoneId}
        onChangeText={onChangePhoneId}
        maxLength={13}
      />
      <LoginInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <LoginButton onPress={() => onPressLogin(navigation)}>로그인</LoginButton>
      {!loginStatus && <FontStyledText style={styles.warning}>일치하는 회원 정보가 없습니다.</FontStyledText>}
      <Pressable style={styles.findAccount} onPress={onPressFindAccount}>
      <StyledText content="비밀번호 찾기" fontSize={15} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  loginInputContainer: {
    flex: 1,
    width: '100%',
    marginVertical: 10
  },
  warning: {
    color: 'red',
    margin: 5,
  },
  findAccount: {
    alignSelf: 'center',
    paddingVertical: 10,
  }
})