import { useState } from 'react'
import { fetchPost } from '../utils';

export default function useDepositDetail() {
  const [couponInfo, setCouponInfo] = useState([]);
  const [depositHistory, setDepositHistory] = useState([]);

  const getDepositHistory = async (token) => {
    const url = '/deposit/getDepositHistory';
    const body = {token};
    const res = await fetchPost(url, body);
    setDepositHistory(res.histories);
  }
  const getCouponInfo = async (token) => {
    const url = '/deposit/getCoupons';
    const body = {token};
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