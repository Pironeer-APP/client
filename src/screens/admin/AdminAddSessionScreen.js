import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import StyledContainer from '../../components/StyledContainer';
import {COLORS} from '../../assets/Theme';
import ToggleItem from '../../components/ToggleItem';
import {PaddingBox} from '../../components/Box';
import DatePicker from 'react-native-date-picker';
import {StyledText} from '../../components/Text';
import {fetchPost, localeDate} from '../../utils';
import HeaderDetail from '../../components/Header';
import useUserInfo from '../../use-userInfo';

export default function AdminAddSessionScreen() {
  const [face, setFace] = useState(false);
  const faceToggleSwitch = () => setFace(!face);

  const [date, setDate] = useState(new Date());

  const [sessionTitle, setSessionTitle] = useState('');
  const [sessionPlace, setSessionPlace] = useState('');

  const navigation = useNavigation();

  const {userToken, getUserToken} = useUserInfo();

  useEffect(() => {
    getUserToken();
    const newDate = new Date();
    newDate.setHours(10, 0, 0, 0);
    setDate(newDate);
  }, []);

  const onPressConfirm = async () => {
    console.log('클라이언트 저장 직전 date', date);
    console.log('클라이언트 저장 직전 locale date', localeDate(date));
    const url = '/session/addSchedule';
    const body = {
      title: sessionTitle,
      date: localeDate(date),
      face: face,
      place: sessionPlace,
      userToken: userToken,
    };
    if (sessionTitle.length === 0) {
      Alert.alert('제목 입력해야지?');
    } else if (face === true && sessionPlace.length === 0) {
      Alert.alert('장소 입력해야지?');
    } else {
      try {
        const res = await fetchPost(url, body);
        console.log(res);
        navigation.navigate('AdminSessionScreen');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <StyledContainer>
        <HeaderDetail
          title={'일정 추가'}
          button={'완료'}
          buttonOnPress={onPressConfirm}
        />
        <View style={{flex: 1, paddingHorizontal: 20}}>
          <TextInput
            style={styles.titleInput}
            placeholder="일정 명"
            placeholderTextColor={COLORS.light_gray}
            color={COLORS.textColor}
            value={sessionTitle}
            onChangeText={setSessionTitle}
          />
          {/* 지도 api 적용해보기 */}
          <TextInput
            style={styles.titleInput}
            placeholder="장소"
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 5,
              }}>
              <StyledText
                content={`${
                  Number(date.getMonth().toLocaleString()) + 1
                }월 ${date.getDate().toLocaleString()}일`}
                fontSize={20}
              />
              <StyledText
                content={`${date.getHours().toLocaleString().padStart(2, '0')}:${date
                  .getMinutes()
                  .toLocaleString().padStart(2, '0')}`}
                fontSize={20}
              />
            </View>
          </PaddingBox>
          <StyledContainer>
            <View style={{flex: 1, alignItems: 'center'}}>
            <DatePicker
              date={date}
              onDateChange={setDate}
              androidVariant="iosClone"
              locale="ko"
              textColor={COLORS.textColor}
              theme="dark"
              minuteInterval={5}
              fadeToColor="none"
              is24hourSource="locale"
              defaultValue={date}
            />
            </View>
          </StyledContainer>
        </View>
      </StyledContainer>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  titleInput: {
    borderBottomColor: COLORS.light_gray,
    borderBottomWidth: 1,
    fontSize: 20,
    padding: 10,
  },
});
