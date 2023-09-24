import { View, StyleSheet } from 'react-native'
import React from 'react'
import { LeftArrowBtn } from './Button.js';
import { FontStyledText } from './Text.js';
import { COLORS } from '../assets/Theme.js';

export default function Header({onPressBack, title}) {
  return (
    <View style={styles.headerContainer}>
      <LeftArrowBtn onPress={onPressBack} />
      <FontStyledText style={styles.title}>{title}</FontStyledText>
      <View />
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    height: 60,
    width: '100%',
    backgroundColor: COLORS.bg_black,
  },
  image: {
    resizeMode: 'contain',
    height: '100%'
  },
  title: {
    fontSize: 20
  }
})