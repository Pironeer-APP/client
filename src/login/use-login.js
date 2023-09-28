import { useState } from 'react'
import { autoHyphen, fetchPost } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useLogin() {
  const [phoneId, setPhoneId] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(true);

  const onChangePhoneId = (value) => {
    value = autoHyphen(value);
    setPhoneId(value);
  }

  const onPressLogin = async (navigation) => {
    const url = '/auth/login';
    const body = {
      phone: phoneId,
      password: password
    }
    try {
      const fetchData = await fetchPost(url, body);
      console.log('info...', fetchData.token); // 로그인 정보 token, 불일치면 {token: false}
      if (fetchData.token === false) {
        setLoginStatus(false);
      } else {
        setLoginStatus(true);
        const jsonUserInfo = JSON.stringify(fetchData.token);
        await AsyncStorage.setItem('user_token', jsonUserInfo);
        navigation.replace('SplashScreen');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return {
    phoneId,
    password,
    loginStatus,
    onChangePhoneId,
    setPassword,
    onPressLogin,
  }
}