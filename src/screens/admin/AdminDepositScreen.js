import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import SafeAreaContainer from '../../components/SafeAreaContainer'
import AdminDepositList from '../../deposit/AdminDepositList'

export default function AdminDepositScreen({ navigation }) {
  return (
    <SafeAreaContainer>
      <Header onPressBack={() => navigation.goBack()} title="보증금 관리" />
      <AdminDepositList navigation={navigation} />
    </SafeAreaContainer>
  )
}