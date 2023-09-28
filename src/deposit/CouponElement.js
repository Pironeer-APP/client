import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, {useEffect} from 'react'
import { COLORS } from '../assets/Theme'
import { fetchPost } from '../utils';
import useUserInfo from '../use-userInfo';
import useDepositDetail from './use-depositDetail';

export default function CouponElement({coupon, onPressDeleteBadge}) {
  const badgeStyle =
    coupon.type === '과제면제권'
    ? styles.assignBadge
    : coupon.type === '지각면제권'
    ? styles.lateBadge
    : styles.specialBadge;

  return (
    <TouchableOpacity style={styles.badgeContainer} onLongPress={() => onPressDeleteBadge(coupon.coupon_id)}>
    <View style={badgeStyle}>
    </View>
    {/* 텍스트는 지워도 됨 */}
    <Text style={{color: 'red'}}>{coupon.type}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  badgeContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  assignBadge: {
    borderRadius: 100,
    width: 60,
    height: 60,
    margin: 10,
    backgroundColor: COLORS.light_gray,
  },
  lateBadge: {
    borderRadius: 100,
    width: 60,
    height: 60,
    margin: 10,
    backgroundColor: COLORS.green,
  },
  specialBadge: {
    borderRadius: 100,
    width: 60,
    height: 60,
    margin: 10,
    backgroundColor: COLORS.gray,
  },
})