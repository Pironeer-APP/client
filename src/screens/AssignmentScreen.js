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

export const Assignmentdata = [
  {
    id: 1,
    grade: 1,
    // 0: 미제출, 1: 미흡, 2: 지각, 3: 완료
    title: '피로그래머 카드게임',
    due_date: '7.20 MON',
    created_at: '2023-09-24T00:20:44.000Z',
    done: false,
  },
  {
    id: 2,
    grade: 0,
    title: '파이썬 술게임',
    due_date: '7.20 MON',
    created_at: '2023-09-24T00:20:44.000Z',
    done: true,
  },
  {
    id: 3,
    grade: 3,
    title: 'Arsha 클론코딩',
    due_date: '7.20 MON',
    created_at: '2023-09-24T00:20:44.000Z',
    done: true,
  },
];
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
const InProgressAsgBox = ({grade, title, due, firstItem, lastItem}) => {
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
              <StyledSubText content={`DUE ${due}`} />
            </RowView>
            <StyledText content={title} fontSize={20} />
            <RowView style={{marginTop: 10}}>
              <ProgressBar status={'30%'} />

              <StyledText content={'18:38:43'} fontSize={16} />
            </RowView>
          </View>
        </Box>
      </View>
    </AsgContainer>
  );
};

const DoneAsgBox = ({grade, title, due, firstItem, lastItem}) => (
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
            <StyledSubText content={due} />
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

  let FIRST_ITEM = assignment[0]?.title;
  let LAST_ITEM = assignment[assignment.length - 1]?.title;

  const renderItem = ({item}) => {
    return (
      <>
        {item.done === 0 ? (
          <InProgressAsgBox
            grade={item.grade}
            title={item.title}
            due={item.dueDate}
            firstItem={FIRST_ITEM} // title과 비교해서 첫번째면 첫 StatusLine 지우기
            lastItem={LAST_ITEM} // title과 비교해서 마지막이면 두번째 StatusLine 지우기
          /> // 왼쪽에 생성시각 필요 -> item.createdDate 에 MON 2.12 형식으로 저장되어 있음
        ) : (
          <DoneAsgBox
            grade={item.grade}
            title={item.title}
            due={item.dueDate}
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
          renderItem={renderItem}
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
