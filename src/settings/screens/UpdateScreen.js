import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import StyledContainer from '../../components/StyledContainer';
import HeaderDetail from '../../components/Header';
import {StyledText} from '../../components/Text';
import {SettingInput} from '../../components/Input';
import Gap from '../../components/Gap';
import {useNavigation} from '@react-navigation/native';
import {MainButton} from '../../components/Button';
import {autoHyphen} from '../../utils';
import { client } from '../../api/client';
import { storeData } from '../../api/asyncStorage';

const infoType = {
  phone: {
    id: 0,
    title: '전화번호',
    desc: '전화번호는 아이디로 사용됩니다',
    placeholder: '000-0000-0000',
  },
  password: {
    id: 1,
    title: '비밀번호',
    desc: '비밀번호는 8자리 이상으로 설정해 주세요',
    placeholder: '********',
  },
  email: {
    id: 2,
    title: '이메일',
    desc: '',
    placeholder: 'piropiro@gmail.com',
  },
  level: {
    id: 3,
    title: '관리자 기수',
    desc: '피로그래밍 N기 운영진',
    placeholder: '20',
  },
};

export default function UpdateScreen({route}) {
  const element = infoType[route.params.type];

  const [data, setData] = useState('');
  const navigation = useNavigation();

  const {userToken, getUserToken} = useUserInfo();

  useEffect(() => {
    getUserToken();
  }, []);

  const onPressNewInfo = async () => {
    const type = route.params.type;
    if (type === 'password' && data.length < 8) {
      Alert.alert('비밀번호는 8자리 이상으로 설정해 주세요', '', [
        {text: '확인'},
      ]);
      setData('');
      return;
    }
    const url = `/auth/updateInfo/${type}`;
    const body = {
      data: data,
      user_token: userToken,
    };
    const res = await client.post(url, body);
    await storeData('user_token', res.updatedUserInfo);
    console.log(res.updatedUserInfo);
    if (res.updatedUserInfo) {
      navigation.navigate('UpdateSuccessScreen', {type: element.title});
    }
  };

  const josa = element.title === '이메일' ? '을' : '를';

  const onChangePhoneId = value => {
    value = autoHyphen(value);
    setData(value);
  };

  const onChangeLevel = value => {
    value = value.replace(/[^0-9]/g, '');
    setData(value);
  };

  return (
    <StyledContainer>
      <HeaderDetail title={`${element.title} 변경`} />
      <View style={{flex: 1, paddingHorizontal: 20}}>
        <KeyboardAvoidingView
          style={styles.formContainer}
          keyboardVerticalOffset={45}
          behavior={Platform.select({ios: 'padding', android: undefined})}>
          <ScrollView style={{flexGrow: 1}}>
            <Gap />
            <StyledText
              fontSize={25}
              content={`새로운 ${element.title}${josa} 입력해 주세요`}
            />
            <Gap height={10} />
            <StyledText fontSize={18} content={element.desc} />
            <Gap height={30} />
            <SettingInput
              maxLength={route.params.type === 'phone' ? 13 : null}
              placeholder={element.placeholder}
              autoFocus={true}
              value={data}
              onChangeText={
                route.params.type === 'phone'
                  ? onChangePhoneId
                  : route.params.type === 'level'
                  ? onChangeLevel
                  : setData
              }
              secureTextEntry={route.params.type === 'password'}
              keyboardType={
                route.params.type === 'phone' || route.params.type === 'level'
                  ? 'numeric'
                  : null
              }
            />
          </ScrollView>
          <MainButton height={60} marginBottom={20} content="다음" onPress={onPressNewInfo} />
        </KeyboardAvoidingView>
      </View>
    </StyledContainer>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
});
