import { useState } from 'react'
import { fetchPost, getData } from '../utils';

export default function useAdminDeposit() {
  const [userList, setUserList] = useState([]);

  const fetchData = async () => {
    const adminToken = await getData('user_token');
    const url = '/admin/getUserInfo';
    const body = {
      token: adminToken
    }
    const res = await fetchPost(url, body);
    setUserList(res.userInfoList);
  }

  return {
    userList,
    fetchData
  }
}