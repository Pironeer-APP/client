import { View, Text } from 'react-native'
import React from 'react'
import SafeAreaContainer from '../../components/SafeAreaContainer';
import HeaderDetail from '../../components/Header';

export default function AdminDepositDetail({route, navigation}) {
  const {userInfo} = route.params;
  return (
    <SafeAreaContainer>
      <HeaderDetail title={`${userInfo.name}님의 보증금 관리`} />
    </SafeAreaContainer>
  )
}