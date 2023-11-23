import { client } from "./api/client";
// import messaging from '@react-native-firebase/messaging';

export const autoHyphen = (value) => {
  const newValue = value
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
  return newValue;
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
  const res = await client.post(url, body);
}
// 기기 토큰 서버에 전송
export const sendToken = async (token) => {
  const url = '/fcm/saveToken';
  try {
    const res = await client.post(url, {token: token});
    console.log(res);
  } catch(error) {
    console.log(error);
  }
}

export const localeDate = (dateTime) => {
  let localeDate = new Date(dateTime);
  const year = localeDate.getFullYear();
  const month = Number(localeDate.getMonth()) + 1;
  const day = localeDate.getDate();
  const hour = localeDate.getHours();
  const min = localeDate.getMinutes();
  const sec = localeDate.getSeconds();

  const dateformat = `${year}-${month}-${day} ${hour}:${min}:${sec}`;

  return dateformat;
}

export const getLocal = (datetime) => {
  const itemDate = new Date(datetime);
  
  const month = String(itemDate.getMonth() + 1).padStart(2, '0');
  const date = String(itemDate.getDate()).padStart(2, '0');
  const day = dayOfWeek(itemDate.getDay());
  const hour = String(itemDate.getHours()).padStart(2, '0');
  const min = String(itemDate.getMinutes()).padStart(2, '0');

  return {
    month,
    date,
    day,
    hour,
    min
  }
}