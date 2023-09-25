import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import HeaderDetail from '../components/Header';
import StyledContainer from '../components/StyledContainer';
import DepositHistory from '../deposit/DepositHistory';
import useDepositDetail from '../deposit/use-depositDetail';
import DepositHistoryHeader from '../deposit/DepositHistoryHeader';
import useUserInfo from '../use-userInfo';

const DepositScreen = () => {
  const {
    userInfo,
    getUserInfo,
  } = useUserInfo();
  
  useEffect(() => {
    getUserInfo();
  }, []);

  const {
    depositHistory,
    couponInfo,
    oneUserInfo,
    getDepositHistory,
    getCouponInfo,
    getOneUserInfo,
  } = useDepositDetail();
  
  useEffect(() => {
    getDepositHistory(userInfo);
  }, []);
  useEffect(() => {
    getCouponInfo(userInfo);
  }, []);
  useEffect(() => {
    getOneUserInfo(userInfo);
  }, []);

  return (
    <StyledContainer>
      <HeaderDetail title={`${userInfo.name}님의 보증금 관리`} />
      <StyledContainer>
        <DepositHistoryHeader
          oneUserInfo={oneUserInfo}
          couponInfo={couponInfo}
        />
        <DepositHistory
          depositHistory={depositHistory}
        />
      </StyledContainer>
    </StyledContainer>
  );
};

export default DepositScreen;

const styles = StyleSheet.create({});
