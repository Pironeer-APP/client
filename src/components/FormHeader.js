import { View, Text } from 'react-native'
import React from 'react'
import { RowView } from '../screens/HomeScreen';
import {useNavigation} from '@react-navigation/native'
import { ConfirmSmallBtn, LeftArrowBtn } from './Button';
import { StyledText } from './Text';

export default function FormHeader({title}) {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{paddingVertical: 20}}>
      <RowView>
        <LeftArrowBtn onPress={handleGoBack} />
        <StyledText content={title} fontSize={24} />
        <View />
        <ConfirmSmallBtn content="완료" />
      </RowView>
    </View>
  );
}