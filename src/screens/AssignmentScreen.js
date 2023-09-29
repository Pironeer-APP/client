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
    title: '피로그래머 카드게임',
    due_date: '7.20 MON',
    created_at: '2023-09-24T00:20:44.000Z',
    done: true,
  },
  {
    id: 3,
    grade: 3,
    title: '피로그래머 카드게임',
    due_date: '7.20 MON',
    created_at: '2023-09-24T00:20:44.000Z',
    done: true,
  },
];
const StatusCircle = ({grade}) => {
  let imageSource;
  if (grade == 0) {
    imageSource = require(`../assets/icons/circle_ex.png`);
  } else if (grade === 3) {
    imageSource = require(`../assets/icons/circle_donggrami.png`);
  } else {
    imageSource = require(`../assets/icons/circle_semo.png`);
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
const InProgressAsgBox = () => {
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
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
      }}>
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
          <View style={{flex: 1}} />
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
          <StatusLine />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
        }}>
        <Box>
          <View style={{padding: 20}}>
            <RowView style={{marginBottom: 10}}>
              <StyledSubText content={'7.20 MON'} />
              <StyledSubText content={'DUE 7.22'} />
            </RowView>
            <StyledText content={'피로그래머 카드게임'} fontSize={20} />
            <RowView style={{marginTop: 10}}>
              <ProgressBar status={'30%'} />
              <StyledText content={'18:38:43'} fontSize={16} />
            </RowView>
          </View>
        </Box>
      </View>
    </View>
  );
};
const DoneAsgBox = ({grade}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    }}>
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
        <StatusLine />
        <StatusCircle grade={grade} />
        <StatusLine />
      </View>
    </View>
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
      }}>
      <View style={{padding: 20}}>
        <RowView style={{marginBottom: 10}}>
          <View>
            <StyledText content={'7.22'} fontSize={20} />
            <StyledText content={'TUE'} fontSize={20} />
          </View>
          <View style={{flex: 1, marginLeft: 20}}>
            <StyledText content={'피로그래머 카드게임'} fontSize={20} />
          </View>
        </RowView>
      </View>
    </View>
  </View>
);
const renderItem = ({item}) => {
  return (
    <>
      {item.done === false ? (
        <InProgressAsgBox grade={item.grade} />
      ) : (
        <DoneAsgBox grade={item.grade} />
      )}
    </>
  );
};
const AssignmentScreen = () => {
  return (
    <StyledContainer>
      <HeaderDetail title={'과제'} />
      <View style={{flex: 1}}>
        <FlatList
          data={Assignmentdata}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </StyledContainer>
  );
};

export default AssignmentScreen;
