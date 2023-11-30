import {
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import HeaderDetail from '../components/Header';
import StyledContainer from '../components/StyledContainer';
import DepositHistory from '../deposit/DepositHistory';
import useDepositDetail from '../deposit/use-depositDetail';
import DepositHistoryHeader from '../deposit/DepositHistoryHeader';
import AdminDepositList from '../deposit/AdminDepositList';
import {COLORS} from '../assets/Theme';
import {StatusBar} from 'react-native';
import styled from 'styled-components';
import { client } from '../api/client';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccount, selectAccount } from '../features/account/accountSlice';
import { MediumLoader } from '../components/Loader';

const DepositScreen = () => {
  const dispatch = useDispatch();
  const accountStatus = useSelector(state => state.account.status);
  const account = useSelector(selectAccount);

  const {depositHistory, couponInfo, getDepositHistory, getCouponInfo} =
    useDepositDetail();

  useEffect(() => {
    getDepositHistory();
  }, []);
  useEffect(() => {
    getCouponInfo();
  }, []);

  const UseCoupon = async () => {
    const url = '/deposit/useCoupon';
    body = {
      userId: account.user_id
    };
    if (couponInfo.length === 0) {
      Alert.alert('사용 가능한 보증금 방어권이 없습니다.');
    } else if (account.deposit >= 120000) {
      Alert.alert('보증금 12만원은 보증금 방어권을 사용하실 수 없습니다.');
    } else {
      const res = await client.post(url, body);
      Alert.alert('사용되었습니다.');
      getDepositHistory();
      dispatch(fetchAccount());
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
      {accountStatus === 'loading' ? (
        <StyledContainer>
          <MediumLoader />
        </StyledContainer>
      ) : !!account.is_admin ? (
        <StyledContainer>
          <HeaderDetail title={'보증금 관리'} />
          <AdminDepositList adminInfo={account} />
        </StyledContainer>
      ) : (
        <Container>
          <StatusBar backgroundColor={COLORS.deposit_header_blue} />
          <HeaderDetail
            title={`${account.name}님의 보증금 관리`}
            backgroundColor={COLORS.deposit_header_blue}
            color={'white'}
          />

          <StyledContainer>
            <DepositHistoryHeader
              userInfo={account}
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
