import {
  StyleSheet,
  View,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import StyledContainer from '../components/StyledContainer';
import HeaderDetail from '../components/Header';
import {dayOfWeek, findNextSession} from '../utils';
import {Box} from '../components/Box';
import {RowView} from './HomeScreen';
import {StyledSubText, StyledText} from '../components/Text';
import {COLORS} from '../assets/Theme';
import Gap, {GapH} from '../components/Gap';
import {MainButton} from '../components/Button';
import IsFaceBox from '../components/IsFaceBox';
import Modal from 'react-native-modal';
import Codepad from '../components/Codepad';
import {MediumLoader} from '../components/Loader';
import {AsgContainer} from './AssignmentScreen';
import OnAirCircle from '../components/OnAirCircle';
import { client } from '../api/client';
import { getData } from '../api/asyncStorage';
import useClientTime from '../use-clientTime';

//데이터 날짜순으로 배열하기

const AttendStatusCircle = ({type = null}) => {
  let imageSource;
  if (type === '결석') {
    imageSource = require(`../assets/icons/circle_ex.png`);
  } else if (type === '출석') {
    imageSource = require(`../assets/icons/circle_donggrami.png`);
  } else if (type === '지각') {
    imageSource = require(`../assets/icons/circle_semo.png`);
  } else {
    imageSource = require(`../assets/icons/circle_none.png`);
  }
  return (
    <View>
      <Image source={imageSource} style={{width: 30, height: 30}} />
    </View>
  );
};

const StatusLine = () => {
  return (
    <View style={{backgroundColor: `${COLORS.icon_gray}`, width: 1, flex: 1}} />
  );
};

const InProgressAttendBox = props => {
  const {
    renderYear,
    renderMonth,
    renderDate,
    renderDay,
    renderHour,
    renderMinute,
    renderMillisec,
  } = useClientTime(props.date);
  return (
    <AsgContainer
      style={{
        gap: 20,
      }}>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
          }}>
          {/*  {title === firstItem ? <View style={{flex: 1}} /> : <StatusLine />} */}
          <StatusLine />
          <OnAirCircle />
          {/*  {title === firstItem ? <View style={{flex: 1}} /> : <StatusLine />} */}
          <StatusLine />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          marginVertical: 10,
        }}>
        <Box>
          <View style={{paddingHorizontal: 17, paddingVertical: 10}}>
            <RowView style={{marginBottom: 10}}>
              <StyledSubText
                content={`${renderMonth}.${renderDate} ${renderDay}`}
              />
              <IsFaceBox isFace={props.isFace} />
            </RowView>
            <StyledText content={props.title} fontSize={20} />
            <Gap height={14} />
            {props.isFace === 1 ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingRight: 30,
                  }}>
                  <Image
                    source={require('../assets/images/location_icon.png')}
                    style={{width: 15, height: 15}}
                    resizeMode="contain"
                  />
                  <GapH width={9} />
                  <StyledSubText content={props.location} />
                </View>
                <Gap height={5} />
              </>
            ) : null}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../assets/images/time_icon.png')}
                style={{width: 15, height: 15}}
                resizeMode="contain"
              />
              <GapH width={9} />
              <StyledSubText
                content={`${renderHour}:${renderMinute}`}
              />
            </View>
          </View>
        </Box>
      </View>
    </AsgContainer>
  );
};
const DoneAttendBox = props => {
  const {
    renderYear,
    renderMonth,
    renderDate,
    renderDay,
    renderHour,
    renderMinute,
    renderMillisec,
  } = useClientTime(props.date);
  return (
    <AsgContainer>
      <View
        style={{
          flexDirection: 'column',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
          }}>
          <StatusLine />
          <AttendStatusCircle type={props.attenType} />
          <StatusLine />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
        }}>
        <View style={{padding: 20}}>
          <RowView style={{marginVertical: 10}}>
            <View style={{alignItems: 'center'}}>
              <StyledSubText
                content={`${renderMonth}.${renderDate}`}
                fontSize={20}
              />
              <StyledSubText content={renderDay} fontSize={20} />
            </View>
            <View style={{flex: 1, marginLeft: 20}}>
              <StyledText content={props.title} fontSize={18} />
            </View>
          </RowView>
        </View>
      </View>
    </AsgContainer>
  );
};

const AttendanceScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [attendance, setAttendance] = useState([]);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isTodaySession, setIsTodaySession] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [codeConfirmed, setCodeConfirmed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [nextSession, setNextSession] = useState(null);
  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };
  // 로딩화면

  //현재 진행중인 세션 인덱스 찾기

  const userSessionInfo = async () => {
    setRefreshing(true);
    const userToken = await getData('user_token');
    const url = `/attend/getSessionAndAttend`;
    const body = {
      userToken: userToken,
    };
    try {
      const fetchAttendData = await client.post(url, body);
      setAttendance(fetchAttendData.sessions);
      setIsLoading(false);
      setRefreshing(false);

      // 오늘 세션있는지 확인
      const today = new Date();
      const month = String(Number(today.getMonth()) + 1).padStart(2, '0');
      const day = String(Number(today.getDate())).padStart(2, '0');
      fetchAttendData.sessions.map(session => {
        if (month == session.month && day == session.day) {
          setIsTodaySession(true);
        }
      });

    } catch (error) {
      console.log('에러 발생: ', error);
    }
  };
  
  useEffect(() => {
    userSessionInfo();
  }, []);
  useEffect(() => {
    setNextSession(findNextSession(attendance));
  }, [attendance])

  const renderAttendItem = ({item}) => {
    return (
      <>
      {nextSession?.cnt >= item.cnt ? (
        <InProgressAttendBox
          status={item.attend_id}
          title={item.title}
          date={item.date}
          location={item.location}
          isFace={item.is_face}
          attenType={item.type}
        />
      ) : (
        <DoneAttendBox
          status={item.attend_id}
          title={item.title}
          date={item.date}
          attenType={item.type}
        />
      )}
      </>
    )
  }

  const [codes, setCodes] = useState('');

  //출석코드 일치 확인
  const confirmCode = async () => {
    const userToken = await getData('user_token');
    const url = `/attend/addAttend`;
    const body = {
      token: userToken,
      input_code: codes,
      // input_code: 1234
    };
    const attenResult = await client.post(url, body);
    setCodeConfirmed(attenResult.result);
    setBottomSheetVisible(!isBottomSheetVisible);
    setTimeout(() => {
      setModalVisible(true);
    }, 1000);
    setTimeout(() => {
      setModalVisible(false);
    }, 3000);
    console.log('btm', isBottomSheetVisible);
    console.log('mod', isModalVisible);
    setCodes('');
  };

  return (
    <StyledContainer>
      <HeaderDetail title={'출석'} />
      {!!isLoading ? (
        <MediumLoader />
      ) : (
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <FlatList
              style={{paddingRight: 20, paddingLeft: 10}}
              data={attendance}
              renderItem={renderAttendItem}
              keyExtractor={item => item.session_id}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={userSessionInfo}
                  tintColor={COLORS.green}
                />
              }
            />
            {/* 오늘 세션이 있는 경우에만 출석하기 버튼 나타남  */}
            {!!isTodaySession ? (
              <View
                style={{paddingHorizontal: 20}}
              >
                <MainButton
                  height={60}
                  content={'출석하기'}
                  onPress={toggleBottomSheet}
                  marginBottom={0}
                />
              </View>
            ) : null}
          </View>

          {/* 출석코드입력 모달 */}
          <Modal
            isVisible={isBottomSheetVisible}
            onBackdropPress={toggleBottomSheet}
            style={{justifyContent: 'flex-end', margin: 0}}>
            <View style={styles.modalContainer}>
              <Codepad
                confirmCode={confirmCode}
                codes={codes}
                setCodes={setCodes}
              />
            </View>
          </Modal>

          {/* 출석성공실패 모달 */}
          <Modal
            isVisible={isModalVisible}
            // onBackdropPress={toggleModal}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            style={styles.centeredView}>
            <View style={styles.modalView}>
              {!!codeConfirmed ? (
                <>
                  <Image
                    source={require('../assets/images/attend_success.png')}
                    resizeMode="contain"
                    style={{width: 120, height: 120}}
                  />
                  <StyledText content={'출석 성공'} fontSize={25} />
                </>
              ) : (
                <>
                  <Image
                    source={require('../assets/images/attend_failed.png')}
                    resizeMode="contain"
                    style={{width: 120, height: 120}}
                  />
                  <StyledText content={'출석 실패'} fontSize={25} />
                </>
              )}
            </View>
          </Modal>
        </View>
      )}
    </StyledContainer>
  );
};

export default AttendanceScreen;

const styles = StyleSheet.create({
  isFaceBox: {
    width: 77,
    height: 25,
    // paddingVertical: 10,
    // paddingHorizontal: 5,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  isFaceText: {
    color: 'black',
    fontSize: 16,
  },
  modalContainer: {
    backgroundColor: `${COLORS.gray}`,
    padding: 16,
    minHeight: 500,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.bg_black,
  },
  loadingTextContainer: {
    height: 100,
  },
  loadingText: {
    color: 'white',
    fontSize: 20,
  },
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
  onAirCircleBack: {
    width: 20,
    height: 20,
    backgroundColor: COLORS.green,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  onAirCircle: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.green,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.textColor,
  }
});
