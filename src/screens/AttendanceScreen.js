import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  Easing,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import StyledContainer from '../components/StyledContainer';
import HeaderDetail from '../components/Header';
import {dayOfWeek, fetchPost, getData} from '../utils';
import useUserInfo from '../use-userInfo';
import {Box} from '../components/Box';
import {ProgressBar, RowView} from './HomeScreen';
import {FontStyledText, StyledSubText, StyledText} from '../components/Text';
import {COLORS} from '../assets/Theme';
import Gap, {GapH} from '../components/Gap';
import {MainButton} from '../components/Button';
import IsFaceBox from '../components/IsFaceBox';
import Modal from 'react-native-modal';
import useProgress from '../use-progress';
import Codepad from '../components/Codepad';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderLogo from '../login/HeaderLogo';
import Loader, {MediumLoader, TinyLoader} from '../components/Loader';
import {AsgContainer} from './AssignmentScreen';

//데이터 날짜순으로 배열하기

const AttenStatusCircle = ({type = null}) => {
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
  const today = new Date();
  const month = String(Number(props.date.getMonth()) + 1);
  const day = String(props.date.getDate());
  const dayOfTheWeek = dayOfWeek(props.date.getDay());
  let hour = String(props.date.getUTCHours());
  const minute = String(props.date.getUTCMinutes());
  let dayWithZero = day;

  if (day < 9) {
    dayWithZero = '0' + day;
  }
  // 1 -> 01, 2 -> 02 ...
  if (hour < 10) {
    hour = '0' + hour;
  }

  const [scale] = useState(new Animated.Value(1)); // 초기 크기 1

  useEffect(() => {
    // 크기 애니메이션 설정
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.easeInOut,
          useNativeDriver: false,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          easing: Easing.easeInOut,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);
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
          <View>
            {today.getMonth() + 1 === month && today.getDate() === day ? (
              <Animated.Image
                source={require('../assets/icons/circle_onair.png')}
                style={{
                  width: 50,
                  height: 50,
                  transform: [{scale}], // 크기 애니메이션 적용
                }}
              />
            ) : (
              <AttenStatusCircle type={props.attenType} />
            )}
          </View>
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
                content={`${month.padStart(2, '0')}.${day.padStart(
                  2,
                  '0',
                )} ${dayOfTheWeek}`}
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
                content={`${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`}
              />
            </View>
          </View>
        </Box>
      </View>
    </AsgContainer>
  );
};
const DoneAttendBox = props => {
  const month = String(Number(props.date.getMonth()) + 1);
  let day = String(props.date.getDate());
  const dayOfTheWeek = dayOfWeek(props.date.getDay());

  if (day < 9) {
    day = '0' + day;
  }

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
          <AttenStatusCircle type={props.attenType} />
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
                content={`${month.padStart(2, '0')}.${day.padStart(2, '0')}`}
                fontSize={20}
              />
              <StyledSubText content={dayOfTheWeek} fontSize={20} />
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

const renderAttenItem = ({item}) => {
  const today = new Date();
  const todayNoTime = today.setHours(0, 0, 0, 0);
  const sessionDate = new Date(item.date);
  let sessionDateNoTime = new Date(sessionDate);
  sessionDateNoTime.setHours(0, 0, 0, 0);

  if (todayNoTime <= sessionDateNoTime) {
    //현재+미래의 세션
    return (
      <InProgressAttendBox
        status={item.attend_id}
        title={item.title}
        date={sessionDate}
        location={item.location}
        isFace={item.is_face}
        attenType={item.type}
      />
    );
  } else if (todayNoTime > sessionDateNoTime) {
    //과거의 세션
    return (
      <DoneAttendBox
        status={item.attend_id}
        title={item.title}
        date={sessionDate}
        attenType={item.type}
      />
    );
  }
};

const AttendanceScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [attendance, setAttendance] = useState([]);
  const [initialScrollIndex, setInitialScrollIndex] = useState(0);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isTodaySession, setIsTodaySession] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [codeConfirmed, setCodeConfirmed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };
  // 로딩화면

  //현재 진행중인 세션 인덱스 찾기

  // const isFocused = useIsFocused();

  const userSessionInfo = async () => {
    setRefreshing(true);
    const userToken = await getData('user_token');
    const url = `/attend/getSessionAndAttend`;
    const body = {
      userToken: userToken,
    };
    try {
      const fetchAttenData = await fetchPost(url, body);
      setAttendance(fetchAttenData.sessions);
      setIsLoading(false);
      setRefreshing(false);
      // setInitialScrollIndex(6);
      // console.log('받은 데이터: ', fetchAttenData.sessions);

      // 오늘 세션있는지 확인
      const today = new Date();
      const month = String(Number(today.getMonth()) + 1).padStart(2, '0');
      const day = String(Number(today.getDate())).padStart(2, '0');
      fetchAttenData.sessions.map(session => {
        if (month == session.month && day == session.day) {
          setIsTodaySession(true);
        }
      });

      //데이터 안 세션들 중에서 오늘 날짜와 동일한 날짜인 세션 인덱스 찾기
      setInitialScrollIndex(fetchAttenData.nextSessionIdx);
    } catch (error) {
      console.log('에러 발생: ', error);
    }
  };

  useEffect(() => {
    userSessionInfo();
  }, []);

  // 자동스크롤
  // need to be changed [wonchae]
  // const getItemLayout = (data, index) => {
  //   return {
  //     length: 100,
  //     offset: 100 * data.length,
  //     index,
  //   };
  // };

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
    const attenResult = await fetchPost(url, body);
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
          <View style={{flex: 1, paddingRight: 20, paddingLeft: 10}}>
            <FlatList
              data={attendance}
              renderItem={renderAttenItem}
              keyExtractor={item => item.session_id}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={userSessionInfo}
                  tintColor={COLORS.green}
                />
              }

              // getItemLayout={getItemLayout} // 자동스크롤
              // initialScrollIndex={initialScrollIndex}
            />
            {/* 오늘 세션이 있는 경우에만 출석하기 버튼 나타남  */}
            {!!isTodaySession ? (
              <MainButton
                height={60}
                content={'출석하기'}
                onPress={toggleBottomSheet}
                marginBottom={0}
              />
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
});
