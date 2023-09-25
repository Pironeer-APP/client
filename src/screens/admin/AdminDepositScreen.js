import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import AdminDepositList from '../../deposit/AdminDepositList'
import HeaderDetail from '../../components/Header'
import StyledContainer from '../../components/StyledContainer'

export default function AdminDepositScreen() {
  return (
    <StyledContainer>
      <HeaderDetail title="보증금 관리" />
      <AdminDepositList />
    </StyledContainer>
  )
}