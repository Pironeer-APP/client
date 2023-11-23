import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { StyledText } from '../components/Text'
import { RightArrowBtn } from '../components/Button'
import Gap from '../components/Gap'
import Section from './Section'
import { useNavigation } from '@react-navigation/native';

export default function UserSection() {
  const account = useSelector(selectAccount);

  const navigation = useNavigation();

  const onPressCheck = (type) => {
    navigation.navigate('CheckScreen', {type: type});
  }

  const onPressUpdateLevel = (type) => {
    navigation.navigate('UpdateScreen', {type: type});
  }

  return (
    <Section title="회원정보 수정">
      <View style={styles.profile}>
        <ImageBackground style={styles.profileImg} source={require("../assets/images/headerLogo.png")} />
        <View style={styles.profileContent}>
          <StyledText fontSize={25} content={account.name} />
          <StyledText fontSize={13} content={account.email} />
        </View>
      </View>
      <Gap />
      <SettingsItem text="전화번호 변경" onPress={() => onPressCheck("phone")} />
      <Gap />
      <SettingsItem text="비밀번호 변경" onPress={() => onPressCheck("password")} />
      <Gap />
      <SettingsItem text="이메일 변경" onPress={() => onPressCheck("email")} />
      {account.is_admin ? (
        <>
        <Gap />
        <SettingsItem text="(관리자) 기수 변경" onPress={() => onPressUpdateLevel("level")} />
        </>
      ) : null}
    </Section>   
  )
}

export const SettingsItem = ({text, onPress}) => (
  <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
    <StyledText content={text} fontSize={20} />
    <RightArrowBtn />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImg: {
    borderRadius: 100,
    resizeMode: 'cover',
    width: 70,
    height: 70
  },
  profileContent: {
    flex: 1,
    paddingLeft: 20,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  }
})