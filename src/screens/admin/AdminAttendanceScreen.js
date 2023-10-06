import {View, Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {COLORS} from '../../assets/Theme';
import {StyledSubText, StyledText} from '../../components/Text';
import StyledContainer from '../../components/StyledContainer';
import HeaderDetail from '../../components/Header';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AdminAttendanceDetailScreen from './AdminAttendanceDetailScreen';
import Gap, {GapH} from '../../components/Gap';
import useUserInfo from '../../use-userInfo';
import {fetchPost, getData} from '../../utils';
import {MainButton} from '../../components/Button';

const DateContainer = styled.View`
  border-radius: 12px;
  padding: 10px;
`;

const DateBox = props => {
  const navigation = useNavigation();
  // 세션 월, 일 변수 할당
  const month = props.date.month;
  const day = props.date.day;

  // 오늘 일정인지
  let isToday = false;
  const today = new Date();
  if (
    Number(today.getMonth().toLocaleString()) + 1 === Number(month) &&
    Number(today.getDate().toLocaleString()) === Number(day)
  ) {
    isToday = true;
  }

  return (
    <TouchableOpacity
      style={{flex: 1, marginRight: 20}}
      onPress={() =>
        navigation.navigate({
          name: 'AdminAttendanceDetailScreen',
          params: {month: month, day: day, session_id: props.date.session_id},
        })
      }>
      <DateContainer
        style={{
          justifyContent: 'center',
          backgroundColor: isToday ? COLORS.green : COLORS.gray,
        }}>
        <StyledText
          content={month}
          fontSize={35}
          color={isToday ? 'black' : 'white'}
        />
        <StyledText
          content={day}
          fontSize={35}
          color={isToday ? 'black' : 'white'}
        />
      </DateContainer>
    </TouchableOpacity>
  );
};

const WeekContainer = props => {
  return (
    <View style={{paddingHorizontal: 15, marginBottom: 25}}>
      <View style={{marginBottom: 5}}>
        <StyledSubText content={`Week ${props.week}`} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: -20,
        }}>
        {props.item?.map((date, index) => {
          return <DateBox key={index} date={date} />;
        })}
      </View>
    </View>
  );
};

const AdminAttendanceScreen = () => {
  const [sessions, setSessions] = useState();
  const [sessionForHighlight, setSessionForHighlight] = useState();
  const [isToday, setIsToday] = useState(false);
  const [codeText, setCodeText] = useState("출석코드 생성");
  const [mainCodeText, setMainCodeText] = useState("오늘 세션 출결관리");
  const [attenCheckNumber, setAttenCheckNumber] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);

  // 이미 생성된 출석 코드가 있는지 확인
  const getTodayCode = async () => {
    const userToken = await getData('user_token');
    const url = '/attend/getCode';
    const body = {userToken};

    const res = await fetchPost(url, body);
    if(res.code) {
      setMainCodeText(res.code.code);
      setCodeText(res.code.code);
    }
  }
  useEffect(() => {
    getTodayCode();
  }, []);

  const getSessionsByWeek = async () => {
    const userToken = await getData('user_token');
    const url = '/session/getWeekSessions';
    const body = {
      userToken: userToken,
    };
    const result = await fetchPost(url, body);
    // console.log(result.sessions);
    setSessions(result.sessions);
  };

  const getSessions = async () => {
    const userToken = await getData('user_token');
    const url = '/session/getSessions';
    const body = {
      userToken: userToken,
    };
    const result = await fetchPost(url, body);
    console.log('result: ', result.sessions);
    setSessionForHighlight(result.sessions);
  };
  
  useEffect(() => {
    getSessionsByWeek();
    getSessions();
  }, []);
  
  // 오늘세션 있는지 확인
  const checkToday = () => {
    const today = new Date();
    let month = today.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let day = today.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    if (sessionForHighlight) {
      sessionForHighlight.map(session => {
        console.log(session);
        if (session.month == month && session.day == day) {
          setIsToday(true);
        }
      });
    }
  }

  useEffect(() => {
    checkToday();
  }, [sessionForHighlight]);

  //출석코드 생성 함수
  const onPressGenerateCode = async () => {
    const userToken = await getData('user_token');
    const url = '/attend/generateCode';
    const body = {
      token: userToken,
    };
    const code = await fetchPost(url, body);
    setCodeText(code.code);
    setMainCodeText(code.code);
  };

  //출석 저장 함수
  const onPressConfirmAttend = async() => {
    const userToken = await getData('user_token');
    const url = '/attend/confirmAttend';
    const body = {
      token: userToken,
    }
    const result = await fetchPost(url, body);
    setAttenCheckNumber(result.part);
  }

  //출결 종료 함수
  const onPressEndAttend = async() => {
    const userToken = await getData('user_token');
    const url = '/attend/endAttend';
    const body = {
      token: userToken,
    }
    const result = await fetchPost(url, body);
    console.log(result);
  }

  //모달 띄우고 접고
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  return (
    <StyledContainer>
      <HeaderDetail title={'출석'} />
      <ScrollView>
        {sessions?.map((item, index) => (
          <WeekContainer key={index} week={index + 1} item={item} />
        ))}
      </ScrollView>
      {!!isToday ? (
        <View>
          <View style={{marginBottom: 20}}>
            <MainButton
              height={60}
              content={mainCodeText}
              onPress={toggleModal}
            />
          </View>
          {/* 출결관리 모달 */}
          <Modal 
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          style={styles.centeredView}
          >
            <View style={styles.modalView}>
              <MainButton
                height={60}
                content={codeText}
                onPress={onPressGenerateCode}
              />
              <MainButton
                height={60}
                content={`출결 ${attenCheckNumber}차 저장`}
                onPress={onPressConfirmAttend}
              />
              <MainButton
                height={60}
                content={'출결 종료'}
                onPress={onPressEndAttend}
              />
            </View>
          </Modal>
        </View>
      ) : (
        <></>
      )}
    </StyledContainer>
  );
};

//스타일시트
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: `${COLORS.gray}`,
    width: 300,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    gap: 20,
    position: 'absolute',
  },
});

export default AdminAttendanceScreen;
