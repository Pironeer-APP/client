import { Platform } from "react-native";
import { _ANDROID_AVD_API_HOST, _IOS_API_HOST } from "./variables";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from '@react-native-firebase/messaging';

export const autoHyphen = (value) => {
  const newValue = value
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
  return newValue;
}
export const getAPIHost = () => {
  if(Platform.OS === 'ios') {
      return _IOS_API_HOST;
  }
  else if(Platform.OS === 'android') {
      return _ANDROID_AVD_API_HOST;
  }
  else {
      throw "Platform not supported";
  }
}

export const fetchPost = async(url, body) => {
  const SERVER_URL = getAPIHost();
  try {
    const res = await fetch(SERVER_URL+url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if(res.ok) {
      const result = await res.json();
      return result;
    } else {
      throw new Error(`Request failed with status ${res.status}`);
    }
  } catch(error) {
    return error;
  }
}
export const fetchGet = async(url) => {
  const SERVER_URL = getAPIHost();
  try {
    const res = await fetch(SERVER_URL+url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if(res.ok) {
      const result = await res.json();
      return result;
    } else {
      throw new Error(`Request failed with status ${res.status}`);
    }
  } catch(error) {
    return error;
  }
}

//async storage
export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch(e) {
    console.log(e);
    return false;
  }
}

//요일 리턴해주는 함수
export const dayOfWeek = (num) => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  return days[num];
}

// 알림
export const pushNoti = async (body) => {
  const url = '/fcm/push';
  const myToken = await messaging().getToken();
  body.myToken = myToken;
  const res = await fetchPost(url, body);
}
// 기기 토큰 서버에 전송
export const sendToken = async (token) => {
  const url = '/fcm/saveToken';
  try {
    const res = await fetchPost(url, {token: token});
    console.log(res);
  } catch(error) {
    console.log(error);
  }
}