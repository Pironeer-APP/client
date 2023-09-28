import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { PaddingBox } from '../components/Box';
import ToggleItem from '../components/ToggleItem';

export default function ThemeSection() {
  const [theme, setTheme] = useState(false);
  const themeToggleSwitch = () => {
    if(!theme) {
      Alert.alert('준비 중입니다...', '', [
        {
          text: '확인',
        },
      ]);
    }
    // 테마 적용되면 이 부분 살리고 Alert 지우기
    // setTheme(!theme);
  }
  return (
    <PaddingBox>
      <ToggleItem
        text="라이트모드"
        onValueChange={themeToggleSwitch}
        value={theme}
      />
    </PaddingBox>
  )
}