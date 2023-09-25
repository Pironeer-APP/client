import { View } from 'react-native'
import React from 'react'
import { LeftArrowBtn } from './Button.js';
import { StyledText } from '../components/Text';
import { RowView } from '../screens/HomeScreen';
import { useNavigation } from '@react-navigation/native';

export default function HeaderDetail({ title }) {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };
  return (

    <View style={{paddingVertical: 20}}>
      <RowView>
        <LeftArrowBtn onPress={handleGoBack} />
        <StyledText content={title} fontSize={24} />
        <View style={{width: 20}} />
      </RowView>
    </View>
  );
};
