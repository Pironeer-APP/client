import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Platform,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Progress from 'react-native-progress';

import {COLORS} from '../assets/Theme';
import styled from 'styled-components/native';
import {FontStyledText, StyledText} from '../components/Text';
import {Box} from '../components/Box';
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
      style={{width: 50, height: 50}}
    />
  </View>
);

const Gap = () => <View style={{height: 20}}></View>;

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
        <TouchableOpacity onPress={() => {navigation.push('GradeAssignScreen')}}>
        <View style={styles.topBox}>
          <View style={styles.boxContent}>
            <FontStyledText style={styles.boxInnerText}>과제채점</FontStyledText>
            <RightArrowBtn />
          </View>
          <FontStyledText style={styles.assignDesc}>Arsha 클론 코딩</FontStyledText>
          <View style={styles.boxContent}>
            <Progress.Bar
              progress={0.3}
              width={220}
              color={COLORS.green}
              height={10}
              borderRadius={5} />
            <View style={styles.progressTextBox}>
              <FontStyledText style={styles.progressText}>{time}</FontStyledText>
            </View>
          </View>
        </View>
        </TouchableOpacity>
        <Gap />
        <View
          style={{
            flexDirection: 'row',
            gap: 20,
          }}>
          <View style={styles.middleBox}>
            <View style={styles.boxContent}>
              <FontStyledText style={styles.boxInnerText}>출석체크</FontStyledText>
              <RightArrowBtn />
            </View>
          </View>
          <View style={styles.middleBox}>
            <View style={styles.boxContent}>
              <FontStyledText style={styles.boxInnerText}>보증금 관리</FontStyledText>
              <RightArrowBtn />
            </View>
          </View>
        </View>
        <Gap />
        <StyledText
          content={'피로그래밍을 알차게 즐기고 싶다면?'}
          fontSize={20}
        />
        <Gap />
        <Box>
          <StyledText content={'공식 홈페이지 바로가기'} fontSize={20} />
        </Box>
        <Gap />
        <Box>
          <StyledText content={'노션 바로가기'} fontSize={20} />
        </Box>
        <Gap />
        <Box>
          <StyledText content={'피로스퀘어 바로가기'} fontSize={20} />
        </Box>
      </ScrollView>
    </StyledContainer>
  );
};

export default AdminHomeScreen;

const styles = StyleSheet.create({
  topBox: {
    height: 150,
    backgroundColor: COLORS.gray,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  boxInnerText: {
    fontSize: 24,
  },
  boxContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  assignDesc: {
    fontSize: 15
  },
  progressTextBox: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,  
  },
  progressText: {
    fontSize: 18
  },
  middleBox: {
    flex: 1,
    height: 120,
    backgroundColor: COLORS.gray,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
})