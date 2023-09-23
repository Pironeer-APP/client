import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function AddUserHeader({onPressBack}) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onPressBack}>
        <Image source={require("../assets/icons/left-arrow.png")} style={styles.image} />
      </TouchableOpacity>
      <View style={{ flex: 1 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    height: 50,
    width: '100%',
  },
  image: {
    resizeMode: 'contain',
    height: '100%'
  }
})