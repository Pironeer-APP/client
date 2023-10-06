import { useState } from 'react'
import { fetchPost, getData } from '../utils';

export default function useDepositDetail() {
  const [couponInfo, setCouponInfo] = useState([]);
  const [depositHistory, setDepositHistory] = useState([]);

  const getDepositHistory = async () => {
    const userToken = await getData('user_token');
    const url = '/deposit/getDepositHistory';
    const body = {userToken};
    const res = await fetchPost(url, body);
    setDepositHistory(res.histories);
  }

  const getDepositHistoryAdmin = async (userInfo) => {
    const url = '/deposit/getDepositHistoryAdmin';
    const body = {userInfo};
    const res = await fetchPost(url, body);
    setDepositHistory(res.histories);
  }

  const getCouponInfo = async () => {
    const userToken = await getData('user_token');
    const url = '/deposit/getCoupons';
    const body = {userToken};
    const res = await fetchPost(url, body);
    setCouponInfo(res.couponInfo);
  }

  const getCouponInfoAdmin = async (userInfo) => {
    const url = '/deposit/getCouponsAdmin';
    const body = {userInfo};
    const res = await fetchPost(url, body);
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