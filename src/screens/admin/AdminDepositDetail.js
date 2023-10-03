import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {useRoute} from '@react-navigation/native';

import HeaderDetail from '../../components/Header';
import StyledContainer from '../../components/StyledContainer';
import BottomSheetModal from '../../components/BottomSheetModal';
import {StyledText} from '../../components/Text';
import {CouponButton, MainButton} from '../../components/Button';
import Gap from '../../components/Gap';
import {fetchPost} from '../../utils';
import DepositHistory from '../../deposit/DepositHistory';
import useDepositDetail from '../../deposit/use-depositDetail';
import DepositHistoryHeader from '../../deposit/DepositHistoryHeader';
import useUserInfo from '../../use-userInfo';
import {COLORS} from '../../assets/Theme';

export default function AdminDepositDetail() {
  const route = useRoute();
  const userInfo = route.params.userInfo;

  const [selected, setSelected] = useState(false);
  const onPressSelectCoupon = () => {
    setSelected(!selected);
  };

  const {depositHistory, couponInfo, getDepositHistory, getCouponInfo} =
    useDepositDetail();

  useEffect(() => {
    getDepositHistory(userInfo);
  }, []);

  useEffect(() => {
    getCouponInfo(userInfo);
  }, []);

  const onPressAddCoupon = async () => {
    if (!selected) {
      Alert.alert('방어권을 선택해 주세요', '', [{text: '확인'}]);
      return;
    }
    const url = '/deposit/addCoupon';
    const body = {
      user_id: userInfo.user_id,
    };
    const res = await fetchPost(url, body);
    getCouponInfo(userInfo);
    console.log(res);
  };

  const {userToken, getUserToken} = useUserInfo();

  useEffect(() => {
    getUserToken();
  }, []);

  const deleteCoupon = async coupon_id => {
    console.log(coupon_id);
    const url = '/deposit/deleteCoupon';
    const body = {
      adminToken: userToken,
      coupon_id: coupon_id,
    };
    const res = await fetchPost(url, body);
    console.log(res);
    getCouponInfo(userInfo);
  };

  const onPressDeleteBadge = coupon_id => {
    Alert.alert(
      `${userInfo.name}의 보증금 방어권 하나를 삭제하시겠습니까?`,
      '',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteCoupon(coupon_id)},
      ],
    );
  };

  return (
    <>
      <StyledContainer
        style={{backgroundColor: `${COLORS.deposit_header_blue}`}}>
        <HeaderDetail
          title={`${userInfo.name}님의 보증금 관리`}
          backgroundColor={COLORS.deposit_header_blue}
          color={'white'}
        />
        <DepositHistoryHeader
          userInfo={userInfo}
          couponInfo={couponInfo}
          onPressDeleteBadge={onPressDeleteBadge}
        />

        <DepositHistory depositHistory={depositHistory} />
      </StyledContainer>
      <BottomSheetModal>
        {/* 여기에 모달 내용 담기 */}
        <StyledText content="직접 관리하기" fontSize={18} />
        <View style={styles.couponContainer}>
          <CouponButton
            selected={selected}
            content="보증금 방어권"
            onPress={onPressSelectCoupon}
          />
        </View>
        <MainButton height={60} content="추가하기" onPress={onPressAddCoupon} />
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  couponContainer: {
    width: '100%',
    alignItems: 'center',
  },
});
