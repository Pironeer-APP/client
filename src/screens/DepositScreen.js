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
    userToken,
    userInfoFromServer,
    getUserToken,
    getUserInfoFromServer
  } = useUserInfo();
  
  const {
    depositHistory,
    couponInfo,
    getDepositHistory,
    getCouponInfo,
  } = useDepositDetail();
  
  useEffect(() => {
    getUserToken();
  }, []);
  useEffect(() => {
    getUserInfoFromServer(userToken);
  }, [userToken]);

  useEffect(() => {
    getDepositHistory(userToken);
  }, []);
  useEffect(() => {
    getCouponInfo(userToken);
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

const styles = StyleSheet.create({});
