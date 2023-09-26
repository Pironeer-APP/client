import { useState } from 'react'
import { fetchPost } from '../utils';

export default function useDepositDetail() {
  const [couponInfo, setCouponInfo] = useState([]);
  const [depositHistory, setDepositHistory] = useState([]);
  const [oneUserInfo, setOneUserInfo] = useState({});

  const getDepositHistory = async (userInfo) => {
    const url = '/deposit/getDepositHistory';
    const body = userInfo;
    const res = await fetchPost(url, body);
    setDepositHistory(res.histories);
  }
  const getCouponInfo = async (userInfo) => {
    const url = '/deposit/getCoupons';
    const body = userInfo;
    const res = await fetchPost(url, body);
    setCouponInfo(res.couponInfo);
  }
  const getOneUserInfo = async (userInfo) => {
    const url = '/user/getOneUserInfo';
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