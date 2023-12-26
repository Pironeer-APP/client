import { getData } from "./api/asyncStorage";
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
    const res = await client.post(url, { token: token });
    console.log(res);
  } catch (error) {
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

// 다음 세션 찾기
export const findNextSession = async (sessions) => {
  const userToken = await getData('user_token');
  for (let i = 0; i < sessions.length; i++) {
    const sessionAttendsLen = await client.post('/attend/getSessionAttend', {userToken: userToken, session_id: sessions[i].session_id});
    if (sessionAttendsLen.len == 0) {
      // 확정된 출결이 없는 경우
      return sessions[i];
    }
  }
  // 못 찾았다면
  return null;
}

  /*
    과제 데이터가 due_date 내림차순 정렬이므로 데이터 끝에서부터 확인
    다가오는 과제인지 지나간 과제인지 계산
    1. 현재 시간과 due_date를 비교
    2. due_date가 이후 날짜라면 다음에 주어지는 과제
    3. 해당 데이터의 인덱스를 기억, flatlist 렌더링 시 참고
  */

// 다음 과제 찾기
export const findNextAssign = (schedules) => {
  const now = new Date();
  for (let i = schedules.length - 1; i >= 0; i--) {
    const standard = new Date(schedules[i].due_date);
    if (now < standard) {
      return {
        nextSchedule: schedules[i],
        scheduleCnt: i,
      }
    }
  }
  // 못 찾았다면
  return {
    nextSchedule: null,
    scheduleCnt: 0,
  }
}

  /*
    프로그레스
    1. 각 item의 created_at에서 시간을 0분 0초로 맞춘다
    2. 전체 제한 기간 limit = due_date - 변환된 created_at
    3. 남은 기간 status = due_date - now
    4. progress = status / limit
  */
 
// 프로그레스 계산
export const calcProgress = (created_at, due_date) => {
  const createdAt = new Date(created_at);
  // 생성 시각을 정확하게 고정
  createdAt.setMinutes(0);
  createdAt.setSeconds(0);

  const dueDate = new Date(due_date);
  const now = new Date();

  const limit = dueDate - createdAt;
  const status = dueDate - now;
  const progress = status / limit;

  return {
    limit, status, progress
  }
}

export const convertTime = (timeLimitSec) => {
  let hour = String(Math.trunc(timeLimitSec / 60 / 60));
  let min = String(Math.trunc(timeLimitSec / 60 % 60));
  let sec = String(Math.trunc(timeLimitSec % 60));
  if (hour.length === 1) hour = '0' + hour;
  if (min.length === 1) min = '0' + min;
  if (sec.length === 1) sec = '0' + sec;

  return {
    hour,
    min,
    sec
  }
}