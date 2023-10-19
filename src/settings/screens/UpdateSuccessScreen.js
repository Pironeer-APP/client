import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { MiniButton } from '../../components/Button'
import { COLORS } from '../../assets/Theme'
import StyledContainer from '../../components/StyledContainer'
import { useNavigation } from '@react-navigation/native';

export default function UpdateSuccessScreen({route}) {
  const navigation = useNavigation();

  const onPress = () => {
   navigation.navigate('HomeScreen');
  }

  return (
    <StyledContainer style={styles.container}>
      <Image source={require('../../assets/icons/success.png')} style={styles.image} />
      <Text style={styles.desc}>{route.params.type} 수정 완료</Text>
      <View style={styles.btnContainer}>
        <MiniButton outline={true} onPress={onPress}>홈으로</MiniButton>
      </View>
    </StyledContainer>
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
    width: '80%',
    marginHorizontal: 10
  }
})