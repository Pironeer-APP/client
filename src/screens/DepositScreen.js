import {Alert, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import HeaderDetail from '../components/Header';
import StyledContainer from '../components/StyledContainer';
import DepositHistory from '../deposit/DepositHistory';
import useDepositDetail from '../deposit/use-depositDetail';
import DepositHistoryHeader from '../deposit/DepositHistoryHeader';
import useUserInfo from '../use-userInfo';
import AdminDepositList from '../deposit/AdminDepositList';
import {COLORS} from '../assets/Theme';
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

  Platform.OS === 'android' ? StatusBar.setBackgroundColor('yellow') : null;

  const UseCoupon = async () => {
    const url = '/deposit/useCoupon';
    body = {userId: userInfoFromServer.user_id};
    const res = await fetchPost(url, body);
    getCouponInfo(userId);
    console.log(res);
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
    <StyledContainer>
      <StatusBar backgroundColor={COLORS.deposit_header_blue} />
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
            onPressUseCoupon={onPressUseCoupon}
          />
          <DepositHistory depositHistory={depositHistory} />
        </StyledContainer>
      )}
    </StyledContainer>
  );
};

export default DepositScreen;
