import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import SafeAreaContainer from '../../components/SafeAreaContainer'
import HeaderDetail from '../../components/Header'

export default function AdminSessionScreen({navigation}) {
  return (
    <SafeAreaContainer>
      <HeaderDetail title="세션" />
    </SafeAreaContainer>
  )
}