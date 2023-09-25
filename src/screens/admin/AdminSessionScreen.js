import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import HeaderDetail from '../../components/Header'
import StyledContainer from '../../components/StyledContainer'

export default function AdminSessionScreen({navigation}) {
  return (
    <StyledContainer>
      <HeaderDetail title="세션" />
    </StyledContainer>
  )
}