import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontStyledText } from '../components/Text';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';
import { COLORS } from '../assets/Theme';
import HeaderLogo from '../login/HeaderLogo';
import { getData } from '../api/asyncStorage';

export default function SplashScreen({ navigation }) {
  const [dot, setDot] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (dot < 3) setDot(dot + 1);
      else setDot(0);
    }, 1000);
  });

  const verify = async () => {
    // AsyncStorage에 로그인 정보가 있는지 확인
    // 없으면 로그인을 위해 LoginScreen으로 이동
    // 있다면 is_admin인지 확인
    // is_admin === 1 이면 AdminNavigationRoutes로 이동
    // 아니면(일반 사용자) DrawerNavigationRoutes로 이동
    const userInfo = await getData('user_token');
    navigation.replace(
      userInfo === null
      ? 'LoginScreen' : 'DrawerNavigationRoutes');
  }
  useEffect(() => {
    verify();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <HeaderLogo />
      <View style={styles.loadingTextContainer}>
      <FontStyledText style={styles.loadingText}>로딩중 {'.'.repeat(dot)}</FontStyledText>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.bg_black
  },
  loadingTextContainer: {
    height: 100,
  },
  loadingText: {
    color: 'white',
    fontSize: 20,
  },
  progress: {
    margin: 10,
  },
  circles: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})