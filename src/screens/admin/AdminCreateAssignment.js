import {View, Text, TextInput, KeyboardAvoidingView, Alert} from 'react-native';
import React, {useState} from 'react';
import StyledContainer from '../../components/StyledContainer';
import HeaderDetail from '../../components/Header';
import {COLORS} from '../../assets/Theme';
import styled from 'styled-components';
import {CustomTextInput} from '../../components/Input';
import DatePicker from 'react-native-date-picker';
import {Box, PaddingBox} from '../../components/Box';
import {StyledSubText, StyledText} from '../../components/Text';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RowView} from '../HomeScreen';
import Gap from '../../components/Gap';
import {fetchPost, getData} from '../../utils';

const AdminCreateAssignment = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const route = useRoute();

  const DayConverter = DayInNum => {
    if (DayInNum == 0) return 'SUN';
    else if (DayInNum == 1) return 'MON';
    else if (DayInNum == 2) return 'TUE';
    else if (DayInNum == 3) return 'WED';
    else if (DayInNum == 4) return 'THU';
    else if (DayInNum == 5) return 'FRI';
    else if (DayInNum == 6) return 'SAT';
  };

  const RenderdDay = DayConverter(date.getDay());
  const hour = `${date.getHours()}`;
  const minute = `${date.getMinutes()}`;
  const RenderHour = hour.padStart(2, '0');
  const RenderMinutes = minute.padStart(2, '0');
  const month = `${date.getMonth() + 1}`;
  const RenderMonth = month.padStart(2, '0');
  const level = route.params.level;
  // const sendLevel = level - 1;

  //  보낼 값

  const dateData = `${date.getFullYear()}-${RenderMonth}-${date.getDate()} ${RenderHour}:${RenderMinutes}:00`;

  const createAssign = async () => {
    const userToken = await getData('user_token');
    const url = `/assign/createAssign`;
    const body = {userToken, title, dateData};
    if (title.length === 0) {
      Alert.alert('제목 입력해');
    } else {
      try {
        await fetchPost(url, body);
        navigation.goBack();
      } catch (error) {
        console.error('Error sending data:', error);
      }
    }
  };

  return (
    <StyledContainer>
      <HeaderDetail
        title={'과제 등록'}
        button={'완료'}
        buttonOnPress={createAssign}
      />
      <View style={{paddingHorizontal: 20}}>
        <Box>
          <CustomTextInput
            placeholder={'과제명'}
            title={title}
            setTitle={setTitle}
          />
        </Box>
        <Gap height={10} />
        <Box>
          <View style={{padding: 20}}>
            <StyledText content={'마감 기한 설정'} fontSize={18} />
            <Gap height={10} />
            <View
              style={{
                backgroundColor: `${COLORS.light_gray}`,
                height: 1,
                marginBottom: 10,
              }}
            />
            <View style={{alignItems: 'center'}}>
              <DatePicker
                date={date}
                onDateChange={setDate}
                androidVariant="iosClone"
                locale="ko-kr"
                textColor={COLORS.textColor}
                theme="dark"
                minuteInterval={5}
                fadeToColor="none"
              />
            </View>
          </View>
        </Box>
      </View>
    </StyledContainer>
  );
};

export default AdminCreateAssignment;
