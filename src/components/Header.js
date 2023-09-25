import { View } from 'react-native'
import React from 'react'
import { LeftArrowBtn } from './Button.js';
import { StyledText } from '../components/Text';
import { RowView } from '../screens/HomeScreen';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

export default function HeaderDetail({ title }) {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <RowHeader>
      <LeftArrowBtn onPress={handleGoBack} />
      <StyledText content={title} fontSize={24} />
      <View />
    </RowHeader>
  )
}

const RowHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;