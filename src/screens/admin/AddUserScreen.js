import {
  View,
  StyleSheet,
  Keyboard,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';

import {COLORS} from '../../assets/Theme';
import {MainButton} from '../../components/Button';
import AddUserContent from '../../adduser/AddUserContent';
import useAdduser from '../../adduser/use-adduser';
import HeaderDetail, {HeaderAdmin} from '../../components/Header';
import StyledContainer from '../../components/StyledContainer';

export default function AddUserScreen({navigation}) {
  const {
    titleNum,
    setTitleNum,
    onPressNext,
    level,
    setLevel,
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    saveResult,
    setSaveResult,
    onInputLevel,
    onInputName,
    onInputPhone,
    onInputEmail,
    saveUserInfo
  } = useAdduser();

  useEffect(() => {
    if (titleNum === 4) {
      Keyboard.dismiss();
    } else if (titleNum > 4) {
      saveUserInfo(level, name, phone, email);
      if(saveResult) {
        //계속 추가하기인 경우 level은 유지
        setName(null);
        setPhone(null);
        setEmail(null);
        
        setTitleNum(0);
        
        navigation.navigate('AddUserSuccess');
      } else {
        Alert.alert('중복된 회원 정보가 있어 저장에 실패하였습니다.');
        setTitleNum(4);
      }
    }
  }, [titleNum]);

  const onPressBack = () => {
    if (titleNum > 0) {
      if(titleNum >= 3) setEmail(null);
      else if(titleNum >= 2) setPhone(null);
      else if(titleNum >= 1) setName(null);
      setTitleNum(titleNum - 1);
    } else {
      navigation.goBack();
    }
  };

  return (
    <StyledContainer>
      <View style={{paddingHorizontal: 20, flex: 1}}>
      <HeaderAdmin onPress={onPressBack} />
        <KeyboardAvoidingView
          keyboardVerticalOffset={45}
          behavior={Platform.select({ios: 'padding', android: undefined})}
          style={{flex: 1}}>
          <View style={{flex: 1}}>
            <AddUserContent
              titleNum={titleNum}
              level={level}
              name={name}
              phone={phone}
              email={email}
              onInputLevel={onInputLevel}
              onInputName={onInputName}
              onInputPhone={onInputPhone}
              onInputEmail={onInputEmail}
            />

          </View>
          <MainButton height={60} marginBottom={20} content="다음" onPress={onPressNext} />
        </KeyboardAvoidingView>
      </View>
    </StyledContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.bg_black,
  },
});
