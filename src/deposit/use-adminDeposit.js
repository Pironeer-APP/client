import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { fetchPost, getData } from '../utils';

export default function useAdminDeposit() {
  const [userList, setUserList] = useState([]);

  const fetchData = async () => {
    const adminInfo = await getData('user_info');
    if(adminInfo.is_admin !== 1) return; // 로그인 사용자가 admin이 아닌 경우
    const url = '/admin/getUserInfo';
    const body = {
      level: adminInfo.level // admin의 level(기수)에 해당하는 정보만 가져옴
    }
    const res = await fetchPost(url, body);
    setUserList(res.userInfoList);
  }

  return {
    userList,
    fetchData
  }
}