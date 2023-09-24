import { View, Text } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import SafeAreaContainer from '../components/SafeAreaContainer'

export default function AdminSessionScreen({navigation}) {
  return (
    <SafeAreaContainer>
      <Header onPressBack={() => navigation.goBack()} title="세션" />
    </SafeAreaContainer>
  )
}