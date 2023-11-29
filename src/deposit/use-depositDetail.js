import { useState } from 'react'
import { client } from '../api/client';
import { getData } from '../api/asyncStorage';

export default function useDepositDetail() {
  const [couponInfo, setCouponInfo] = useState([]);
  const [depositHistory, setDepositHistory] = useState([]);

  const getDepositHistory = async () => {
    const userToken = await getData('user_token');
    const url = '/deposit/getDepositHistory';
    const body = {userToken};
    const res = await client.post(url, body);
    setDepositHistory(res.histories);
  }

  const getDepositHistoryAdmin = async (adminToken, userInfo) => {
    const url = '/deposit/getDepositHistoryAdmin';
    const body = {
      userToken: adminToken,
      userInfo: userInfo
    };
    const res = await client.post(url, body);
    setDepositHistory(res.histories);
  }

  const getCouponInfo = async () => {
    const userToken = await getData('user_token');
    const url = '/deposit/getCoupons';
    const body = {userToken};
    const res = await client.post(url, body);
    setCouponInfo(res.couponInfo);
  }

  const getCouponInfoAdmin = async (adminToken, userInfo) => {
    const url = '/deposit/getCouponsAdmin';
    const body = {
      userToken: adminToken,
      userInfo: userInfo
    };
    const res = await client.post(url, body);
    setCouponInfo(res.couponInfo);
  }
  return {
    depositHistory,
    couponInfo,
    getDepositHistory,
    getCouponInfo,
    getDepositHistoryAdmin,
    getCouponInfoAdmin,
  }
}