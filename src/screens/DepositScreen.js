import {
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import HeaderDetail from '../components/Header';
import StyledContainer from '../components/StyledContainer';
import DepositHistory from '../deposit/DepositHistory';
import useDepositDetail from '../deposit/use-depositDetail';
import DepositHistoryHeader from '../deposit/DepositHistoryHeader';
import useUserInfo from '../use-userInfo';
import AdminDepositList from '../deposit/AdminDepositList';
import {COLORS} from '../assets/Theme';
import {StatusBar} from 'react-native';
import styled from 'styled-components';
import { client } from '../api/client';

const DepositScreen = () => {
  const {userInfoFromServer, getUserInfoFromServer} = useUserInfo();

  const {depositHistory, couponInfo, getDepositHistory, getCouponInfo} =
    useDepositDetail();

  useEffect(() => {
    console.log('1');
    getUserInfoFromServer();
  }, []);

  useEffect(() => {
    getDepositHistory();
  }, []);
  useEffect(() => {
    console.log('2');
    getCouponInfo();
  }, []);

  const UseCoupon = async () => {
    const url = '/deposit/useCoupon';
    body = {userId: userInfoFromServer.user_id};
    if (couponInfo.length === 0) {
      Alert.alert('사용 가능한 보증금 방어권이 없습니다.');
    } else if (userInfoFromServer.deposit >= 120000) {
      Alert.alert('보증금 12만원은 보증금 방어권을 사용하실 수 없습니다.');
    } else {
      const res = await client.post(url, body);
      Alert.alert('사용되었습니다.');
      console.log('3');
      getDepositHistory();
      getUserInfoFromServer();
      getCouponInfo();
    }
  };

  const onPressUseCoupon = () => {
    Alert.alert(`보증금 방어권을 사용하시겠습니까?`, '', [
      {
        text: '취소',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => UseCoupon()},
    ]);
  };
  return (
    <>
      {!!userInfoFromServer.is_admin && (
        <StyledContainer>
          <HeaderDetail title={'보증금 관리'} />
          <AdminDepositList adminInfo={userInfoFromServer} />
        </StyledContainer>
      )}
      {!userInfoFromServer.is_admin && (
        <Container>
          <StatusBar backgroundColor={COLORS.deposit_header_blue} />
          <HeaderDetail
            title={`${userInfoFromServer.name}님의 보증금 관리`}
            backgroundColor={COLORS.deposit_header_blue}
            color={'white'}
          />

          <StyledContainer>
            <DepositHistoryHeader
              userInfo={userInfoFromServer}
              couponInfo={couponInfo}
              onPressUseCoupon={onPressUseCoupon}
            />
            <DepositHistory depositHistory={depositHistory} />
          </StyledContainer>
        </Container>
      )}
    </>
  );
};
const Container = styled.SafeAreaView`
  background-color: ${COLORS.deposit_header_blue};
  flex: 1;
`;
export default DepositScreen;
