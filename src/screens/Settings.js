import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import StyledContainer from '../components/StyledContainer'
import HeaderDetail from '../components/Header'
import UserSection from '../settings/UserSection'
import NotiSection from '../settings/NotiSection'
import ThemeSection from '../settings/ThemeSection'
import PolicySection from '../settings/PolicySection'
import { Gap } from './HomeScreen'
import LogoutSection from '../settings/LogoutSection'

export default function Settings() {
  return (
    <StyledContainer>
      <HeaderDetail title="설정" />
      <ScrollView>
        <UserSection />
        <NotiSection />
        <ThemeSection />
        <Gap />
        <PolicySection />
        <Gap />
        <LogoutSection />
      </ScrollView>
    </StyledContainer>
  )
}