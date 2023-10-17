import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../assets/Theme'

export const Hr = () => (
    <View style={styles.hr} />
)

const styles = StyleSheet.create({
    hr: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.icon_gray,
        marginVertical: 10
    }
})