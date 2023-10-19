import { View, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function HeaderLogo() {
  return (
    <View style={styles.imageContainer}>
      <Image
        style={{width: 100, height: 100}}
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