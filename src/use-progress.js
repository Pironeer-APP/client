import { View, Text } from 'react-native'
import React, {useState} from 'react'

export default function useProgress() {
  // formatting datetime
  const convertDateTime = (date) => {
    // Date 객체 만들기
    const itemDateTime = new Date(date);

    let itemMonth = String(Number(itemDateTime.getMonth().toLocaleString()) + 1); // toLocaleString으로 지역 시간 반영하기
    let itemDate = itemDateTime.getDate().toLocaleString();

    // 한 자리인 경우 앞에 0 붙이기
    if (itemMonth.length === 1) itemMonth = '0' + itemMonth;
    if (itemDate.length === 1) itemDate = '0' + itemDate;

    // 요일을 영어로 변경
    const itemDay = itemDateTime.getDay().toLocaleString();

    let itemDayEn = '';
    switch (itemDay) {
      case '0':
        itemDayEn = 'SUN';
        break;
      case '1':
        itemDayEn = 'MON';
        break;
      case '2':
        itemDayEn = 'TUE';
        break;
      case '3':
        itemDayEn = 'WED';
        break;
      case '4':
        itemDayEn = 'THU';
        break;
      case '5':
        itemDayEn = 'FRI';
        break;
      case '6':
        itemDayEn = 'SAT';
        break;
    }

    return {
      itemDateTime,
      itemMonth,
      itemDate,
      itemDayEn
    }
  }

  // 24시간 기준 일정까지 남은 시간 측정
  const maxLimit = 24 * 60 * 60;

  const [timeLimit, setTimeLimit] = useState(); // 남은 시간
  const [timeStatus, setTimeStatus] = useState(0); // 24시간 대비 남은 시간 비율

  const getTimeLimit = async (itemDateTime) => {
    const now = new Date();
    // 현재 시간에서 일정까지 남은 시간 측정
    let limit = Math.trunc((itemDateTime.getTime() - now.getTime()) / 1000);
    if (limit < 0) limit = 0; // 음수 방지

    // 위에서 구한 남은 시간을 24시간 대비 비율 측정
    let status = limit / maxLimit * 100;
    if (status < 0) status = 0;

    setTimeStatus(status);
    setTimeLimit(limit);
  }

  return {
    convertDateTime,
    timeLimit,
    timeStatus,
    getTimeLimit,
  }
}