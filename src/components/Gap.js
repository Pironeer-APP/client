import { View, Text } from 'react-native'
import React from 'react'

export default Gap = ({height = 20}) => (
  <View style={{height: height}} />
)

export const GapH = ({width = 20}) => (
  <View style={{width: width}} />
)
