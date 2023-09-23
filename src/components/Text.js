import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

const TextCSS = styled.Text`
  font-size: ${props => props.fontSize}px;
  color: white;
  font-family: 'Interop-Medium';
`;
export const StyledText = props => (
  <TextCSS fontSize={props.fontSize}>{props.content}</TextCSS>
);

// 원채가 만든거
export const FontStyledText = ({style, children}) => (
  <Text style={[styles.fontStyle, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  fontStyle: {
    fontFamily: 'Interop-Medium',
  },
});
