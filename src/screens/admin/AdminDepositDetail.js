import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Header';
import SafeAreaContainer from '../../components/SafeAreaContainer';

export default function AdminDepositDetail({route, navigation}) {
  const {userInfo} = route.params;
  return (
    <SafeAreaContainer>
      <Header title={`${userInfo.name}님의 보증금 관리`} onPressBack={() => navigation.goBack()} />
    </SafeAreaContainer>
  )
}