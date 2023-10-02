import { View, Text } from 'react-native'
import React, {useState} from 'react'

export default function useProgress() {
  // 실제 세션1 10/7 SAT 10:00, 세션2 10/10 TUE 10:00
  // 1시간 여유 세션1 10/7 SAT 11:00, 세션2 10/10 TUE 11:00
  // 오늘 10/7 SAT 10:00 -> CLEAR
  // 오늘 10/7 SAT 11:00 -> 세션2 InProgress
  // 현재 시간보다 큰 첫 번째 세션이 다음 세션
  // 이전 세션과 다음 세션 시간의 차이가 전체 limit
  // 오늘 시간과 다음 세션 시간의 차이가 남은 시간 status
  // 과제도 동일한 로직
  const [lastScheduleId, setLastScheduleId] = useState(); // 직전 세션의 id
  const [nextScheduleId, setNextScheduleId] = useState(); // 다음 세션의 id
  const [limit, setLimit] = useState(); // 지난 세션 ~ 다음 세션까지 전체 limit
  const [status, setStatus] = useState();

  const getTimeLimit = (dataList) => {
    const now = new Date();
    let nextScheduleDateTime = 0;
    let lastScheduleDateTime = 0;
    // dataList는 date가 최신 순
    for(let i = dataList.length - 1; i > 0; i--) {
      const session1h = new Date(dataList[i].date_plus_1h); // CLEAR 표시를 위한 1시간 여유분
      if(now.getTime() < session1h.getTime()) {
        let lastScheduleDate;
        setNextScheduleId(dataList[i].session_id);
        const nextScheduleDate = new Date(dataList[i].date);
        nextScheduleDateTime = nextScheduleDate.getTime();
        if(i >= 1) {
          setLastScheduleId(dataList[i+1].session_id);
          lastScheduleDate = new Date(dataList[i+1].date);
          lastScheduleDateTime = lastScheduleDate.getTime();
        } else {
          lastScheduleDateTime = nextScheduleDateTime - 24 * 3 * 60 * 60 * 1000; // 3일 전을 기준
        }
        setLimit(nextScheduleDateTime - lastScheduleDateTime);
        
        break;
      }
    }
    if(nextScheduleDateTime > now.getTime()) {
      setStatus(nextScheduleDateTime - now.getTime());
    } else {
      setStatus(0);
    }
  }

  const convertTime = (timeLimitSec) => {
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

  return {
    lastScheduleId, // 현재 시간 기준 직전 스케줄
    nextScheduleId, // 현재 시간 기준 다가오는 스케줄
    limit, // 직전 스케줄과 다가오는 스케줄의 시간 차
    status, // 현재 시간과 다가오는 스케줄의 시간 차
    getTimeLimit, // lastScheduleId, nextScheduleId, limit, status를 구할 수 있는 함수
    convertTime, // 초 단위의 시간을 시, 분, 초로 변환하는 함수
  }
}