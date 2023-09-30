import { TextInput, StyleSheet } from 'react-native'
import { COLORS } from '../assets/Theme'

export const SettingInput = (props) => (
  <TextInput
    style={styles.textInput}
    maxLength={props.maxLength}
    placeholder={props.placeholder}
    placeholderTextColor={COLORS.light_gray}
    autoFocus={props.autoFocus}
    value={props.value}
    onChangeText={props.onChangeText}
    secureTextEntry={props.secureTextEntry}
    keyboardType={props.keyboardType}
  />
)

const styles = StyleSheet.create({
  textInput: {
    height: 60,
    marginBottom: 15,
    fontSize: 25,
    color: COLORS.textColor,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.green,
  }
})