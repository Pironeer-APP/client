import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function HeaderLogo() {
  return (
    <View style={styles.imageContainer}>
      <Image
       source={require('../assets/images/headerLogo.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})