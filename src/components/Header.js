import {TouchableOpacity, View} from 'react-native';
import React from 'react';
import {LeftArrowBtn} from './Button.js';
import {StyledText} from '../components/Text';
import {RowView} from '../screens/HomeScreen';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../assets/Theme.js';

export default function HeaderDetail({
  title,
  button = false,
  buttonOnPress = false,
  backgroundColor = 'transparent',
  color,
}) {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={{paddingVertical: 20, backgroundColor: `${backgroundColor}`}}>
      <RowView>
        <LeftArrowBtn onPress={handleGoBack} color={color} />
        <StyledText content={title} fontSize={20} />
        {button ? (
          <>
            <View style={{width: 20}} />
            <TouchableOpacity
              onPress={buttonOnPress}
              style={{
                backgroundColor: `${COLORS.green}`,
                paddingHorizontal: 14,
                paddingVertical: 7,
                borderRadius: 10,
                position: 'absolute',
                right: 0,
              }}>
              <StyledText content={button} fontSize={17} color={'black'} />
            </TouchableOpacity>
          </>
        ) : (
          <View style={{width: 20}} />
        )}
      </RowView>
    </View>
  );
}

export function HeaderAdmin({title, onPress}) {
  return (
    <View style={{paddingVertical: 20}}>
      <RowView>
        <LeftArrowBtn onPress={onPress} />
        <StyledText content={title} fontSize={24} />
        <View style={{width: 20}} />
      </RowView>
    </View>
  );
}
