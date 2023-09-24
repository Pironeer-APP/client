import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MiniButton } from '../../components/Button'
import { COLORS } from '../../assets/Theme'

export default function AddUserSuccessScreen({ navigation }) {
  const onPress = () => {
   navigation.navigate('AdminHomeScreen');
  }
  const onPressKeep = () => {
    navigation.navigate('AddUserScreen');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/icons/success.png')} style={styles.image} />
      <Text style={styles.desc}>회원 정보 추가 완료</Text>
      <View style={styles.btnContainer}>
        <View style={styles.touchable}>
        <MiniButton outline={true} onPress={onPress}>홈으로</MiniButton>
        </View>
        <View style={styles.touchable}>
        <MiniButton outline={false} onPress={onPressKeep}>계속 추가</MiniButton>
        </View>
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