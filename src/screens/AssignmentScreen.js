import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
  Easing,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ProgressBar, RowView} from './HomeScreen';
import {StyledSubText, StyledText} from '../components/Text';
import StyledContainer from '../components/StyledContainer';
import {Box} from '../components/Box';
import {COLORS} from '../assets/Theme';
import styled from 'styled-components/native';
import HeaderDetail from '../components/Header';
import {fetchPost, getData} from '../utils';
import {useIsFocused} from '@react-navigation/native';
import dayjs from 'dayjs';
import useProgress from '../use-progress';
import {GapH} from '../components/Gap';
import {MediumLoader, TinyLoader} from '../components/Loader';
import MsgForEmptyScreen from '../components/MsgForEmptyScreen';
import useClientTime from '../use-clientTime';

export const StatusCircle = ({grade = 4}) => {
  let imageSource;
  if (grade == 0) {
    imageSource = require(`../assets/icons/circle_ex.png`);
  } else if (grade == 3) {
    imageSource = require(`../assets/icons/circle_donggrami.png`);
  } else if (grade == 1 || grade == 2) {
    imageSource = require(`../assets/icons/circle_semo.png`);
  } else {
    imageSource = require(`../assets/icons/circle_none.png`);
  }
  return (
    <View>
      <Image source={imageSource} style={{width: 30, height: 30}} />
    </View>
  );
};

const StatusLine = () => {
  return (
    <View style={{backgroundColor: `${COLORS.icon_gray}`, width: 1, flex: 1}} />
  );
};
const InProgressAsgBox = ({grade, title, item, firstItem, lastItem}) => {
  const [scale] = useState(new Animated.Value(1)); // 초기 크기 1
  const {
    renderMonth: createdMonth,
    renderDate: createdDate,
    renderDay: createdDay,
  } = useClientTime(item.created_at);
  const {
    renderMonth: dueMonth,
    renderDate: dueDate,
    renderDay: dueDay,
    renderHour: dueHour,
    renderMinute: dueMinute,
  } = useClientTime(item.due_date);
  useEffect(() => {
    // 크기 애니메이션 설정
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.easeInOut,
          useNativeDriver: false,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          easing: Easing.easeInOut,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);

  /*
    프로그레스
    1. 각 item의 created_at에서 시간을 10:00:00으로 맞춘다
    2. 전체 제한 기간 limit = due_date - 변환된 created_at
    3. 남은 기간 status = due_date - now
    4. progress = status / limit
  */
  const [limit, setLimit] = useState();
  const [status, setStatus] = useState();
  const [progress, setProgress] = useState(NaN);

  const calcProgress = (item) => {
    const created_at = new Date(item?.created_at);
    // 생성 시각을 정확하게 고정
    created_at.setHours(10);
    created_at.setMinutes(0);
    created_at.setSeconds(0);

    const due_date = new Date(item?.due_date);
    const now = new Date();

    setLimit(due_date - created_at);
    setStatus(due_date - now);
  }

  useEffect(() => {
    setTimeout(() => {
      calcProgress(item);
      setProgress(status / limit);
    }, 1000);
  }, [status]);

  const [isTimerLoading, setIsTimerLoading] = useState(true);

  useEffect(() => {
    isNaN(status) ? setIsTimerLoading(true) : setIsTimerLoading(false);
  }, [status]);

  const {convertTime} = useProgress();

  const {hour, min, sec} = convertTime(Math.trunc(status / 1000));

  return (
    <AsgContainer
      style={{
        gap: 20,
      }}>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
          }}>
          {title === firstItem ? <View style={{flex: 1}} /> : <StatusLine />}
          <View>
            <Animated.Image
              source={require('../assets/icons/circle_onair.png')}
              style={{
                width: 50,
                height: 50,
                transform: [{scale}], // 크기 애니메이션 적용
              }}
            />
          </View>
          {title === lastItem ? <View style={{flex: 1}} /> : <StatusLine />}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          marginVertical: 10,
        }}>
        <Box>
          <View style={{padding: 20}}>
            <RowView style={{marginBottom: 10}}>
              <StyledSubText
                content={`${createdMonth}.${createdDate} ${createdDay} ~ ${dueMonth}.${dueDate} ${dueDay} ${dueHour}:${dueMinute}`}
              />
            </RowView>
            <StyledText content={title} fontSize={20} />
            <RowView style={{marginTop: 10}}>
              <ProgressBar status={progress ? progress : 1} />
              {!!isTimerLoading ? (
                <View style={{width: 75, alignItems: 'center'}}>
                  <TinyLoader />
                </View>
              ) : (
                <View style={{width: 75, alignItems: 'flex-end'}}>
                  <StyledText content={`${hour}:${min}:${sec}`} fontSize={14} />
                </View>
              )}

              <GapH width={5} />
              <Image
                source={require('../assets/icons/timer.png')}
                style={{width: 15, height: 15}}
              />
            </RowView>
          </View>
        </Box>
      </View>
    </AsgContainer>
  );
};

