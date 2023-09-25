import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { PaddingBox } from '../components/Box'
import { StyledText } from '../components/Text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function LogoutSection() {
  const navigation = useNavigation();

  const onPressLogout = async () => {
    try {
      await AsyncStorage.removeItem('user_info');
      navigation.navigate('SplashScreen');
    } catch(e) {
      console.log(e);
    }
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