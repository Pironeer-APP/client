import {View, Text} from 'react-native';
import React from 'react';
import {SettingsItem} from './UserSection';
import {PaddingBox} from '../components/Box';
import {useNavigation} from '@react-navigation/native';

export default function PolicySection() {
  const navigation = useNavigation();
  const onPressPolicy = () => navigation.push('OperationPolicyScreen');

  return (
    <PaddingBox>
      <SettingsItem text="이용안내" onPress={onPressPolicy} />
    </PaddingBox>
  );
}
