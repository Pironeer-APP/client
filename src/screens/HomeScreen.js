import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Animated,
  Linking,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {COLORS} from '../assets/Theme';
import styled from 'styled-components/native';
import {StyledSubText, StyledText} from '../components/Text';
import {Box} from '../components/Box';
import {RightArrowBtn, UnTouchableRightArrow} from '../components/Button';
import StyledContainer from '../components/StyledContainer';
import Gap, {GapH} from '../components/Gap';
import useUserInfo from '../use-userInfo';
import {fetchPost, getData} from '../utils';
import useProgress from '../use-progress';
import {TinyLoader} from '../components/Loader';

// import messaging from '@react-native-firebase/messaging';

const Header = () => (
  <View>
    <Image
      source={require('../assets/images/headerLogo.png')}
      style={{width: 50, height: 50}}
    />
  </View>
);

export const RowView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StyledProgressBar = styled.View`
  height: 5px;
  background-color: ${COLORS.icon_gray};
  margin-right: 10px;
  border-radius: 5px;
  overflow: hidden;
  margin-top: ${Platform.OS === 'android' ? '5px' : 0};
  flex: 1;
`;

export const ProgressBar = ({status}) => {
  // width - (width - finalValue)
  const [width, setWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    // finalValue가 100을 넘어가지 않도록
    if(status > 1) {
      status = 1;
    }
    const finalValue = Math.floor(width * status);

    Animated.timing(animatedValue, {
      toValue: -(width - finalValue),
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [status, width]);

  return (
    <StyledProgressBar
      onLayout={e => {
        const newWidth = e.nativeEvent.layout.width;
        setWidth(newWidth);
      }}>
      <Animated.View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: '100%',
          backgroundColor: `${COLORS.green}`,
          transform: [
            {
              translateX: animatedValue,
            },
          ],
        }}
      />
    </StyledProgressBar>
  );
};

