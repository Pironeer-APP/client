import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import HeaderDetail from '../components/Header';
import StyledContainer from '../components/StyledContainer';
import DepositHistory from '../deposit/DepositHistory';
import useDepositDetail from '../deposit/use-depositDetail';
import DepositHistoryHeader from '../deposit/DepositHistoryHeader';
import useUserInfo from '../use-userInfo';
import AdminDepositList from '../deposit/AdminDepositList';
import {COLORS} from '../assets/Theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';

const DepositScreen = () => {
  const {
    userInfoFromServer,
    getUserInfoFromServer
  } = useUserInfo();
  
  const {
    depositHistory,
    couponInfo,
    getDepositHistory,
    getCouponInfo,
  } = useDepositDetail();
  
  useEffect(() => {
    getUserInfoFromServer();
  }, []);

  useEffect(() => {
    getDepositHistory();
  }, []);
  useEffect(() => {
    getCouponInfo();
  }, []);

  StatusBar.setBackgroundColor('yellow');

  return (
    <StyledContainer>
      <StatusBar />
      {!!userInfoFromServer.is_admin ? (
        <HeaderDetail title={'보증금 관리'} />
      ) : (
        <HeaderDetail
          title={`${userInfoFromServer.name}님의 보증금 관리`}
          backgroundColor={COLORS.deposit_header_blue}
          color={'white'}
        />
      )}
      {!!userInfoFromServer.is_admin && (
        <AdminDepositList adminInfo={userInfoFromServer} />
      )}
      {!userInfoFromServer.is_admin && (
        <StyledContainer>
          <DepositHistoryHeader
            userInfo={userInfoFromServer}
            couponInfo={couponInfo}
          />
          <DepositHistory depositHistory={depositHistory} />
        </StyledContainer>
      )}
    </StyledContainer>
  );
};

export default DepositScreen;
