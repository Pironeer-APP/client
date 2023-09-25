import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { PaddingBox } from '../components/Box';
import ToggleItem from '../components/ToggleItem';

export default function ThemeSection() {
  const [theme, setTheme] = useState(false);
  const themeToggleSwitch = () => setTheme(!theme);
  return (
    <PaddingBox>
      <ToggleItem
        text={theme ? "라이트모드" : "다크모드"}
        onValueChange={themeToggleSwitch}
        value={theme}
      />
    </PaddingBox>
  )
}