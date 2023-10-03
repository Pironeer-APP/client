import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
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
import { MainButton } from '../../components/Button';

const DateContainer = styled.View`
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

  return (
    <TouchableOpacity style={{flex: 1, marginRight: 20}} onPress={() => navigation.navigate({name: 'AdminAttendanceDetailScreen', params:{month: month, day: day, session_id: props.date.session_id}})}>
      <DateContainer style={{ justifyContent:'center', backgroundColor: isToday ? COLORS.green : COLORS.gray}}>
        <StyledText content={month} fontSize={35} color={isToday ? 'black' : 'white'}/>
        <StyledText content={day} fontSize={35} color={isToday ? 'black' : 'white'}/>
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
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginRight: -20}}>
        {props.item?.map((date, index) => {
            return (
              <DateBox key={index} date={date} />
            )
          }
        )}
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

  const onPressGenerateCode = async () => {
    const userToken = await getData('user_token');
    const url = '/attend/generateCode';
    const body = {
      token: userToken,
    }
    const code = await fetchPost(url, body);
    console.log(code);
  }

  return (
    <StyledContainer>
      <HeaderDetail title={'출석'} />
      <ScrollView>
        {sessions?.map((item, index) => (
          <WeekContainer key={index} week={index + 1} item={item} />
        ))}
      </ScrollView>
      <View style={{ zIndex: 999, marginBottom: 20, marginHorizontal: 10 }}>
        <MainButton height={60} content={'출석코드 생성'} onPress={onPressGenerateCode}/>
      </View>
    </StyledContainer>
  )
}


export default AdminAttendanceScreen