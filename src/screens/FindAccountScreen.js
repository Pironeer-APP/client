import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import * as Progress from 'react-native-progress';

import StyledContainer from '../components/StyledContainer';
import HeaderDetail from '../components/Header';
import Gap from '../components/Gap';
import {StyledText} from '../components/Text';
import {MainButton} from '../components/Button';
import {SettingInput} from '../components/Input';
import {autoHyphen, fetchPost} from '../utils';
import {COLORS} from '../assets/Theme';

export default function FindAccountScreen({navigation}) {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  const onChangePhoneId = value => {
    value = autoHyphen(value);
    setData(value);
  };
  const onPressFindInfo = async () => {
    const url = '/auth/findAccount';
    const body = {
      phone: data,
    };
    setLoading(true);
    const res = await fetchPost(url, body);
    setLoading(false);
    if (res.result) {
      Alert.alert(
        '새로운 비밀번호가 등록된 이메일로 전송되었습니다',
        '로그인 후 비밀번호를 변경해 주세요',
        [
          {
            text: '확인',
            onPress: () => navigation.navigate('LoginScreen'),
          },
        ],
      );
    }
  };
  return (
    <StyledContainer>
      <HeaderDetail title={`비밀번호 찾기`} />
      <View style={{paddingHorizontal: 20, flex: 1}}>
        <KeyboardAvoidingView
          style={styles.formContainer}
          keyboardVerticalOffset={45}
          behavior={Platform.select({ios: 'padding', android: undefined})}>
          <View style={{flex: 1}}>
            <Gap />
            <StyledText
              fontSize={20}
              content={`전화번호(아이디)를 입력해 주세요`}
            />
            <Gap height={10} />
            <SettingInput
              placeholder="000-0000-0000"
              maxLength={13}
              autoFocus={true}
              value={data}
              onChangeText={onChangePhoneId}
            />
          </View>
          <Modal animationType="slide" transparent={true} visible={loading}>
            <View style={styles.circles}>
              <Progress.CircleSnail
                style={styles.progress}
                color={COLORS.green}
              />
            </View>
          </Modal>
          <MainButton content="찾기" onPress={onPressFindInfo} />
        </KeyboardAvoidingView>
      </View>
    </StyledContainer>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  progress: {
    margin: 10,
  },
  circles: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
