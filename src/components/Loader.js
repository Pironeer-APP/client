import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderLogo from '../login/HeaderLogo';

import {COLORS} from '../assets/Theme';

export const TinyLoader = () => (
  <ActivityIndicator size="small" color={`${COLORS.icon_gray}`} />
);

export const MediumLoader = () => (
  <View
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 70,
    }}>
    <ActivityIndicator size="large" color={`${COLORS.green}`} />
  </View>
);
