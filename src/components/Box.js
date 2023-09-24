import {View, Text, StyleSheet} from 'react-native';
import React, {Children} from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../assets/Theme';

const StyledBox = styled.View`
  background-color: ${COLORS.gray};
  border-radius: 15px;
`;

export const Box = ({children}) => <StyledBox>{children}</StyledBox>;