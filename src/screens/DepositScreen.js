import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HeaderDetail from '../components/Header';
import {StyledContainer} from './HomeScreen';

const DepositScreen = () => {
  return (
    <StyledContainer>
      <HeaderDetail title={'보증금'} />
    </StyledContainer>
  );
};

export default DepositScreen;

const styles = StyleSheet.create({});
