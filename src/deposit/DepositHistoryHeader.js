import { View, Text, StyleSheet } from 'react-native'
import React, {useEffect} from 'react'
import { StyledText } from '../components/Text'
import CouponElement from './CouponElement'
import useUserInfo from '../use-userInfo'

export default function DepositHistoryHeader(props) {
  const {
    userInfoFromServer,
    getUserInfoFromServer
  } = useUserInfo();

  useEffect(() => {
    getUserInfoFromServer();
  }, []);

  return (
    <View style={styles.center}>
      <StyledText content="보증금 현황" fontSize={20} />
      <View style={styles.row}>
        <StyledText
          content={userInfoFromServer?.deposit?.toLocaleString('en')}
          fontSize={40} />
        <StyledText
          content="원"
          fontSize={40} />
      </View>
      {/* 뱃지 */}
      <View style={styles.row}>
        {props.couponInfo?.map((coupon) => (
          <CouponElement key={coupon.coupon_id} coupon={coupon} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  }
})