const HomeScreen = ({navigation}) => {  
  // status bar 색상설정
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('black');
    }
    StatusBar.setBarStyle('light-content');
  }, []);

  const isFocused = useIsFocused();

  const {userInfoFromServer, getUserInfoFromServer} = useUserInfo();

  useEffect(() => {
    getUserInfoFromServer();
  }, [isFocused]);

  const goToAsgnmt = () => {
    userInfoFromServer.is_admin === 1
      ? navigation.navigate('AdminAssignmentScreen', {
          userLevel: userInfoFromServer.level,
        })
      : navigation.navigate('AssignmentScreen');
  };
  const goToAnncmt = () => {
    navigation.navigate('AnnouncementScreen', {userInfo: userInfoFromServer});
  };
  const goToDeposit = () => {
    navigation.navigate('DepositScreen');
  };
  const goToAtndnc = () => {
    //관리자인 경우 출석페이지
    if (!!userInfoFromServer.is_admin) {
      navigation.navigate('AdminAttendanceScreen');
    }
    // 일반회원인 경우 출석페이지
    else {
      navigation.navigate('AttendanceScreen');
    }
  };
  const goToAddUser = () => {
    navigation.navigate('AddUserScreen');
  };
  const goToSession = () => {
    navigation.navigate('AdminSessionScreen');
  };

  /*
    프로그레스 계산
    1. /assign/readAssign/all 경로로 요청, 모든 과제 가져옴(생성시각 오름차순)
    2. 과제 중 현재 시간보다 늦은 과제 포착
    2-1. 전체 과제 개수 - 해당 과제까지의 인덱스 = 다음 과제 개수
    3. 해당 과제의 created_at을 10:00:00으로 맞추고
    4. 변환된 created_at과 due_date의 차이가 limit
    5. now와 due_date의 차이가 status
    6. progress = status / limit
  */

  const [limit, setLimit] = useState();
  const [status, setStatus] = useState();
  const [homeProgress, setHomeProgress] = useState(NaN);

  // 3-5번
  const calcProgress = (next_assign) => {
    const created_at = new Date(next_assign?.created_at);
    // 생성 시각을 정확하게 고정
    created_at.setHours(10);
    created_at.setMinutes(0);
    created_at.setSeconds(0);

    const due_date = new Date(next_assign?.due_date);
    const now = new Date();

    setLimit(due_date - created_at);
    setStatus(due_date - now);
  }

  const [nextAssign, setNextAssgin] = useState();
  const [assignCnt, setAssignCnt] = useState();

  // 2번
  const findNextAssign = (assigns) => {
    const now = new Date();
    for(let assign of assigns) {
      const assign_due_date = new Date(assign.due_date);
      if(now <= assign_due_date) {
        setNextAssgin(assign);
        setAssignCnt(assigns.length - assign.NewAssignId + 1); // 10개 데이터 중 8번째가 다음 과제. 남은 건 다음 과제까지 포함해서 1 더함
        break;
      }
    }
  }

  // 1번
  const getAssigns = async () => {
    const userToken = await getData('user_token');
    const url = '/assign/getAssigns';
    const body = {userToken};
    const res = await fetchPost(url, body);
    
    findNextAssign(res.data);
  }

  useEffect(() => {
    getAssigns();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      calcProgress(nextAssign);
      setHomeProgress(status / limit);
    }, 1000);
  }, [status]);

  // 프로그레스 로딩
  const [isTimerLoading, setIsTimerLoading] = useState(false);

  useEffect(() => {
    isNaN(homeProgress) ? setIsTimerLoading(true) : setIsTimerLoading(false);
  }, [homeProgress]);

  const {convertTime} = useProgress();

  const {hour, min, sec} = convertTime(Math.trunc(status / 1000));

  const curTitle =
    assignCnt > 1
      ? `${nextAssign?.title} 외 ${assignCnt - 1}개`
      : nextAssign?.title;

  return (
    <StyledContainer>
      <View style={{padding: 20}}>
        <ScrollView>
          <Header />
          <Gap />
          <StyledText
            content={`${userInfoFromServer.level}기 ${userInfoFromServer.name}님 \n환영합니다`}
            fontSize={24}
          />
          <Gap />
          <Box>
            <TouchableOpacity style={{padding: 20}} onPress={goToAsgnmt}>
              <RowView style={{marginBottom: 10}}>
                <StyledText
                  content={userInfoFromServer.is_admin ? '과제 관리' : '과제'}
                  fontSize={24}
                />
                <UnTouchableRightArrow />
              </RowView>

              {assignCnt > 0 ? (
                <>
                  <StyledText content={curTitle} fontSize={18} />
                  <RowView style={{marginTop: 10}}>
                    <ProgressBar
                      status={homeProgress ? homeProgress : 1}
                    />

                    {!!isTimerLoading ? (
                      <View
                        style={{
                          width: 90,
                          alignItems: 'center',
                        }}>
                        <TinyLoader />
                      </View>
                    ) : (
                      <View
                        style={{
                          width: 90,
                          justifyContent: 'flex-end',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <StyledText
                          content={`${hour}:${min}:${sec}`}
                          fontSize={16}
                        />
                      </View>
                    )}
                    <GapH width={5} />
                    <Image
                      source={require('../assets/icons/timer.png')}
                      style={{width: 15, height: 15}}
                    />
                  </RowView>
                </>
              ) : (
                <StyledSubText content="진행중인 과제가 없습니다." />
              )}
            </TouchableOpacity>
          </Box>
          <Gap />
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                gap: 20,
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: `${COLORS.gray}`,
                  borderRadius: 15,
                }}
                onPress={goToAtndnc}>
                <View>
                  <View
                    style={{
                      padding: 20,
                      flex: 1,
                    }}>
                    <StyledText content={'출석체크'} />
                    <Image
                      source={require('../assets/icons/calendar.png')}
                      style={{width: 40, height: 40, marginTop: 10}}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <View style={{gap: 20, flex: 1}}>
                <Box>
                  <TouchableOpacity style={{padding: 20}} onPress={goToDeposit}>
                    <StyledText content={'보증금'} />
                    <Image
                      source={require('../assets/icons/money.png')}
                      style={{width: 30, height: 30, marginTop: 10}}
                    />
                  </TouchableOpacity>
                </Box>
                <Box style={{height: 350}}>
                  <TouchableOpacity style={{padding: 20}} onPress={goToAnncmt}>
                    <StyledText content={'공지'} fontSize={24} />
                    <Image
                      source={require('../assets/icons/announce.png')}
                      style={{width: 30, height: 30, marginTop: 10}}
                    />
                  </TouchableOpacity>
                </Box>
              </View>
            </View>
          </View>
          <Gap />
          {/* 관리자일 때만 보이는 */}
          {!!userInfoFromServer.is_admin && (
            <>
              <View style={{gap: 20, flex: 1, flexDirection: 'row'}}>
                <View style={styles.middleBox}>
                  <TouchableOpacity style={{padding: 20}} onPress={goToAddUser}>
                    <StyledText content={'회원등록'} fontSize={24} />
                    <Image
                      source={require('../assets/icons/person-add.png')}
                      style={{width: 30, height: 30, marginTop: 10}}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.middleBox}>
                  <TouchableOpacity style={{padding: 20}} onPress={goToSession}>
                    <StyledText content={'세션일정'} fontSize={24} />
                    <Image
                      source={require('../assets/icons/session-timeout.png')}
                      style={{width: 30, height: 30, marginTop: 10}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <Gap />
            </>
          )}
          {/* <StyledText content={'더보기'} fontSize={20} /> */}
          <RowView>
            <View
              style={{flex: 1, height: 1, backgroundColor: COLORS.icon_gray}}
            />
            <Image
              source={require('../assets/images/headerLogo.png')}
              style={{width: 22, height: 22, margin: 10}}
            />
            <View
              style={{flex: 1, height: 1, backgroundColor: COLORS.icon_gray}}
            />
          </RowView>
          <Gap />
          <Box>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://pirogramming.com/')}>
              <RowView style={{padding: 20}}>
                <StyledText content={'공식 홈페이지 바로가기'} fontSize={20} />
                <UnTouchableRightArrow />
              </RowView>
            </TouchableOpacity>
          </Box>
          <Gap />
          <Box>
            <TouchableOpacity>
              <RowView style={{padding: 20}}>
                <StyledText content={'노션 바로가기'} fontSize={20} />
                <UnTouchableRightArrow />
              </RowView>
            </TouchableOpacity>
          </Box>
          <Gap />
          <Box>
            <TouchableOpacity>
              <RowView style={{padding: 20}}>
                <StyledText content={'피로스퀘어 바로가기'} fontSize={20} />
                <UnTouchableRightArrow />
              </RowView>
            </TouchableOpacity>
          </Box>
          <Gap />
          <View
            style={{
              width: 'auto',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Box style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => navigation.push('Settings')}>
                <RowView style={{padding: 20}}>
                  <Image
                    source={require('../assets/icons/settings.png')}
                    style={{width: 20, height: 20}}
                  />
                  <View style={{width: 10}} />
                  <StyledText content={'설정'} fontSize={20} />
                </RowView>
              </TouchableOpacity>
            </Box>
          </View>
          <Gap height={50} />
        </ScrollView>
      </View>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  middleBox: {
    flex: 1,
    backgroundColor: COLORS.gray,
    borderRadius: 15,
  },
});

export default HomeScreen;
