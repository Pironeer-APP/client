import { View, Text, TouchableOpacity } from 'react-native';
import React, {useEffect, useState} from 'react';
import styled from "styled-components/native";
import { COLORS } from "../../assets/Theme";
import { StyledSubText, StyledText } from '../../components/Text';
import StyledContainer from '../../components/StyledContainer';
import HeaderDetail from '../../components/Header';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AdminAttendanceDetailScreen from './AdminAttendanceDetailScreen';
import Gap, { GapH } from '../../components/Gap';
import useUserInfo from '../../use-userInfo';
import { fetchPost, getData } from '../../utils';

const DateContainer = styled.View`
  background-color: ${COLORS.gray};
  border-radius: 12px;
  padding: 10px;
`;

const DateBox = (props) => {
  const navigation = useNavigation();
  // 세션 월, 일 변수 할당
  const month = props.date.month;
  const day = props.date.day;

  // 오늘 일정인지
  let isToday = false;
  const today = new Date();
  if(Number(today.getMonth().toLocaleString()) + 1 === Number(month) && Number(today.getDate().toLocaleString()) === Number(day)) {
    isToday = true;
  }
  // 핸드폰 스크린 너비에 따른 날짜상자 크기 정하기
  const screenWidth = Dimensions.get('window').width;
  const boxWidth = (screenWidth - 30) / 3.4;
  return (
    <TouchableOpacity style={{flex: 1}} onPress={() => navigation.navigate({name: 'AdminAttendanceDetailScreen', params:{month: month, day: day, session_id: props.date.session_id}})}>
      <DateContainer width={boxWidth} style={{ justifyContent:'center' }}>
        <StyledText content={month} fontSize={35} />
        <StyledText content={day} fontSize={35} />
      </DateContainer>
    </TouchableOpacity>
  )
};

const WeekContainer = (props) => {
  return (
    <View style={{ paddingHorizontal: 15, marginBottom: 25 }}>
      <View style={{ marginBottom: 5 }}>
        <StyledSubText content={`Week ${props.week}`}/>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {props.item?.map((date, index) => {
          if(index === 1) {
            return (
              <>
              <GapH />
              <DateBox date={date} />
              <GapH />
              </>
            )
          } else {
            return (
              <DateBox date={date} />
            )
          }
        })}
      </View>
    </View>
  )
};

const AdminAttendanceScreen = () => {
  const [sessions, setSessions] = useState();

  const getSessions = async () => {
    const userToken = await getData('user_token');
    const url = '/session/getWeekSessions';
    const body = {
      userToken: userToken
    }
    const result = await fetchPost(url, body);
    setSessions(result.sessions);
  }
  
  useEffect(() => {
    getSessions();
  }, []);

  return (
    <StyledContainer>
      <HeaderDetail title={'출석'} />
      {sessions?.map((item, index) => (
        <WeekContainer key={index} week={index + 1} item={item} />
      ))}
    </StyledContainer>
  )
}


export default AdminAttendanceScreen