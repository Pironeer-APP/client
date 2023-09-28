import { useState } from 'react'
import { fetchPost } from '../utils';

export default function useDepositDetail() {
  const [couponInfo, setCouponInfo] = useState([]);
  const [depositHistory, setDepositHistory] = useState([]);

  const getDepositHistory = async (userInfo) => {
    const url = '/deposit/getDepositHistory';
    const body = {userInfo};
    const res = await fetchPost(url, body);
    setDepositHistory(res.histories);
  }
  const getCouponInfo = async (userInfo) => {
    const url = '/deposit/getCoupons';
    const body = {userInfo};
    const res = await fetchPost(url, body);
    setCouponInfo(res.couponInfo);
  }
  return {
    depositHistory,
    couponInfo,
    getDepositHistory,
    getCouponInfo,
  }
}