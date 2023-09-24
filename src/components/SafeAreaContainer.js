import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { COLORS } from '../assets/Theme'

export default SafeAreaContainer = ({children}) => (
  <SafeAreaView style={styles.container}>
    {children}
  </SafeAreaView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.bg_black
  },
})