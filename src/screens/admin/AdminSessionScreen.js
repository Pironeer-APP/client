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
  Pressable,
  Alert
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

import { ProgressBar, RowView } from '../HomeScreen';
import { StyledSubText, StyledText } from '../../components/Text';
import StyledContainer from '../../components/StyledContainer';
import { Box } from '../../components/Box';
import { COLORS } from '../../assets/Theme';
import HeaderDetail from '../../components/Header';
import { MainButton } from '../../components/Button';
import useUserInfo from '../../use-userInfo';
import { fetchPost, getData } from '../../utils';
import useProgress from '../../use-progress';

const StatusCircle = () => {
  return (
    <View style={styles.statusCircle} />
  );
};

const StatusLine = () => {
  return (
    <View style={{ backgroundColor: `${COLORS.icon_gray}`, width: 1, flex: 1 }} />
  );
};

const onLongPressDelete = (session_id) => {
  Alert.alert('일정을 삭제하시겠습니까?', '일정과 관련된 출석 정보가 모두 삭제 됩니다', [
    {
      text: '취소',
      style: 'cancel',
    },
    {
      text: '삭제',
      onPress: async () => {
        const userToken = await getData('user_token');
        const url = '/session/deleteSchedule';
        const body = {
          userToken: userToken,
          session_id: session_id
        }
        const res = await fetchPost(url, body);
        console.log(res);
      }
    },
  ]);
}

const InProgressAsgBox = ({ item }) => {
  const [scale] = useState(new Animated.Value(1)); // 초기 크기 1
  
  const {
    convertDateTime,
    timeLimit,
    timeStatus,
    getTimeLimit,
  } = useProgress();

  const {
    itemDateTime,
    itemMonth,
    itemDate,
    itemDayEn
  } = convertDateTime(item.date);

  useEffect(() => {
    setTimeout(() => {
      getTimeLimit(itemDateTime);
    }, 1000);
  });

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
    <Pressable
      onLongPress={() => onLongPressDelete(item.session_id)}
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
          <View style={{ flex: 1 }} />
          <View>
            <Animated.Image
              source={require('../../assets/icons/circle_onair.png')}
              style={{
                width: 50,
                height: 50,
                transform: [{ scale }], // 크기 애니메이션 적용
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
          <View style={{ padding: 20 }}>
            <RowView style={{ marginBottom: 10 }}>
              <StyledSubText content={`${itemMonth}.${itemDate} ${itemDayEn}`} />
              <StyledSubText content={item.is_face ? null : 'ONLINE'} />
            </RowView>
            <StyledText content={item.title} fontSize={20} />
            <RowView style={{ marginTop: 10 }}>
              <View style={{ width: '70%' }}>
                <ProgressBar status={`${timeStatus}%`} />
              </View>
              <StyledText content={timeLimit === 0 ? 'CLEAR' : `${Math.trunc(timeLimit / 60 / 60)}:${Math.trunc(timeLimit / 60 % 60)}:${Math.trunc(timeLimit % 60)}`} fontSize={16} />
            </RowView>
          </View>
        </Box>
      </View>
    </Pressable>
  );
};
const DoneAsgBox = ({ item }) => {
  const {
    itemMonth,
    itemDate,
    itemDayEn
  } = convertDateTime(item);

  return (
    <Pressable
      onLongPress={() => onLongPressDelete(item.session_id)}
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
          <StatusCircle />
          <StatusLine />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
        }}>
        <View style={{ padding: 20 }}>
          <RowView style={{ marginBottom: 10 }}>
            <View style={{ alignItems: 'center' }}>
              <StyledText
                content={`${itemMonth}.${itemDate}`} fontSize={20} />
              <StyledText content={itemDayEn} fontSize={20} />
            </View>
            <View style={{ flex: 1, marginLeft: 20 }}>
              <StyledText content={item.title} fontSize={20} />
            </View>
          </RowView>
        </View>
      </View>
    </Pressable>
  );
}
const renderItem = ({ item }) => {
  const today = new Date();

  let isTodaySchedule = false;
  if (today.getDate().toLocaleString() === new Date(item.date).getDate().toLocaleString()
    && today.getMonth().toLocaleString() === new Date(item.date).getMonth().toLocaleString()
    && today.getFullYear().toLocaleString() === new Date(item.date).getFullYear().toLocaleString()) {
    isTodaySchedule = true;
  }

  console.log(isTodaySchedule);
  return (
    <>
      {isTodaySchedule ? (
        <InProgressAsgBox item={item} />
      ) : (
        <DoneAsgBox item={item} />
      )}
    </>
  );
};

const AssignmentScreen = ({ navigation }) => {
  const [sessionData, setSessionData] = useState([]);
  const isFocused = useIsFocused();

  const getSessions = async () => {
    const userToken = await getData('user_token'); // token 받아올 땐 fetch랑 같이...
    const url = '/session/getSessions';
    const body = {
      userToken: userToken
    }
    const res = await fetchPost(url, body);
    console.log(res);

    setSessionData(res.sessions);
  }

  useEffect(() => {
    getSessions();
  }, [isFocused]);

  const onPressAddSchedule = () => {
    navigation.navigate('AdminAddSessionScreen');
  }

  return (
    <StyledContainer>
      <HeaderDetail title={'세션'} />
      <View style={{ flex: 1 }}>
        <FlatList
          data={sessionData}
          renderItem={renderItem}
          keyExtractor={item => item.session_id}
        />
        <MainButton content="일정 추가하기" onPress={onPressAddSchedule} />
      </View>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  statusCircle: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.light_gray,
    borderRadius: 100
  }
});

export default AssignmentScreen;
