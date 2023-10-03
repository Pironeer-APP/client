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

const InProgressAsgBox = (props) => {
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

  const timeStatus = Math.trunc(props.status / props.limit * 100);

  const timeLimitSec = Math.trunc(props.status / 1000);
  const {
    convertTime
  } = useProgress();
  
  const {
    hour,
    min,
    sec,
  } = convertTime(timeLimitSec);

  return (
    <Pressable
      onLongPress={() => onLongPressDelete(props.item.session_id)}
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
              <StyledSubText content={`${props.item.month}.${props.item.day} ${props.item.day_en}`} />
              <StyledSubText content={props.item.is_face ? null : 'ONLINE'} />
            </RowView>
            <StyledText content={props.item.title} fontSize={20} />
            <RowView style={{ marginTop: 10 }}>
              <View style={{ width: '70%' }}>
                <ProgressBar status={`${timeStatus}%`} />
              </View>
              <StyledText content={props.status === 0 ? 'CLEAR' : `${hour}:${min}:${sec}`} fontSize={16} />
            </RowView>
          </View>
        </Box>
      </View>
    </Pressable>
  );
};
const DoneAsgBox = ({ item }) => {
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
                content={`${item.month}.${item.day}`} fontSize={20} />
              <StyledText content={item.day_en} fontSize={20} />
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
const Item = (props) => { 
  const isTodaySchedule = props.item.session_id === props.nextSessionId;

  return (
    <>
      {isTodaySchedule ? (
        <InProgressAsgBox item={props.item} limit={props.limit} status={props.status} />
      ) : (
        <DoneAsgBox item={props.item} />
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

    setSessionData(res.sessions);
  }

  useEffect(() => {
    getSessions();
  }, [isFocused]);

  const onPressAddSchedule = () => {
    navigation.navigate('AdminAddSessionScreen');
  }

  const {
    lastScheduleId,
    nextScheduleId,
    limit,
    status,
    getTimeLimit,
  } = useProgress();
  
  useEffect(() => {
    setTimeout(() => {
      getTimeLimit(sessionData);
    }, 1000);
  });

  return (
    <StyledContainer>
      <HeaderDetail title={'세션'} />
      <View style={{ flex: 1 }}>
        <FlatList
          data={sessionData}
          renderItem={
            ({item}) => <Item item={item} lastSessionId={lastScheduleId} nextSessionId={nextScheduleId} limit={limit} status={status} />}
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
