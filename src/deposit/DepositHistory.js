import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, {useEffect} from 'react'
import StyledContainer from '../components/StyledContainer'
import { StyledText } from '../components/Text'
import useAdminDepositDetail from './use-adminDepositDetail';
import { RowView } from '../screens/HomeScreen';
import CouponElement from './CouponElement';
import HistoryElement from './HistoryElement';

export default function DepositHistory({userInfo}) {
  const {
    depositHistory,
    couponInfo,
    oneUserInfo,
    getDepositHistory,
    getCouponInfo,
    getOneUserInfo,
  } = useAdminDepositDetail();
  
  useEffect(() => {
    getDepositHistory(userInfo);
  }, []);
  useEffect(() => {
    getCouponInfo(userInfo);
  }, []);
  useEffect(() => {
    getOneUserInfo(userInfo);
  }, []);

  // 보증금 계산 로직은 필요 없음 => 출결 상황에 따라 userInfo.deposit이 update될 예정
  // 따라서 새로고침의 구현을 위해 userInfo는 여기서 fetch로 받아와야 함

  // 출결 이력과 과제 이력을 합쳐야 함

  return (
    <View style={styles.container}>
      <View style={styles.center}>
      <StyledText content="보증금 현황" fontSize={20} />
      </View>
      <View style={styles.center}>
      <StyledText
        content={oneUserInfo?.deposit?.toLocaleString('en')}
        fontSize={40} />
      <StyledText
        content="원"
        fontSize={40} />
      </View>
      {/* 뱃지 */}
      <View>
      {couponInfo?.map((coupon) => (
        <CouponElement key={coupon.coupon_id} coupon={coupon} />
      ))}
      </View>
      {/* 이력 */}
      <View>
      <ScrollView>
        {depositHistory?.map((history) => (
          <HistoryElement key={history.SEQ} history={history} />
        ))}
      </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 50,
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
})