import {TextInput, StyleSheet} from 'react-native';
import {COLORS} from '../assets/Theme';
import styled from 'styled-components';

export const SettingInput = props => (
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
);

const styles = StyleSheet.create({
  textInput: {
    height: 60,
    marginBottom: 15,
    fontSize: 25,
    color: COLORS.textColor,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.green,
  },
});

// TextInput
const TextInputCSS = styled.TextInput`
  color: white;
  font-size: 20px;
  padding: 10px 20px;
  /* border-width: 1px;
  border-bottom-color: ${COLORS.light_gray}; */
`;

export const CustomTextInput = ({placeholder, title, setTitle}) => {
  return (
    <TextInputCSS
      placeholder={placeholder}
      value={title}
      onChangeText={text => setTitle(text)}
      placeholderTextColor={COLORS.light_gray}
    />
  );
};
