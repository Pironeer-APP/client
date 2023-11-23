import {View, Alert} from 'react-native';
import React, {useState} from 'react';
import StyledContainer from '../../components/StyledContainer';
import HeaderDetail from '../../components/Header';
import {COLORS} from '../../assets/Theme';
import {CustomTextInput} from '../../components/Input';
import DatePicker from 'react-native-date-picker';
import {Box} from '../../components/Box';
import {StyledText} from '../../components/Text';
import {useNavigation} from '@react-navigation/native';
import Gap from '../../components/Gap';
import useFormattedTime from '../../use-formattedTime';
import { client } from '../../api/client';
import { getData } from '../../api/asyncStorage';

const AdminCreateAssignment = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(() => {
    const newDate = new Date();
    newDate.setHours(10, 0, 0, 0);
    return newDate;
  });

  const createAssign = async () => {
    console.log(date); // UTC
    const dateData = useFormattedTime(date); // UTC로 보낸다

    const userToken = await getData('user_token');
    const url = `/assign/createAssign`;
    const body = {userToken, title, dateData};
    if (title.length === 0) {
      Alert.alert('제목 입력해');
    } else {
      try {
        await client.post(url, body);
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
                defaultValue={date}
                // timeZoneOffsetInMinutes={0} // clientTime으로 저장
                // 하지만 2023-10-13 13:00:00으로 바꾸는 과정이 UTC로 저장되어야 더 편하기 때문에 직접 변환하겠음.
              />
            </View>
          </View>
        </Box>
      </View>
    </StyledContainer>
  );
};

export default AdminCreateAssignment;
