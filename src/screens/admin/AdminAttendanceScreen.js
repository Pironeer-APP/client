import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styled from "styled-components/native";
import { COLORS } from "../../assets/Theme";
import { StyledSubText, StyledText } from '../../components/Text';
import StyledContainer from '../../components/StyledContainer';
import HeaderDetail from '../../components/Header';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AdminAttendanceDetailScreen from './AdminAttendanceDetailScreen';


const sessionDates = [
  {"week1": ['12.27', '12.31', '01.02']},
  {"week2": ['01.04', '01.06', '01.08']},
  {"week3": ['01.10', '01.12', '01.15']},
  {"week4": ['01.20', '01.23', '01.25']}
];

// const goToDateAtndnc = () => {
//   navigation.navigate('AdminAttendanceDetailScreen');
// };

const DateContainer = styled.View`
  background-color: ${COLORS.gray};
  width: ${props => props.width};
  height: ${props => props.width};
  border-radius: 12px;
  padding: 10px;
`;

const Date = (props) => {
  const navigation = useNavigation();
  // 세션 월, 일 변수 할당
  const [month, day] = props.date.split('.');
  // 핸드폰 스크린 너비에 따른 날짜상자 크기 정하기
  const screenWidth = Dimensions.get('window').width;
  const boxWidth = (screenWidth - 30) / 3.4;
  return (
    <TouchableOpacity onPress={() => navigation.navigate({name: 'AdminAttendanceDetailScreen', params:{month: month, day: day}})}>
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
        {sessionDates[props.week - 1][`week${props.week}`].map((date, index) => {
          return (
            <Date date={date} />
          )
        })}
      </View>
    </View>
  )
};

const AdminAttendanceScreen = () => {
  return (
    <StyledContainer>
      <HeaderDetail title={'출석'} />
      {sessionDates.map((notForUse, index) => (
        <WeekContainer key={index} week={index + 1} />
      ))}
    </StyledContainer>
  )
}


export default AdminAttendanceScreen