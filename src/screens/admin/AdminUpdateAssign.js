import {View} from 'react-native';
import React, {useState} from 'react';
import StyledContainer from '../../components/StyledContainer';
import HeaderDetail from '../../components/Header';
import {Box} from '../../components/Box';
import Gap from '../../components/Gap';
import DatePicker from 'react-native-date-picker';
import {CustomTextInput} from '../../components/Input';
import {StyledText} from '../../components/Text';
import {COLORS} from '../../assets/Theme';
import {useNavigation} from '@react-navigation/native';
import { client } from '../../api/client';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssigns } from '../../features/assigns/assignsSlice';
import { selectJwt } from '../../features/account/accountSlice';

const AdminUpdateAssign = ({route}) => {
  const navigation = useNavigation();

  const {
    title: getTitle,
    due: getDue,
    assignId: assignId,
  } = route.params;

  const [title, setTitle] = useState(getTitle);
  const [date, setDate] = useState(new Date(getDue));

  const dispatch = useDispatch();
  const jwt = useSelector(selectJwt);

  const updateAssign = async () => {
    const formattedDate =  `${date.getFullYear()}-${Number(date.getMonth())+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const url = `/assign/updateAssign`;
    const body = {
      userToken: jwt,
      assignId: assignId,
      title: title,
      formattedDate: formattedDate
    }

    try {
      await client.post(url, body);
      dispatch(fetchAssigns());
      navigation.goBack();
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <StyledContainer>
      <HeaderDetail
        title={'과제 수정'}
        button={'완료'}
        buttonOnPress={() => updateAssign()}
      />
      <View style={{paddingHorizontal: 20}}>
        <Box>
          <CustomTextInput
            placeholder={'과제명'}
            title={title}
            setTitle={setTitle}
            autoFocus={true}
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
              />
            </View>
          </View>
        </Box>
      </View>
    </StyledContainer>
  );
};

export default AdminUpdateAssign;
