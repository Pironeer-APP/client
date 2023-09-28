import { View, Text, TextInput, StyleSheet, Button, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import StyledContainer from '../../components/StyledContainer'
import FormHeader from '../../components/FormHeader'
import { COLORS } from '../../assets/Theme'
import ToggleItem from '../../components/ToggleItem'
import { PaddingBox } from '../../components/Box'
import DatePicker from 'react-native-date-picker'
import { StyledText } from '../../components/Text'
import { fetchPost } from '../../utils'

export default function AdminAddSessionScreen() {
  const [face, setFace] = useState(false);
  const faceToggleSwitch = () => setFace(!face);

  const [date, setDate] = useState(new Date());
  
  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionPlace, setSessionPlace] = useState('');

  const navigation = useNavigation();

  const onPressConfirm = async () => {
    const url = '/session/addSchedule';
    const body = {
      title: sessionTitle,
      date: date,
      face: face,
    }
    try {
      const res = await fetchPost(url, body);
      console.log(res);
      navigation.navigate('AdminSessionScreen');
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <StyledContainer>
      <FormHeader title="일정 추가" onPress={onPressConfirm} />
      <TextInput
        style={styles.titleInput}
        placeholder='일정 명'
        placeholderTextColor={COLORS.light_gray}
        color={COLORS.textColor}
        value={sessionTitle}
        onChangeText={setSessionTitle}
      />
      {/* 지도 api 적용해보기 */}
      <TextInput
        style={styles.titleInput}
        placeholder='장소'
        placeholderTextColor={COLORS.light_gray}
        color={COLORS.textColor}
        value={sessionPlace}
        onChangeText={setSessionPlace}
      />
      <PaddingBox>
        <ToggleItem
          text="대면"
          onValueChange={faceToggleSwitch}
          value={face}
        />
      </PaddingBox>
      <PaddingBox>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5}}>
        <StyledText content={`${date.getMonth() + 1}월 ${date.getDate()}일`} fontSize={20} />
        <StyledText content={`${date.getHours()}:${date.getMinutes()}`} fontSize={20} />
        </View>
      </PaddingBox>
      <StyledContainer>
      <DatePicker
        date={date}
        onDateChange={setDate}
        androidVariant="iosClone"
        locale="ko-kr"
        textColor={COLORS.textColor}
        theme="dark"
        minuteInterval={5}
        fadeToColor="none" />
      </StyledContainer>
    </StyledContainer>
  )
}

const styles = StyleSheet.create({
  titleInput: {
    borderBottomColor: COLORS.light_gray,
    borderBottomWidth: 1,
    fontSize: 25
  }
})