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
      console.log('info...', fetchData.data); // 로그인 정보, 불일치면 {data: false}
      if (fetchData.data === false) {
        setLoginStatus(false);
      } else {
        setLoginStatus(true);
        const jsonUserInfo = JSON.stringify(fetchData.data);
        await AsyncStorage.setItem('user_info', jsonUserInfo);
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