import {StyleSheet, Text, View, FlatList, Animated, Easing, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import StyledContainer from '../components/StyledContainer';
import HeaderDetail from '../components/Header';
import { dayOfWeek, fetchPost, getData } from '../utils';
import useUserInfo from '../use-userInfo';
import { Box } from '../components/Box';
import { ProgressBar, RowView } from './HomeScreen';
import { StyledSubText, StyledText } from '../components/Text';
import { COLORS } from '../assets/Theme';
import  Gap, { GapH } from '../components/Gap';
import { MainButton } from '../components/Button';
import IsFaceBox from '../components/IsFaceBox';
import Modal from 'react-native-modal';
import Codepad from '../components/Codepad';

//데이터 날짜순으로 배열하기
function compareDates(a, b) {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateA - dateB; 
}

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

const InProgressAttendBox = (props) => {
  const today = new Date();
  const month = props.date.getMonth() + 1;
  const day = props.date.getDate();
  const dayOfTheWeek = dayOfWeek(props.date.getDay());
  let hour = props.date.getUTCHours();
  const minute = props.date.getUTCMinutes();
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
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginVertical: 15,
      }}>
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
          <View style={{flex: 1}} />
          <View>
            {(today.getMonth() + 1) === month && today.getDate() === day ? (
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
          <StatusLine />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
        }}>
        <Box>
          <View style={{paddingHorizontal: 17, paddingVertical: 10}}>
            <RowView style={{marginBottom: 10}}>
              <StyledSubText content={`${month}.${dayWithZero} ${dayOfTheWeek}`} />
              <IsFaceBox isFace={props.isFace} />
            </RowView>
            <StyledText content={props.title} fontSize={20} />
            <Gap height={14}/>
            {props.isFace === 1 ? (<>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image 
                  source={require('../assets/images/location_icon.png')} 
                  style={{width: 15, height: 15}}
                  resizeMode='contain' 
                />
                <GapH width={9} />
                <StyledSubText content={props.location} />
              </View>
              <Gap height={8} /></>
            ) : null }
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image 
                source={require('../assets/images/time_icon.png')} 
                style={{width: 15, height: 15}}
                resizeMode='contain' 
              />
              <GapH width={9} />
              <StyledSubText content={`${hour}:${minute}`} />
            </View>
          </View>
        </Box>
      </View>
    </View>
  );
};
const DoneAttendBox = (props) => {
  const month = props.date.getMonth() + 1;
  let day = props.date.getDate();
  const dayOfTheWeek = dayOfWeek(props.date.getDay());

  if (day < 9) {
    day = '0' + day;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}>
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
          <RowView style={{marginBottom: 10}}>
            <View style={{ alignItems: 'center' }}>
              <StyledText content={`${month}.${day}`} fontSize={20} />
              <StyledText content={dayOfTheWeek} fontSize={20} />
            </View>
            <View style={{flex: 1, marginLeft: 20}}>
              <StyledText content={props.title} fontSize={20} />
            </View>
          </RowView>
        </View>
      </View>
    </View>
  )
};

const renderAttenItem = ({item}) => {
  const today = new Date();
  const todayNoTime = today.setHours(0, 0, 0, 0);
  const sessionDate = new Date(item.date);
  let sessionDateNoTime = new Date(sessionDate);
  sessionDateNoTime.setHours(0, 0, 0, 0);

  if (todayNoTime <= sessionDateNoTime) { //현재+미래의 세션
    return (
      <InProgressAttendBox
        status={item.attend_id}
        title={item.title}
        date={sessionDate}
        location={item.location}
        isFace={item.is_face}
        attenType={item.type}
      />
    )
  } else if (todayNoTime > sessionDateNoTime) { //과거의 세션
    return (
      <DoneAttendBox
        status={item.attend_id}
        title={item.title}
        date={sessionDate}
        attenType={item.type}
      />
    )
  }
};

const AttendanceScreen = () => {
  const [attendance, setAttendance] = useState([]);
  const {userInfoFromServer, getUserInfoFromServer} = useUserInfo();
  const [initialScrollIndex, setInitialScrollIndex] = useState(0);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };

  useEffect(() => {
    getUserInfoFromServer();
  }, []);

  //현재 진행중인 세션 인덱스 찾기


  // const isFocused = useIsFocused();

  const userSessionInfo = async userInfoFromServer => {
    const userToken = await getData('user_token');
    const url = `/attend/getSessionAndAttend`;
    const body = {
      userToken: userToken,
    };
    try {
      const fetchAttenData = await fetchPost(url, body);
      const sortedData = fetchAttenData.sessions.slice().sort(compareDates).reverse();
      setAttendance(sortedData);

      //데이터 안 세션들 중에서 오늘 날짜와 동일한 날짜인 세션 인덱스 찾기
      sortedData.map((item, index) => {
        const today = new Date();
        const sessionDate = new Date(item.date);
        if (today.getMonth() === sessionDate.getMonth() && today.getDate() === sessionDate.getDate()) {
          setInitialScrollIndex(index);
        }
      });
      // setInitialScrollIndex(6);
      // console.log('받은 데이터: ', attendance);
    } catch (error) {
      console.log('에러 발생: ', error);
    }
  };
  useEffect(() => {
    userSessionInfo(userInfoFromServer);
  }, [userInfoFromServer]);



  return (
    <StyledContainer>
      <HeaderDetail title={'출석'} />
      <View style={{flex: 1}}>
        <FlatList
          data={attendance}
          renderItem={renderAttenItem}
          keyExtractor={item => item.session_id}
          initialScrollIndex={initialScrollIndex}
        />
      </View>
      <View style={{ zIndex: 999, marginBottom: 20, marginHorizontal: 10 }}>
        <MainButton height={60} content={'출석하기'} onPress={toggleBottomSheet}/>
      </View>
      {/* 출석코드입력 모달 */}
      <Modal 
        isVisible={isBottomSheetVisible}
        onBackdropPress={toggleBottomSheet}
        style={{ justifyContent: 'flex-end', margin: 0 }}
        >
          <View style={styles.modalContainer}>
            <Codepad />
          </View>
        </Modal>
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
});
