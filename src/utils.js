import { Platform } from "react-native";
import { _ANDROID_AVD_API_HOST, _IOS_API_HOST } from "./variables";

export const onPressHome = (navigation) => {
  navigation.navigate('Home');
}
export const autoHyphen = (value) => {
  const newValue = value
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
  return newValue;
}
const getAPIHost = () => {
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
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if(res.ok) {
      const result = await res.json();
      return result;
    }
  } catch(error) {
    return error;
  }
}