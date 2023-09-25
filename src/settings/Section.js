import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'
import { PaddingBox } from '../components/Box'
import { COLORS } from '../assets/Theme'
import { FontStyledText } from '../components/Text'

export default function Section({title, children}) {
  return (
    <Container>
      <FontStyledText style={styles.settingDetail}>{title}</FontStyledText>
      <PaddingBox>
        {children}
      </PaddingBox>
    </Container>
  )
}

const Container = styled.View`
padding: 20px 0;
`
const styles = StyleSheet.create({
  settingDetail: {
    color: COLORS.light_gray,
    fontSize: 18
  },
})