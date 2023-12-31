import { useState } from 'react'
import { client } from '../api/client';
import { getData } from '../api/asyncStorage';

export default function useAdminDeposit() {
  const [userList, setUserList] = useState([]);

  const fetchData = async (userToken) => {
    const url = '/admin/getUserInfo';
    const body = { userToken };
    const res = await client.post(url, body);
    setUserList(res.userInfoList);
  }

  return {
    userList,
    fetchData
  }
}