import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { fetchPost } from '../utils';

export default function useLogin() {
  const [phoneId, setPhoneId] = useState('');
  const [password, setPassword] = useState('');

  const onPressFetchData = async () => {
    const url = '/auth/login';
    const body = {
      phone: phoneId,
      password: password
    }
    const fetchData = await fetchPost(url, body);
    console.log(fetchData);
  }

  return {
    phoneId,
    password,
    setPhoneId,
    setPassword,
    onPressFetchData
  }
}