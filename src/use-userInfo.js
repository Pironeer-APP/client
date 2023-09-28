import {useState} from 'react';
import { fetchPost, getData } from './utils';

export default function useUserInfo() {
  const [userToken, setUserToken] = useState({});
  const [userInfoFromServer, setUserInfoFromServer] = useState({});
  
  const getUserToken = async () => {
    const storageUserToken = await getData('user_token');
    setUserToken(storageUserToken);
  }

  const getUserInfoFromServer = async () => {
    const storageUserToken = await getData('user_token');
    const url = '/user/getOneUserInfo';
    const body = {userToken: storageUserToken};
    const res = await fetchPost(url, body);

    setUserInfoFromServer(res.oneUserInfo);
  }

  return {
    userToken,
    userInfoFromServer,
    getUserToken,
    getUserInfoFromServer
  }
}