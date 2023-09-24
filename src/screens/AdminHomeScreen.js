import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS } from '../assets/Theme';
import styled from 'styled-components/native';
import { StyledText } from '../components/Text';
import { Box } from '../components/Box';
import { getData } from '../utils';
import { RightArrowBtn } from '../components/Button';

const StyledContainer = styled.SafeAreaView`
  background-color: black;
  flex: 1;
  padding: ${Platform.OS === 'android' ? '20px' : 0};
`;

const Header = () => (
  <View>
    <Image
      source={require('../assets/images/headerLogo.png')}
      style={{ width: 50, height: 50 }}
    />
  </View>
);

const RowView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Gap = () => <View style={{ height: 20 }}></View>;

const StyledProgressBar = styled.View`
  height: 10px;
  background-color: ${COLORS.icon_gray};
  flex: 1;
  margin-right: 10px;
  margin-top: ${Platform.OS === 'android' ? '5px' : 0};
`;
const ProgressBar = props => (
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

const AdminHomeScreen = ({navigation}) => {
  // 관리자 정보 가져오기
  const [adminInfo, setAdminInfo] = useState({});
  const getAdminInfo = async () => {
    const adminData = await getData('user_info');
    setAdminInfo(adminData);
  }
  useEffect(() => {
    getAdminInfo();
  }, []);

  // 프로그레스
  const [time, setTime] = useState('18:32:48');

  return (
    <StyledContainer>
      <ScrollView>
        <Header />
        <Gap />
        <StyledText
          content={`${adminInfo.name}님 \n오늘은 대면 세션 날이에요`}
          fontSize={24}
        />
        <Gap />
        <Box>
          <TouchableOpacity style={{ padding: 20 }}>
            <RowView style={{ marginBottom: 10 }}>
              <StyledText content={'과제 채점'} fontSize={24} />
              <RightArrowBtn />
            </RowView>
            <StyledText content={'Arsha 클론코딩하기'} fontSize={20} />
            <RowView style={{ marginTop: 10 }}>
              <ProgressBar status={'30%'} />
              <StyledText content={`남은 시간 ${time}`} fontSize={16} />
            </RowView>
          </TouchableOpacity>
        </Box>
        <Gap />
        <View style={{flex: 1, marginBottom: 20}}>
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
              }}>
              <View>
                <View
                  style={{
                    padding: 20,
                    flex: 1,
                  }}>
                  <StyledText content={'출석체크'} fontSize={24} />
                  <Image
                    source={require('../assets/icons/calendar.png')}
                    style={{width: 40, height: 40, marginTop: 10}}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <View style={{gap: 20, flex: 1}}>
              <Box>
                <TouchableOpacity style={{padding: 20}}>
                  <StyledText content={'보증금'} fontSize={24} />
                  <Image
                    source={require('../assets/icons/money.png')}
                    style={{width: 30, height: 30, marginTop: 10}}
                  />
                </TouchableOpacity>
              </Box>
              <Box style={{height: 350}}>
                <TouchableOpacity style={{padding: 20}}>
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
        <View style={{ gap: 20, flex: 1, flexDirection: 'row' }}>
          <View style={styles.middleBox}>
            <TouchableOpacity style={{ padding: 20 }} onPress={() => {navigation.push('AddUserScreen')}}>
              <StyledText content={'회원등록'} fontSize={24} />
              <Image
                source={require('../assets/icons/person-add.png')}
                style={{ width: 30, height: 30, marginTop: 10 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.middleBox}>
            <TouchableOpacity style={{ padding: 20 }}>
              <StyledText content={'세션일정'} fontSize={24} />
              <Image
                source={require('../assets/icons/session-timeout.png')}
                style={{ width: 30, height: 30, marginTop: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Gap />
        <StyledText
          content={'피로그래밍을 알차게 즐기고 싶다면?'}
          fontSize={20}
        />
        <Gap />
        <Box>
          <TouchableOpacity>
            <RowView style={{ padding: 20 }}>
              <StyledText content={'공식 홈페이지 바로가기'} fontSize={20} />
              <RightArrowBtn />
            </RowView>
          </TouchableOpacity>
        </Box>
        <Gap />
        <Box>
          <TouchableOpacity>
            <RowView style={{ padding: 20 }}>
              <StyledText content={'노션 바로가기'} fontSize={20} />
              <RightArrowBtn />
            </RowView>
          </TouchableOpacity>
        </Box>
        <Gap />
        <Box>
          <TouchableOpacity>
            <RowView style={{ padding: 20 }}>
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
          <Box style={{ flexDirection: 'row' }}>
            <TouchableOpacity>
              <RowView style={{ padding: 20 }}>
                <Image
                  source={require('../assets/icons/settings.png')}
                  style={{ width: 20, height: 20 }}
                />
                <View style={{ width: 10 }} />
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
  progressTextBox: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  middleBox: {
    flex: 1,
    backgroundColor: COLORS.gray,
    borderRadius: 15,
  }
})

export default AdminHomeScreen;