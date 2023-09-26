import {useState} from 'react';
import { getData } from './utils';

export default function useUserInfo() {
  const [userInfo, setUserInfo] = useState({});
  
  const getUserInfo = async () => {
    const storageUserInfo = await getData('user_info');
    setUserInfo(storageUserInfo);
  }

  return {
    userInfo,
    getUserInfo,
  }
}