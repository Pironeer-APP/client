import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../assets/Theme';
import { FontStyledText } from '../components/Text';

export default function AddUserInput({
  titleNum,
  num,
  inputDesc,
  value,
  onTextInput,
  placeholder,
  keyboardType,
  maxLength
}) {
  return (
    <View style={styles.inputWrapper}>
      {titleNum > num &&
        <FontStyledText style={styles.inputDesc}>{inputDesc}</FontStyledText>
      }
      <TextInput
        value={value}
        onChangeText={(value) => onTextInput(value)}
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={COLORS.light_gray}
        required={true}
        keyboardType={keyboardType}
        autoFocus={true}
        maxLength={maxLength} />
    </View>
  )
}

const styles = StyleSheet.create({
  inputWrapper: {
    paddingVertical: 15
  },
  textInput: {
    color: 'white',
    height: 60,
    marginBottom: 15,
    borderWidth: 2,
    fontSize: 25,
    borderBottomColor: COLORS.light_gray,
  },
  inputDesc: {
    color: COLORS.green,
    fontSize: 17,
  }
})