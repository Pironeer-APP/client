import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HeaderDetail from '../../components/Header';
import StyledContainer from '../../components/StyledContainer';
import BottomSheetModal from '../../components/BottomSheetModal';
import { StyledText } from '../../components/Text';
import { CouponButton, MainButton } from '../../components/Button';
import Gap from '../../components/Gap';
import { fetchPost } from '../../utils';
import DepositHistory from '../../deposit/DepositHistory';
import useDepositDetail from '../../deposit/use-depositDetail';
import DepositHistoryHeader from '../../deposit/DepositHistoryHeader';

export default function AdminDepositDetail({ route }) {
  const userInfo = route.params.userInfo;
  const [selected, setSelected] = useState('');
  const onPressSelectCoupon = (content) => {
    setSelected(content);
  }
  const navigation = useNavigation();

  const onPressAddCoupon = async () => {
    if(selected === '') {
      Alert.alert('면제권을 선택해 주세요', '', [
        {text: '확인'},
      ]);
      return;
    }
    const price = selected === "과제면제권" ? 20000 : 10000;
    const url = '/admin/addCoupon';
    const body = {
      user_id: userInfo.user_id,
      type: selected,
      money: price
    };
    const res = await fetchPost(url, body);
    console.log(res);
    navigation.replace('AdminDepositDetail', {userInfo: userInfo});
  }

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
    <>
    <StyledContainer>
      <HeaderDetail title={`${userInfo.name}님의 보증금 관리`} />
      <DepositHistoryHeader
        oneUserInfo={oneUserInfo}
        couponInfo={couponInfo}
      />
      <DepositHistory
        depositHistory={depositHistory}
      />
    </StyledContainer>
    <BottomSheetModal>
      {/* 여기에 모달 내용 담기 */}
      <StyledText content="직접 관리하기" fontSize={18} />
      <View style={styles.couponContainer}>
        <CouponButton selected={selected} content="과제면제권" onPress={() => onPressSelectCoupon("과제면제권")} />
        <Gap height={20} />
        <CouponButton selected={selected} content="지각면제권" onPress={() => onPressSelectCoupon("지각면제권")} />
        <Gap height={20} />
        <CouponButton selected={selected} content="특별면제권" onPress={() => onPressSelectCoupon("특별면제권")} />
      </View>
      <MainButton height={60} content="추가하기" onPress={onPressAddCoupon} />
    </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  couponContainer: {
    width: '100%',
    alignItems: 'center'
  },
})