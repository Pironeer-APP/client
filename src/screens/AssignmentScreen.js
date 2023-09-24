import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {RowView, StyledContainer} from './HomeScreen';
import {StyledText} from '../components/Text';
import {HeaderDetail} from '../components/Header';

const AssignmentScreen = () => {
  return (
    <StyledContainer>
      <HeaderDetail title={'과제'} />
    </StyledContainer>
  );
};

export default AssignmentScreen;
