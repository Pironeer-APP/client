import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import StyledContainer from '../components/StyledContainer'
import { StyledText } from '../components/Text'
import { SettingsItem } from '../settings/UserSection'
import { PaddingBox } from '../components/Box'
import HeaderDetail from '../components/Header'
import Gap from '../components/Gap'

export default function OperationPolicyScreen() {
  return (
    <StyledContainer>
      <HeaderDetail title="이용안내" />
      <ScrollView>
        <StyledText content="앱 버전" fontSize={20} />
        <StyledText content="1.0.0" fontSize={15} />
        <Gap />
        <PaddingBox>
          <SettingsItem text="공지사항" />
        </PaddingBox>
        <PaddingBox>
          <SettingsItem text="서비스 이용 약관" />
        </PaddingBox>
        <PaddingBox>
          <SettingsItem text="오픈소스 라이센스" />
        </PaddingBox>
        <PaddingBox>
          <SettingsItem text="실험실" />
        </PaddingBox>
      </ScrollView>
    </StyledContainer>
  )
}