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
const InProgressAsgBox = ({grade, title, due, lastAssignDueDate, item, firstItem, lastItem}) => {
  const [scale] = useState(new Animated.Value(1)); // 초기 크기 1

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

  // 프로그레스 표기
  // lastAssginDueDate는 dayjs객체임
  const [limit, setLimit] = useState();
  const [status, setStatus] = useState(100);
  const getProgress = () => {
    const now = dayjs();
    const itemDueDate = dayjs(item.due_date);
    const full = itemDueDate.diff(lastAssignDueDate);
    setLimit(itemDueDate.diff(now));
    setStatus(Math.trunc(limit/full*100));
  }

  useEffect(() => {
    setTimeout(() => {
      getProgress();
    }, 1000);
  });

  const {
    convertTime
  } = useProgress();
  
  const {
    hour,
    min,
    sec,
  } = convertTime(Math.trunc(limit / 1000));
  
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
              <StyledSubText content={`${item.createdDate}`} />
              <StyledSubText content={`DUE ${due}`} />
            </RowView>
            <StyledText content={title} fontSize={20} />
            <RowView style={{marginTop: 10}}>
              <View style={{ width: '70%' }}>
                <ProgressBar status={`${status}%`} />
              </View>
              <StyledText content={`${hour}:${min}:${sec}`} fontSize={16} />
            </RowView>
          </View>
        </Box>
      </View>
    </AsgContainer>
  );
};

const DoneAsgBox = ({grade, title, due, item, firstItem, lastItem}) => (
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
          <View>
            <StyledText content={item.createdDate.split(' ')[0]} fontSize={20} />
          </View>
          <View style={{flex: 1, marginLeft: 20}}>
            <StyledText content={title} fontSize={18} />
          </View>
        </RowView>
      </View>
    </View>
  </AsgContainer>
);

const AssignmentScreen = () => {
  const [assignment, setAssignment] = useState([]);
  const isFocused = useIsFocused(); // 일단 살립니다

  const saveUserId = async () => {
    const userToken = await getData('user_token');
    const url = `/assign`;
    const body = {
      userToken: userToken,
    };
    // console.log('body: ', body);
    try {
      const fetchData = await fetchPost(url, body);
      setAssignment(fetchData.data);
      // console.log('성공  받아온 data: ', fetchData);
    } catch (error) {
      console.log(error);
      console.log('에러');
    }
  };

  useEffect(() => {
    saveUserId();
  }, []);

  // 프로그레스 구현, 과제는 2개 이상일 수 있으므로 세션과 다름
  const [lastAssignment, setLastAssignment] = useState(null);
  const [lastIndex, setLastIndex] = useState(-1);
  const [lastAssignDueDate, setLastAssignDueDate] = useState(dayjs().subtract(3, 'day'));

  const getLastAssign = () => {
    // 지난 마지막 assignment와 index 알아내기
    const now = dayjs();
    console.log('now:', now);
    for(let i = assignment.length - 1; i > 0; i--) {
      const assignDueDate = dayjs(assignment[i].due_date);
      if(now.isBefore(assignDueDate)) { // 지금부터가 다가오는 과제
        if(i === assignment.length - 1) { // 다가오는 과제가 가장 첫 번째 과제인 경우
          setLastAssignment(null);
          setLastIndex(-1);
          setLastAssignDueDate(dayjs().subtract(3, 'day'));
        }
        setLastAssignment(assignment[i + 1]); // 그 이전 과제가 마지막 과제
        setLastIndex(assignment[i + 1].AssignId - 1);
        setLastAssignDueDate(dayjs(assignment[i + 1].due_date));
        break;
      }
    }
  }

  useEffect(() => {
    getLastAssign();
    console.log(lastAssignment, lastIndex, lastAssignDueDate);
  }, [assignment]);

  let FIRST_ITEM = assignment[0]?.title;
  let LAST_ITEM = assignment[assignment.length - 1]?.title;

  const Item = (props) => {
    return (
      <>
        {props.lastIndex === -1 || props.lastIndex > props.index ? (
          <InProgressAsgBox
            grade={props.item.grade}
            title={props.item.title}
            due={props.item.dueDate}
            lastAssignDueDate={props.lastAssignDueDate}
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
      <View style={{flex: 1, padding: 20, paddingLeft: 10}}>
        <FlatList
          data={assignment}
          renderItem={
            ({item, index}) =>
              <Item
                item={item}
                lastIndex={lastIndex}
                lastAssignDueDate={lastAssignDueDate}
                index={index} />}
          keyExtractor={item => item.AssignId}
        />
      </View>
    </StyledContainer>
  );
};
const AsgContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
export default AssignmentScreen;
