import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { fetchPost, getData, storeData } from '../utils';

export default function useAdminDepositDetail() {
  const [couponInfo, setCouponInfo] = useState([]);
  const [depositHistory, setDepositHistory] = useState([]);
  const [oneUserInfo, setOneUserInfo] = useState({});

  const getDepositHistory = async (userInfo) => {
    const url = '/admin/getDepositHistory';
    const body = userInfo;
    const res = await fetchPost(url, body);
    setDepositHistory(res.histories);
  }
  const getCouponInfo = async (userInfo) => {
    const url = '/admin/getCoupons';
    const body = userInfo;
    const res = await fetchPost(url, body);
    setCouponInfo(res.couponInfo);
  }
  const getOneUserInfo = async (userInfo) => {
    const url = '/admin/getOneUserInfo';
    const body = userInfo;
    const res = await fetchPost(url, body);
    setOneUserInfo(res.oneUserInfo);
  }
  return {
    depositHistory,
    couponInfo,
    oneUserInfo,
    getDepositHistory,
    getCouponInfo,
    getOneUserInfo,
  }
}