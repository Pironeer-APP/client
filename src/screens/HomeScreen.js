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
`;
export const ProgressBar = props => (
  <StyledProgressBar>
    <View
      style={{
        flexDirection: 'row',
        width: `${props.status}`,
        height: '100%',
        backgroundColor: `${COLORS.green}`,
      }}></View>
  </StyledProgressBar>
);

const HomeScreen = ({navigation}) => {
  // status bar 색상설정
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('black');
  }
  StatusBar.setBarStyle('light-content');
  const isFocused = useIsFocused();

  const {userToken, userInfoFromServer, getUserToken, getUserInfoFromServer} =
    useUserInfo();

  useEffect(() => {
    getUserToken();
  }, []);
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

  return (
    <StyledContainer>
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
            <StyledText content={'Arsha 클론코딩하기'} fontSize={20} />
            <RowView style={{marginTop: 10}}>
              <View style={{width: '50%'}}>
                <ProgressBar status={'30%'} />
              </View>
              <StyledText content={'남은 시간 18:38:43'} fontSize={16} />
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
