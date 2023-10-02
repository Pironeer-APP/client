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

//데이터 날짜순으로 배열하기
function compareDates(a, b) {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateA - dateB; 
}

const AttenStatusCircle = ({grade = 4}) => {
  let imageSource;
  if (grade == 0) {
    imageSource = require(`../assets/icons/circle_ex.png`);
  } else if (grade == 3) {
    imageSource = require(`../assets/icons/circle_donggrami.png`);
  } else if (grade == 1 || grade == 2) {
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

const IsFaceBox = (props) => {
  if (props.isFace === 0) {
    return (
      <View style={[styles.isFaceBox, {backgroundColor: COLORS.green}]}>
        <Text style={styles.isFaceText}>ONLINE</Text>
      </View>
    )
  } else if (props.isFace === 1) {
    return (
      <View style={[styles.isFaceBox, {backgroundColor: 'skyblue'}]}>
        <Text style={styles.isFaceText}>OFFLINE</Text>
      </View>
    )
  }
};

const InProgressAttendBox = (props) => {
  const month = props.date.getMonth() + 1;
  let day = props.date.getDate();
  const dayOfTheWeek = dayOfWeek(props.date.getDay());
  let hour = props.date.getUTCHours();
  const minute = props.date.getUTCMinutes();


  if (day < 9) {
    day = '0' + day;
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
            <Animated.Image
              source={require('../assets/icons/circle_onair.png')}
              style={{
                width: 50,
                height: 50,
                transform: [{scale}], // 크기 애니메이션 적용
              }}
            />
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
              <StyledSubText content={`${month}.${day} ${dayOfTheWeek}`} />
              <IsFaceBox isFace={props.isFace} />
            </RowView>
            <StyledText content={props.title} fontSize={20} />
            <Gap height={14}/>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image 
                source={require('../assets/images/location_icon.png')} 
                style={{width: 15, height: 15}}
                resizeMode='contain' 
              />
              <GapH width={9} />
              <StyledSubText content={props.location} />
            </View>
            <Gap height={8} />
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
          <AttenStatusCircle grade={1} />
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
  const sessionDate = new Date(item.date);
  // console.log('today: ', today);
  // console.log(sessionDate);
  // console.log(typeof(sessionDate));

  if (today <= sessionDate) { //현재+미래의 세션
    return (
      <InProgressAttendBox
        status={item.attend_id}
        title={item.title}
        date={sessionDate}
        location={item.location}
        isFace={item.is_face}
      />
    )
  } else if (today > sessionDate) { //과거의 세션
    return (
      <DoneAttendBox
        status={item.attend_id}
        title={item.title}
        date={sessionDate}
      />
    )
  }
  return (
    <>
    </>
  );
};

const AttendanceScreen = () => {
  const [attendance, setAttendance] = useState([]);
  const {userInfoFromServer, getUserInfoFromServer} = useUserInfo();

  useEffect(() => {
    getUserInfoFromServer();
  }, []);
  // send user info

  // const isFocused = useIsFocused();

  const saveUserId = async userInfoFromServer => {
    const userToken = await getData('user_token');
    const url = `/attend/getSessionAndAttend`;
    const body = {
      userToken: userToken,
    };
    try {
      const fetchAttenData = await fetchPost(url, body);
      // const attendanceData = attendance["sessions"];
      console.log('데이터: ', fetchAttenData.sessions);
      const sortedData = fetchAttenData.sessions.slice().sort(compareDates).reverse();
      setAttendance(sortedData);
      // console.log('받은 데이터: ', attendance);
    } catch (error) {
      console.log('에러 발생!!');
    }
  };
  useEffect(() => {
    saveUserId(userInfoFromServer);
  }, [userInfoFromServer]);



  return (
    <StyledContainer>
      <HeaderDetail title={'출석'} />
      <View style={{flex: 1}}>
        <FlatList
          data={attendance}
          renderItem={renderAttenItem}
          // keyExtractor={item => item.AssignId}
        />
      </View>
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
    }
});
