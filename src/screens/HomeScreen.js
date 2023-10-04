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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {COLORS} from '../assets/Theme';
import styled from 'styled-components/native';
import {StyledText} from '../components/Text';
import {Box} from '../components/Box';
import {RightArrowBtn} from '../components/Button';
import StyledContainer from '../components/StyledContainer';
import Gap from '../components/Gap';
import useUserInfo from '../use-userInfo';
import {fetchPost, getData} from '../utils';
import useProgress from '../use-progress';

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
export const ProgressBar = props => (
  <StyledProgressBar>
    <View
      style={{
        flexDirection: 'row',
        width: `${props.status}`,
        height: '100%',
        backgroundColor: `${COLORS.green}`,
      }}
    />
  </StyledProgressBar>
);

const HomeScreen = ({navigation}) => {
  // status bar 색상설정
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('black');
  }
  StatusBar.setBarStyle('light-content');
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

  const [curAssign, setCurAssign] = useState();
  const [curAssignCnt, setCurAssignCnt] = useState();
  const [recentAssign, setRecentAssign] = useState();
  // 다가오는 과제
  // 지나간 과제 하나
  const getCurrentRecentAssigns = async () => {
    const userToken = await getData('user_token');
    const cUrl = '/assign/getCurrentAssigns';
    const body = {userToken};
    const cRes = await fetchPost(cUrl, body);

    setCurAssign(cRes.currentAssign);
    setCurAssignCnt(cRes.currentAssignCnt);

    const rUrl = '/assign/getRecentAssign';
    const rRes = await fetchPost(rUrl, body);

    setRecentAssign(rRes.recentAssign);
  };
  useEffect(() => {
    getCurrentRecentAssigns();
  }, []);

  // 프로그레스 계산
  const [assignLimit, setAssignLimit] = useState();
  const [assignProgress, setAssignProgress] = useState();
  const [homeProgress, setHomeProgress] = useState();
  const getProgress = () => {
    const now = new Date();
    const cAssign = new Date(curAssign?.due_date);
    const rAssign = new Date(recentAssign?.due_date);

    setAssignLimit(cAssign.getTime() - rAssign.getTime());
    setAssignProgress(cAssign.getTime() - now.getTime());

    setHomeProgress(Math.trunc((assignProgress / assignLimit) * 100));
  };
  useEffect(() => {
    setTimeout(() => {
      getProgress();
    }, 1000);
  });

  const {convertTime} = useProgress();

  const {hour, min, sec} = convertTime(Math.trunc(assignProgress / 1000));

  const curTitle =
    curAssignCnt > 1
      ? `${curAssign?.title} 외 ${curAssignCnt - 1}개`
      : curAssign?.title;

  return (
    <StyledContainer>
      <View style={{padding: 20}}>
        <ScrollView>
          <Header />
          <Gap />
          <StyledText
            content={`${userInfoFromServer.level}기 ${userInfoFromServer.name}님 \n오늘은 대면 세션 날이에요`}
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
                <RightArrowBtn />
              </RowView>
              <StyledText content={curTitle} fontSize={20} />
              <RowView style={{marginTop: 10}}>
                <ProgressBar status={`${homeProgress ? homeProgress : 100}%`} />
                <StyledText content={`${hour}:${min}:${sec}`} fontSize={16} />
              </RowView>
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
          <StyledText
            content={'피로그래밍을 알차게 즐기고 싶다면?'}
            fontSize={20}
          />
          <Gap />
          <Box>
            <TouchableOpacity>
              <RowView style={{padding: 20}}>
                <StyledText content={'공식 홈페이지 바로가기'} fontSize={20} />
                <RightArrowBtn />
              </RowView>
            </TouchableOpacity>
          </Box>
          <Gap />
          <Box>
            <TouchableOpacity>
              <RowView style={{padding: 20}}>
                <StyledText content={'노션 바로가기'} fontSize={20} />
                <RightArrowBtn />
              </RowView>
            </TouchableOpacity>
          </Box>
          <Gap />
          <Box>
            <TouchableOpacity>
              <RowView style={{padding: 20}}>
                <StyledText content={'피로스퀘어 바로가기'} fontSize={20} />
                <RightArrowBtn />
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
