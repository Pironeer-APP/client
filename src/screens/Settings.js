import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import StyledContainer from '../components/StyledContainer'
import HeaderDetail from '../components/Header'
import UserSection from '../settings/UserSection'
import NotiSection from '../settings/NotiSection'
import ThemeSection from '../settings/ThemeSection'
import PolicySection from '../settings/PolicySection'
import LogoutSection from '../settings/LogoutSection'
import Gap from '../components/Gap'
import useUserInfo from '../use-userInfo'
import { StyledText } from '../components/Text'
import UnregisterSection from '../settings/UnregisterSection'

export default function Settings() {
  const {
    userInfo,
    getUserInfo,
  } = useUserInfo();
  
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <StyledContainer>
      <HeaderDetail title="설정" />
      <ScrollView>
        <UserSection userInfo={userInfo} />
        <Gap />
        <NotiSection />
        <ThemeSection />
        <PolicySection />
        <LogoutSection />
        <UnregisterSection />
      </ScrollView>
    </StyledContainer>
  )
}