import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../assets/Theme'

export default StatusCircle = () => (
    <View style={styles.statusCircle} />
)

const styles = StyleSheet.create({
    statusCircle: {
      width: 30,
      height: 30,
      backgroundColor: COLORS.light_gray,
      borderRadius: 100,
      borderWidth: 0.8,
      borderColor: COLORS.textColor
    },
})