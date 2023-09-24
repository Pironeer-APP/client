import { View, StyleSheet, Keyboard, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import React, { useEffect } from 'react'

import { COLORS } from '../../assets/Theme'
import { MainButton } from '../../components/Button'
import AddUserContent from '../../adduser/AddUserContent'
import useAdduser from '../../adduser/use-adduser'
import HeaderDetail from '../../components/Header'
import StyledContainer from '../../components/StyledContainer'

export default function AddUserScreen({ navigation }) {
  const {
    titleNum,
    setTitleNum,
    onPressNext,
    level, name, phone, email,
    onInputLevel,
    onInputName,
    onInputPhone,
    onInputEmail,
    saveUserInfo
  } = useAdduser();

  useEffect(() => {
    if(titleNum === 4) {
      Keyboard.dismiss();
    } else if(titleNum > 4) {
      saveUserInfo(level, name, phone, email);
      navigation.navigate('AddUserSuccess');
    }
  }, [titleNum]);

  const onPressBack = () => {
    if(titleNum > 0) setTitleNum(titleNum - 1);
    else navigation.goBack();
  }

  return (
    <StyledContainer>
      <HeaderDetail onPressBack={onPressBack} />
      <KeyboardAvoidingView
        keyboardVerticalOffset={45}
        behavior={Platform.select({ios: 'padding', android: undefined})}
        style={{flex: 1}}>
      <View style={{flex: 1}}>
        <AddUserContent
          titleNum={titleNum}
          level={level} name={name}
          phone={phone} email={email}
          onInputLevel={onInputLevel}
          onInputName={onInputName}
          onInputPhone={onInputPhone}
          onInputEmail={onInputEmail}
        />
        <MainButton
          content="다음"
          onPress={onPressNext} />
      </View>
      </KeyboardAvoidingView>
    </StyledContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.bg_black
  },
})