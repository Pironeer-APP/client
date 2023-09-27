import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect } from 'react'
import StyledContainer from '../../components/StyledContainer'
import HeaderDetail from '../../components/Header'
import { StyledText } from '../../components/Text'
import { SettingInput } from '../../components/Input'
import Gap from '../../components/Gap'
import { useNavigation } from '@react-navigation/native';
import { MainButton } from '../../components/Button'
import { fetchPost } from '../../utils'
import useUserInfo from '../../use-userInfo'

const infoType = {
  'phone': {
    id: 0,
    title: '전화번호',
    desc: '전화번호는 아이디로 사용됩니다',
    placeholder: '000-0000-0000',
  },
  'password': {
    id: 1,
    title: '비밀번호',
    desc: '비밀번호는 8자리 이상으로 설정해 주세요',
    placeholder: '********',
  },
  'email': {
    id: 2,
    title: '이메일',
    desc: '',
    placeholder: 'piropiro@gmail.com',
  },
}

export default function CheckScreen({ route }) {
  const element = infoType[route.params.type];

  const [data, setData] = useState('');
  const navigation = useNavigation();

  const {
    userInfo,
    getUserInfo
  } = useUserInfo();

  useEffect(() => {
    getUserInfo();
  }, []);

  const onPressOriginInfo = async () => {
    const type = route.params.type;
    const url = `/auth/updateInfo/${type}`;
    const body = {
      type: data,
      user_id: userInfo.user_id
    }
    const res = await fetchPost(url, body);
    console.log(res.updatedUserInfo);
    if(res.updatedUserInfo) {
      navigation.navigate('UpdateSuccessScreen', {type: element.title});
    }
  }

  const josa = element.title === '이메일' ? '을' : '를';

  return (
    <StyledContainer>
      <HeaderDetail title={`${element.title} 변경`} />
      <KeyboardAvoidingView
        style={styles.formContainer}
        keyboardVerticalOffset={45}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
      >
        <View style={{ flex: 1 }}>
          <Gap />
          <StyledText fontSize={25} content={`새로운 ${element.title}${josa} 입력해 주세요`} />
          <Gap height={10} />
          <StyledText fontSize={18} content={element.desc} />
          <Gap height={30} />
          <SettingInput
            placeholder={element.placeholder}
            autoFocus={true}
            value={data}
            onChangeText={setData}
            secureTextEntry={route.params.type === 'password'} />
        </View>
        <MainButton content="다음" onPress={onPressOriginInfo} />
      </KeyboardAvoidingView>
    </StyledContainer>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  }
})