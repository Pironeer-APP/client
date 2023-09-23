import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { MiniButton } from '../components/Button'
import { COLORS } from '../assets/Theme'
import { onPressHome } from '../utils'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AddUserSuccessScreen({ navigation }) {
  const onPress = () => {
    onPressHome(navigation);
  }
  const onPressKeep = () => {
    navigation.navigate('AddUserScreen');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/icons/success.png')} style={styles.image} />
      <Text style={styles.desc}>회원 정보 추가 완료</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={onPress} style={styles.touchable}>
        <MiniButton outline={true}>홈으로</MiniButton>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressKeep} style={styles.touchable}>
        <MiniButton outline={false}>계속 추가</MiniButton>
        </TouchableOpacity>
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
  btnContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    marginVertical: 30
  },
  desc: {
    fontFamily: 'Interop-Bold',
    fontSize: 25,
    color: 'white',
    marginBottom: 30
  },
  touchable: {
    width: '40%',
    marginHorizontal: 10
  }
})