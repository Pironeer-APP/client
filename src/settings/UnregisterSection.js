import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

import { StyledText } from '../components/Text'
import { fetchPost, getData, removeData } from '../utils';

export default function UnregisterSection() {
  const navigation = useNavigation();

  const onPressUnregister = async () => {
    Alert.alert('정말로 탈퇴 하시겠습니까?', '가지마세요!', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '탈퇴',
        onPress: async () => await unregister(),
      },
    ]);
  }

  const unregister = async () => {
    const url = '/auth/unregister';
    const jwtToken = await getData('user_token');
    const body = {token: jwtToken};
    const res = await fetchPost(url, body);
    console.log(res);
    if(res.result) {
      await removeData('user_token');
      navigation.navigate('SplashScreen');
    }
  }

  return (
    <TouchableOpacity style={styles.unregister} onPress={onPressUnregister}>
      <StyledText content="회원 탈퇴" fontSize={15} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  unregister: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  }
})