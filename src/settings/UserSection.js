import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import styled from 'styled-components/native'
import { FontStyledText, StyledText } from '../components/Text'
import { COLORS } from '../assets/Theme'
import { PaddingBox } from '../components/Box'
import { getData } from '../utils'
import { RightArrowBtn } from '../components/Button'
import Gap from '../components/Gap'
import Section from './Section'


export default function UserSection() {
  const [userInfo, setUserInfo] = useState({});
  const getUserInfo = async () => {
    const storageUserInfo = await getData('user_info');
    setUserInfo(storageUserInfo);
  }
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Section title="회원정보 수정">
      <View style={styles.profile}>
        <ImageBackground style={styles.profileImg} source={require("../assets/images/headerLogo.png")} />
        <View style={styles.profileContent}>
          <StyledText fontSize={25} content={userInfo.name} />
          <StyledText fontSize={13} content={userInfo.email} />
        </View>
      </View>
      <Gap />
      <SettingsItem text="아이디 변경" />
      <Gap />
      <SettingsItem text="비밀번호 변경" />
      <Gap />
      <SettingsItem text="전화번호 변경" />
      <Gap />
      <SettingsItem text="이메일 변경" />
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