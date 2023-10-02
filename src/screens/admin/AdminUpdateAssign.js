import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import StyledContainer from '../../components/StyledContainer';
import HeaderDetail from '../../components/Header';
import {Box} from '../../components/Box';
import Gap from '../../components/Gap';
import DatePicker from 'react-native-date-picker';
import {CustomTextInput} from '../../components/Input';
import {StyledText} from '../../components/Text';
import {COLORS} from '../../assets/Theme';
import {fetchPost} from '../../utils';

const AdminUpdateAssign = ({route}) => {
  const {
    title: getTitle,
    due: getDue,
    assignLevel: assignId,
    level,
  } = route.params;

  const [title, setTitle] = useState(getTitle);
  const [date, setDate] = useState(new Date(getDue));

  const updateAssign = async () => {
    const url = `/admin/assign/${level}/update`;
    const body = {assignId, title, date};
    console.log('body: ', body);
    try {
      await fetchPost(url, body);
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
            />
          </View>
        </View>
      </Box>
    </StyledContainer>
  );
};

export default AdminUpdateAssign;