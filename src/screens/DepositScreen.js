import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import HeaderDetail from '../components/Header';
import StyledContainer from '../components/StyledContainer';
import DepositHistory from '../deposit/DepositHistory';
import useDepositDetail from '../deposit/use-depositDetail';
import DepositHistoryHeader from '../deposit/DepositHistoryHeader';
import useUserInfo from '../use-userInfo';
import AdminDepositList from '../deposit/AdminDepositList';

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

  return (
    <StyledContainer>
      <HeaderDetail title={!!userInfoFromServer.is_admin ? '보증금 관리' : `${userInfoFromServer.name}님의 보증금 관리`} />
      {!!userInfoFromServer.is_admin && (
        <AdminDepositList />
      )}
      {!userInfoFromServer.is_admin && (
        <StyledContainer>
          <DepositHistoryHeader
            userInfo={userInfoFromServer}
            couponInfo={couponInfo}
          />
          <DepositHistory
            depositHistory={depositHistory}
          />
        </StyledContainer>
      )}
    </StyledContainer>
  );
};

export default DepositScreen;