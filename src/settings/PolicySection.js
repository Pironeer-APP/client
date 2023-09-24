import { View, Text } from 'react-native'
import React from 'react'
import { SettingsItem } from './UserSection'
import { PaddingBox } from '../components/Box'

export default function PolicySection() {
  return (
    <PaddingBox>
      <SettingsItem text="이용안내" />
    </PaddingBox>
  )
}