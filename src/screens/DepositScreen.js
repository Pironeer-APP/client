import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import HeaderDetail from '../components/Header';
import StyledContainer from '../components/StyledContainer';
import DepositHistory from '../deposit/DepositHistory';
import useDepositDetail from '../deposit/use-depositDetail';
import DepositHistoryHeader from '../deposit/DepositHistoryHeader';
import useUserInfo from '../use-userInfo';
import AdminDepositList from '../deposit/AdminDepositList';
import { useRoute } from '@react-navigation/native';

const DepositScreen = () => {
  const route = useRoute();
  const userInfo = route.params.userInfo;

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
      <HeaderDetail title={!!userInfo.is_admin ? '보증금 관리' : `${userInfo.name}님의 보증금 관리`} />
      {!!userInfo.is_admin && (
        <AdminDepositList />
      )}
      {!userInfo.is_admin && (
        <StyledContainer>
          <DepositHistoryHeader
            oneUserInfo={oneUserInfo}
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
