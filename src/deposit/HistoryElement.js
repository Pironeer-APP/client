import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { StyledText } from '../components/Text'

export default function HistoryElement({history}) {
  console.log(history);
  return (
    <View style={styles.historyElement}>
      <StyledText content={`${history.monthDay} ${history.type}`} fontSize={20} />
      <StyledText content={history.price} fontSize={20} />
    </View>
  )
}

const styles = StyleSheet.create({
  historyElement: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 20,
  }
})