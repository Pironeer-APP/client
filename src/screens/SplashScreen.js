import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontStyledText } from '../components/Text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../assets/Theme';
import { getData } from '../utils';
import HeaderLogo from '../login/HeaderLogo';

export default function SplashScreen({ navigation }) {
  const [dot, setDot] = useState(0);

  const verify = () => {
    // AsyncStorage에 로그인 정보가 있는지 확인
    // 없으면 로그인을 위해 LoginScreen으로 이동
    // 있다면 is_admin인지 확인
    // is_admin === 1 이면 AdminNavigationRoutes로 이동
    // 아니면(일반 사용자) DrawerNavigationRoutes로 이동
    setTimeout(async () => {
      const userInfo = await getData('user_info');
      console.log(userInfo);
      navigation.replace(
        userInfo === null
        ? 'LoginScreen' : 'DrawerNavigationRoutes');
    }, 1000);
  }
  useEffect(() => {
    verify();
  }, []);
  useEffect(() => {
    const id = setInterval(() => {
      if (dot < 3) setDot(dot + 1);
      else setDot(0);
    }, 1000);
    return () => clearInterval(id)
  });
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
  }
})