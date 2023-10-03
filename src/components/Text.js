import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../assets/Theme';

const TextCSS = styled.Text`
  font-size: ${props => props.fontSize}px;
  color: ${props => (props.color ? props.color : 'white')};
  font-family: 'Interop-Medium';
  font-weight: ${props => props.weight};
`;
export const StyledText = ({
  content,
  fontSize = 24,
  color = false,
  weight = 400,
}) => (
  <TextCSS fontSize={fontSize} color={color} weight={weight}>
    {content}
  </TextCSS>
);

const SubTextCSS = styled.Text`
  font-size: 17px;
  color: ${COLORS.light_gray};
  font-family: 'Interop-Medium';
`;
export const StyledSubText = props => <SubTextCSS>{props.content}</SubTextCSS>;

// 원채가 만든거
export const FontStyledText = ({style, children}) => (
  <Text style={[styles.fontStyle, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  fontStyle: {
    color: 'white',
    fontFamily: 'Interop-Medium',
  },
});
