import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import SafeAreaContainer from '../../components/SafeAreaContainer'
import AdminDepositList from '../../deposit/AdminDepositList'
import HeaderDetail from '../../components/Header'

export default function AdminDepositScreen({ navigation }) {
  return (
    <SafeAreaContainer>
      <HeaderDetail title="보증금 관리" />
      <AdminDepositList navigation={navigation} />
    </SafeAreaContainer>
  )
}