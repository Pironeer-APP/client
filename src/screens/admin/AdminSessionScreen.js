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
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';

import {ProgressBar, RowView} from '../HomeScreen';
import {StyledSubText, StyledText} from '../../components/Text';
import StyledContainer from '../../components/StyledContainer';
import {Box} from '../../components/Box';
import {COLORS} from '../../assets/Theme';
import HeaderDetail from '../../components/Header';
import {MainButton} from '../../components/Button';
import useUserInfo from '../../use-userInfo';
import {fetchPost, getData} from '../../utils';
import useProgress from '../../use-progress';
import IsFaceBox from '../../components/IsFaceBox';
import {GapH} from '../../components/Gap';
import useClientTime from '../../use-clientTime';

const StatusCircle = () => {
  return <View style={styles.statusCircle} />;
};

const StatusLine = () => {
  return (
    <View style={{backgroundColor: `${COLORS.icon_gray}`, width: 1, flex: 1}} />
  );
};

const onLongPressDelete = session_id => {
  Alert.alert(
    '일정을 삭제하시겠습니까?',
    '일정과 관련된 출석 정보가 모두 삭제 됩니다',
    [
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
            session_id: session_id,
          };
          const res = await fetchPost(url, body);
          console.log(res);
        },
      },
    ],
  );
};

const InProgressAsgBox = props => {
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

  const {renderMonth, renderDate, renderDay, renderHour, renderMinute} =
    useClientTime(props.item.date);

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
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
          }}>
          <StatusLine />
          <View>
            {props.isNextSchedule ? (
              <Animated.Image
                source={require('../../assets/icons/circle_onair.png')}
                style={{
                  width: 50,
                  height: 50,
                  transform: [{scale}], // 크기 애니메이션 적용
                }}
              />
            ) : (
              <Image
                source={require(`../../assets/icons/circle_none.png`)}
                style={{width: 30, height: 30}}
              />
            )}
          </View>
          <StatusLine />
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
          <View style={{paddingHorizontal: 17, paddingVertical: 10}}>
            <RowView style={{marginBottom: 10}}>
              <StyledSubText
                content={`${renderMonth}.${renderDate} ${renderDay}`}
              />
              <IsFaceBox isFace={props.item.is_face} />
            </RowView>
            <StyledText content={props.item.title} fontSize={20} />
            <Gap height={14} />
            {props.item.is_face == 1 ? (
              <>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={require('../../assets/images/location_icon.png')}
                    style={{width: 15, height: 15}}
                    resizeMode="contain"
                  />
                  <GapH width={9} />
                  <StyledSubText content={props.item.location} />
                </View>
                <Gap height={5} />
              </>
            ) : null}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../assets/images/time_icon.png')}
                style={{width: 15, height: 15}}
                resizeMode="contain"
              />
              <GapH width={9} />
              <StyledSubText content={`${renderHour}:${renderMinute}`} />
            </View>
          </View>
        </Box>
      </View>
    </Pressable>
  );
};
const DoneAsgBox = ({item}) => {
  const {renderMonth, renderDate, renderDay} = useClientTime(item.date);
  return (
    <Pressable
      onLongPress={() => onLongPressDelete(item.session_id)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
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
        <View style={{padding: 20}}>
          <RowView style={{marginVertical: 10}}>
            <View style={{alignItems: 'center'}}>
              <StyledSubText
                content={`${renderMonth}.${renderDate}`}
                fontSize={20}
              />
              <StyledSubText content={`${renderDay}`} fontSize={20} />
            </View>
            <View style={{flex: 1, marginLeft: 20}}>
              <StyledText content={item.title} fontSize={20} />
            </View>
          </RowView>
        </View>
      </View>
    </Pressable>
  );
};
const Item = props => {
  let isFutureSchedule = false;
  let isNextSchedule = false;
  const itemDate = new Date(props.item.date);
  const itemDateTime = itemDate.getTime();
  const now = new Date();
  if (props.item.session_id === props.nextSessionId) {
    isFutureSchedule = true;
    isNextSchedule = true;
  } else if (itemDateTime >= now.getTime()) {
    isFutureSchedule = true;
    isNextSchedule = false;
  }

  return (
    <>
      {isFutureSchedule ? (
        <InProgressAsgBox
          isNextSchedule={isNextSchedule}
          item={props.item}
          limit={props.limit}
          status={props.status}
        />
      ) : (
        <DoneAsgBox item={props.item} />
      )}
    </>
  );
};

const AssignmentScreen = ({navigation}) => {
  const [sessionData, setSessionData] = useState([]);
  const [initialScrollIndex, setInitialScrollIndex] = useState(0);
  const isFocused = useIsFocused();

  const getSessions = async () => {
    const userToken = await getData('user_token'); // token 받아올 땐 fetch랑 같이...
    const url = '/session/getSessions';
    const body = {
      userToken: userToken,
    };
    const res = await fetchPost(url, body);

    setSessionData(res.sessions);
    console.log('서버로부터 받은 세션들', res.sessions);
    setInitialScrollIndex(res.nextSessionIdx);
    console.log(res.nextSessionIdx);
  };

  useEffect(() => {
    getSessions();
  }, [isFocused]);

  const onPressAddSchedule = () => {
    navigation.navigate('AdminAddSessionScreen');
  };

  const {lastScheduleId, nextScheduleId, limit, status, getTimeLimit} =
    useProgress();

  useEffect(() => {
    setTimeout(() => {
      getTimeLimit(sessionData);
    }, 1000);
  });

  // need to be changed [wonchae]
  // const getItemLayout = (data, index) => {
  //   return {
  //     length: 100,
  //     offset: 100 * data.length,
  //     index,
  //   };
  // };

  return (
    <StyledContainer>
      <HeaderDetail title={'세션'} />
      <View style={{flex: 1, paddingRight: 20, paddingLeft: 10}}>
        <FlatList
          data={sessionData}
          renderItem={({item}) => (
            <Item
              item={item}
              lastSessionId={lastScheduleId}
              nextSessionId={nextScheduleId}
              limit={limit}
              status={status}
            />
          )}
          keyExtractor={item => item.session_id}
          // getItemLayout={getItemLayout}
          // initialScrollIndex={initialScrollIndex}
        />
        <MainButton
          content="일정 추가하기"
          onPress={onPressAddSchedule}
          height={60}
        />
      </View>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  statusCircle: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.light_gray,
    borderRadius: 100,
  },
});

export default AssignmentScreen;
