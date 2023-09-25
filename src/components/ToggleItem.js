import { View, Text, Switch, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../assets/Theme'
import { StyledText } from './Text'

export default function ToggleItem(props) {
  return (
    <View style={styles.toggleItem}>
      <StyledText content={props.text} fontSize={20} />
      <Switch
        trackColor={{ false: COLORS.light_gray, true: COLORS.light_gray }}
        thumbColor={props.value ? COLORS.green : 'white'}
        ios_backgroundColor={COLORS.light_gray}
        onValueChange={props.onValueChange}
        value={props.value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  toggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  }
})