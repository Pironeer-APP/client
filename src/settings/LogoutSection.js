import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { PaddingBox } from '../components/Box'
import { StyledText } from '../components/Text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackActions, NavigationActions } from 'react-navigation';

export default function LogoutSection() {
  const navigation = useNavigation();

  const removeInfo = async () => {
    try {
      await AsyncStorage.removeItem('user_token');
      navigation.reset({routes: [{name: "SplashScreen"}]}); // stack 초기화!!
      navigation.navigate('SplashScreen');
    } catch(e) {
      console.log(e);
    }
  }

  const onPressLogout = () => {
    Alert.alert('로그아웃 하시겠습니까?', '', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '로그아웃',
        onPress: () => removeInfo(),
      },
    ]);
  }
  return (
    <PaddingBox>
      <Item text="로그아웃" onPress={onPressLogout} />
    </PaddingBox>
  )
}
const Item = ({text, onPress}) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <StyledText content={text} fontSize={20} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  }
})