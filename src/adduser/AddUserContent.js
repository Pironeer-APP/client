import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import AddUserInput from './AddUserInput';

export default function AddUserContent({
  level, name, phone, email,
  titleNum,
  onInputLevel,
  onInputName,
  onInputPhone,
  onInputEmail,
}) {
  const titleList = [
    "신입 부원의 기수를 입력해 주세요",
    "이름을 입력해 주세요",
    "전화번호를 입력해 주세요",
    "이메일을 입력해 주세요",
    "정보가 올바른지 확인해 주세요",
  ]

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.contentTitle}>{titleList[titleNum]}</Text>
      <ScrollView>
      {titleNum >= 3 &&
      <AddUserInput
        value={email}
        titleNum={titleNum}
        num={3}
        inputDesc="신입 부원 이메일"
        onTextInput={onInputEmail}
        placeholder="piropiro@gmail.com"
        maxLength={48}
      />
      }
      {titleNum >= 2 &&
      <AddUserInput
        value={phone}
        titleNum={titleNum}
        num={2}
        inputDesc="신입 부원 전화번호"
        onTextInput={onInputPhone}
        placeholder="010-0000-0000"
        keyboardType='numeric' //숫자키보드
        maxLength={13}
      />
      }
      {titleNum >= 1 &&
      <AddUserInput
        value={name}
        titleNum={titleNum}
        num={1}
        inputDesc="신입 부원 이름"
        onTextInput={onInputName}
        placeholder="김피로"
        maxLength={24}
      />
      }
      {titleNum >= 0 &&
      <AddUserInput
        value={level}
        titleNum={titleNum}
        num={0}
        inputDesc="신입 부원 기수"
        onTextInput={onInputLevel}
        placeholder="19"
        keyboardType='numeric'
        maxLength={12}
      />
      }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  contentTitle: {
    fontFamily: 'Interop-Bold',
    color: 'white',
    fontSize: 25,
    paddingVertical: 20,
  },
})