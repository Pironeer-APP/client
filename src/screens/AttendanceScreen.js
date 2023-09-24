import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StyledContainer} from './HomeScreen';
import HeaderDetail from '../components/Header';

const AttendanceScreen = () => {
  return (
    <StyledContainer>
      <HeaderDetail title={'출석'} />
    </StyledContainer>
  );
};

export default AttendanceScreen;

const styles = StyleSheet.create({});
