import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export const FontStyledText = ({style, children}) => (
  <Text style={[styles.fontStyle, style]}>
    {children}
  </Text>
)

const styles = StyleSheet.create({
  fontStyle: {
    fontFamily: 'Interop-Medium',
  }
})