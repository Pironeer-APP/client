import {
  View,
  Image,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {RowView} from '../HomeScreen';
import {StyledSubText, StyledText} from '../../components/Text';
import StyledContainer from '../../components/StyledContainer';
import {Box} from '../../components/Box';
import {COLORS} from '../../assets/Theme';
import HeaderDetail from '../../components/Header';
import {MainButton} from '../../components/Button';
import IsFaceBox from '../../components/IsFaceBox';
import Gap, {GapH} from '../../components/Gap';
import useClientTime from '../../use-clientTime';
import OnAirCircle from '../../components/OnAirCircle';
import StatusCircle from '../../components/StatusCircle';
import { client } from '../../api/client';
import { getData } from '../../api/asyncStorage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSessions, selectSessions } from '../../features/sessions/sessionsSlice';
import { findNextSession } from '../../utils';

const StatusLine = () => {
  return (
    <View style={{backgroundColor: `${COLORS.icon_gray}`, width: 1, flex: 1}} />
  );
};

const InProgressAsgBox = props => {
  const {renderYear, renderMonth, renderDate, renderDay, renderHour, renderMinute} =
    useClientTime(props.item.date);
  return (
    <Pressable
      onLongPress={() => props.onLongPressDelete(props.item)}
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
          <OnAirCircle />
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
                  <View style={{paddingRight: 30}}>
                  <StyledSubText content={props.item.location} />
                  </View>
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
const DoneAsgBox = ({item, onLongPressDelete}) => {
  const {renderMonth, renderDate, renderDay} = useClientTime(item.date);
  return (
    <Pressable
      onLongPress={() => onLongPressDelete(item)}
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

const AssignmentScreen = ({navigation}) => {
  const [nextSession, setNextSession] = useState(null);

  const dispatch = useDispatch();
  const sessions = useSelector(selectSessions);

  const sessionConfig = () => {
    const nextSession = findNextSession(sessions);
    setNextSession(nextSession);
  }
  useEffect(() => {
    dispatch(fetchSessions());
  }, [])
  useEffect(() => {
    const intervalId = setInterval(() => {
      sessionConfig();
    }, 1000);
    return () => clearInterval(intervalId);
  }, [sessions])

  const onPressAddSchedule = () => {
    navigation.navigate('AdminAddSessionScreen');
  };

const onLongPressDelete = session => {
  Alert.alert(
    `${session.title} 일정을 삭제하시겠습니까?`,
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
            session_id: session.session_id,
          };
          await client.post(url, body);
          dispatch(fetchSessions());
        },
      },
    ],
  );
};

const renderItem = ({item}) => {
  return (
    <>
      {nextSession?.cnt >= item?.cnt ? (
        <InProgressAsgBox
          nextSession={nextSession}
          item={item}
          onLongPressDelete={onLongPressDelete}
        />
      ) : (
        <DoneAsgBox
          item={item}
          onLongPressDelete={onLongPressDelete} />
      )}
    </>
  );
};
  return (
    <StyledContainer>
      <HeaderDetail title={'세션'} />
      <View style={{flex: 1}}>
        <FlatList
          style={{paddingRight: 20, paddingLeft: 10}}
          data={sessions}
          renderItem={renderItem}
          keyExtractor={item => item.session_id}
        />
        <View style={{paddingHorizontal: 20}}>
          <MainButton
            content="일정 추가하기"
            onPress={onPressAddSchedule}
            height={60}
          />
        </View>
      </View>
    </StyledContainer>
  );
};

export default AssignmentScreen;