const DoneAsgBox = ({grade, title, due, item, firstItem, lastItem}) => {
  const {renderMonth, renderDate, renderDay} = useClientTime(item.created_at);

  return (
    <AsgContainer>
      <View
        style={{
          flexDirection: 'column',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
          }}>
          {title === firstItem ? <View style={{flex: 1}} /> : <StatusLine />}
          <StatusCircle grade={grade} />
          {title === lastItem ? <View style={{flex: 1}} /> : <StatusLine />}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
        }}>
        <View style={{padding: 20}}>
          <RowView style={{marginVertical: 10}}>
            <View style={{alignItems: 'center'}}>
              <StyledSubText content={`${renderMonth}.${renderDate}`} />
              <StyledSubText content={`${renderDay}`} />
            </View>
            <View style={{flex: 1, marginLeft: 20}}>
              <StyledText content={title} fontSize={18} />
            </View>
          </RowView>
        </View>
      </View>
    </AsgContainer>
  );
};

const AssignmentScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [assignment, setAssignment] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  
  /*
    다가오는 과제인지 지나간 과제인지 계산
    1. 현재 시간과 due_date를 비교
    2. due_date가 먼저 날짜라면 직전에 종료된 괴제 (과제는 due_date 내림차순 정렬되어 있기 때문)
    3. 해당 데이터의 인덱스를 기억, flatlist 렌더링 시 참고
  */

  const [lastAssign, setLastAssign] = useState(null); // 직전에 종료된 과제 기억

  const findLastAssign = (assignments) => {
    const now = new Date();
    for(let i = 0; i < assignments.length; i++) {
      const assign_due_date = new Date(assignments[i].due_date);
      if(now > assign_due_date) {
        setLastAssign(assignments[i]);
        break;
      }
    }
  }

  const saveUserId = async () => {
    setRefreshing(true);
    const userToken = await getData('user_token');
    const url = `/assign`;
    const body = {
      userToken: userToken,
    };

    try {
      const fetchData = await fetchPost(url, body);
      setAssignment(fetchData.data);
      findLastAssign(fetchData.data);
      setIsLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.log('에러 발생: ', error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    saveUserId();
  }, []);

  let FIRST_ITEM = assignment[0]?.title;
  let LAST_ITEM = assignment[assignment.length - 1]?.title;

  const Item = props => {
    return (
      <>
        {props.lastAssign === null || props.lastAssign.AssignId - 1 > props.index ? (
          <InProgressAsgBox
            grade={props.item.grade}
            title={props.item.title}
            item={props.item}
            firstItem={FIRST_ITEM} // title과 비교해서 첫번째면 첫 StatusLine 지우기
            lastItem={LAST_ITEM} // title과 비교해서 마지막이면 두번째 StatusLine 지우기
          /> // 왼쪽에 생성시각 필요 -> item.createdDate 에 MON 2.12 형식으로 저장되어 있음
        ) : (
          <DoneAsgBox
            grade={props.item.grade}
            title={props.item.title}
            due={props.item.dueDate}
            item={props.item}
            firstItem={FIRST_ITEM}
            lastItem={LAST_ITEM}
          />
        )}
      </>
    );
  };

  return (
    <StyledContainer>
      <HeaderDetail title={'과제'} />
      {!!isLoading ? (
        <MediumLoader />
      ) : assignment.length === 0 ? (
        <MsgForEmptyScreen content={'등록된 과제가 없습니다'} />
      ) : (
        <View style={{flex: 1, paddingRight: 20, paddingLeft: 10}}>
          <FlatList
            data={assignment}
            renderItem={({item, index}) => (
              <Item
                item={item}
                lastAssign={lastAssign}
                index={index}
              />
            )}
            keyExtractor={item => item.AssignId}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={saveUserId}
                tintColor={COLORS.green}
              />
            }
          />
        </View>
      )}
    </StyledContainer>
  );
};
export const AsgContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
export default AssignmentScreen;
