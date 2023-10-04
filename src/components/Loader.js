import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderLogo from '../login/HeaderLogo';
import {FontStyledText} from './Text';
import {COLORS} from '../assets/Theme';

const Loader = () => {
  return (
    <View>
      <SafeAreaView style={styles.container}>
        <HeaderLogo />
        <View style={styles.loadingTextContainer}>
          <FontStyledText style={styles.loadingText}>로딩중...</FontStyledText>
        </View>
      </SafeAreaView>
    </View>
  );
};

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.bg_black,
  },
  loadingTextContainer: {
    height: 100,
  },
  loadingText: {
    color: 'white',
    fontSize: 20,
  },
});
export default Loader;
