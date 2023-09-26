import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, {useState} from 'react'
import StyledContainer from '../../components/StyledContainer'
import HeaderDetail from '../../components/Header'
import { StyledText } from '../../components/Text'
import { MainButton } from '../../components/Button'
import { useNavigation } from '@react-navigation/native';
import { SettingInput } from '../../components/Input'
import Gap from '../../components/Gap'

const infoType = {
  'phone': {
    id: 0,
    title: '전화번호',
    desc: '현재 설정되어 있는 전화번호(아이디)를 입력해 주세요',
    placeholder: '000-0000-0000',
  },
  'password': {
    id: 1,
    title: '비밀번호',
    desc: '현재 설정되어 있는 비밀번호를 입력해 주세요',
    placeholder: '********',
  },
  'email': {
    id: 2,
    title: '이메일',
    desc: '현재 설정되어 있는 이메일을 입력해 주세요',
    placeholder: 'piropiro@gmail.com',
  },
}

export default function CheckScreen({route}) {
  const element = infoType[route.params.type];

  const [data, setData] = useState('');
  const navigation = useNavigation();

  const onPressOriginInfo = () => {
    navigation.navigate('UpdateScreen', {type: route.params.type});
  }

  const josa = element.title === '이메일' ? '을' : '를';

  return (
    <StyledContainer>
      <HeaderDetail title={`${element.title} 변경`} />
      <KeyboardAvoidingView
        style={styles.formContainer}
        keyboardVerticalOffset={45}
        behavior={Platform.select({ios: 'padding', android: undefined})}
      >
        <View style={{flex: 1}}>
        <Gap />
        <StyledText fontSize={25} content={`현재 ${element.title}${josa} 입력해 주세요`} />
        <Gap height={10} />
        <StyledText fontSize={18} content={element.desc} />
        <Gap height={30} />
        <SettingInput
          placeholder={element.placeholder}
          autoFocus={true}
          value={data}
          onChangeText={setData} />
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