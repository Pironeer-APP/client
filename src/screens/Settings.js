import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import StyledContainer from '../components/StyledContainer'
import HeaderDetail from '../components/Header'
import UserSection from '../settings/UserSection'
import NotiSection from '../settings/NotiSection'
import ThemeSection from '../settings/ThemeSection'
import PolicySection from '../settings/PolicySection'
import { Gap } from './HomeScreen'
import LogoutSection from '../settings/LogoutSection'
import { getData } from '../utils'

export default function Settings() {
  const [userInfo, setUserInfo] = useState({});
  const getUserInfo = async () => {
    const storageUserInfo = await getData('user_info');
    setUserInfo(storageUserInfo);
  }
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
      </ScrollView>
    </StyledContainer>
  )
}