import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import StyledContainer from '../components/StyledContainer';
import HeaderDetail from '../components/Header';

const AnnouncementScreen = () => {
  return (
    <StyledContainer>
      <HeaderDetail title={'공지'} />
    </StyledContainer>
  );
};

export default AnnouncementScreen;

const styles = StyleSheet.create({});
