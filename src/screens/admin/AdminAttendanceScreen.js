import {View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Image, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import * as Progress from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';

import {COLORS} from '../../assets/Theme';
import {StyledSubText, StyledText} from '../../components/Text';
import StyledContainer from '../../components/StyledContainer';
import HeaderDetail from '../../components/Header';
import AdminAttendanceDetailScreen from './AdminAttendanceDetailScreen';
import Gap, {GapH} from '../../components/Gap';
import useUserInfo from '../../use-userInfo';
import {fetchPost, getData} from '../../utils';
import {ButtonContainer, MainButton, MiniButton} from '../../components/Button';
import useClientTime from '../../use-clientTime';
import BottomSheetModal from '../../components/BottomSheetModal';
import BottomTouchModal from '../../components/BottomTouchModal';


const DateContainer = styled.View`
  border-radius: 12px;
  padding: 10px;
`;

const DateBox = props => {
  const navigation = useNavigation();
  const sessionDate = new Date(props.date.date);
  const {renderMonth: month, renderDate: day} = useClientTime(sessionDate);

  // 오늘 일정인지
  let isToday = false;
  const today = new Date();
  if (
    String(today.getMonth() + 1).padStart(2, '0') === month &&
    String(today.getDate()).padStart(2, '0') === day
  ) {
    isToday = true;
  }

  return (
    <TouchableOpacity
      style={{flex: 1, marginRight: 20}}
      onPress={() =>
        navigation.navigate({
          name: 'AdminAttendanceDetailScreen',
          params: {month: month, day: day, session_id: props.date.session_id},
        })
      }>
      <DateContainer
        style={{
          justifyContent: 'center',
          backgroundColor: isToday ? COLORS.green : COLORS.gray,
        }}>
        <StyledText
          content={month}
          fontSize={35}
          color={isToday ? 'black' : 'white'}
        />
        <StyledText
          content={day}
          fontSize={35}
          color={isToday ? 'black' : 'white'}
        />
      </DateContainer>
    </TouchableOpacity>
  );
};

const WeekContainer = props => {
  return (
    <View style={{paddingHorizontal: 15, marginBottom: 25}}>
      <View style={{marginBottom: 5}}>
        <StyledSubText content={`Week ${props.week}`} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: -20,
        }}>
        {props.item?.map((date, index) => {
          return <DateBox key={index} date={date} />;
        })}
      </View>
    </View>
  );
};

const DeleteAttendModal = props => {
  return (
    <KeyboardAvoidingView style={styles.modalView}>
      <StyledText content={'삭제할 출석 데이터에 해당하는'} fontSize={18} />
      <StyledText content={'출석 코드를 입력하세요'} fontSize={18} />
      <View style={styles.modalInputContainer}>
        <TextInput
          style={styles.modalInput}
          placeholder="0000"
          placeholderTextColor={COLORS.light_gray}
          fontSize={18}
          color={COLORS.textColor}
          autoFocus={true}
          keyboardType="numeric"
          onChangeText={props.setDeleteCode}
          value={props.deleteCode}
          maxLength={4}
        />
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={props.onPressDeleteAttend}>
          <StyledText content={'삭제'} fontSize={18} color={COLORS.bg_black} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const DeleteFinModal = ({del_code}) => (
  <View style={styles.modalView}>
    <Image
      source={require('../../assets/images/attend_success.png')}
      resizeMode="contain"
      style={{width: 120, height: 120}}
    />
    <Gap />
    <StyledText content={del_code} fontSize={20} />
    <StyledText content={'출결 제거 완료'} fontSize={20} />
  </View>
);

const NullCodeModal = ({del_code}) => (
  <View style={styles.modalView}>
    <Image
      source={require('../../assets/images/attend_failed.png')}
      resizeMode="contain"
      style={{width: 120, height: 120}}
    />
    <Gap />
    <StyledText content={del_code} fontSize={20} />
    <StyledText content={'코드 출결 없음'} fontSize={20} />
  </View>
);

const DeleteFailedModal = ({del_code}) => (
  <View style={styles.modalView}>
    <Image
      source={require('../../assets/images/attend_failed.png')}
      resizeMode="contain"
      style={{width: 120, height: 120}}
    />
    <Gap />
    <StyledText content={del_code} fontSize={20} />
    <StyledText content={'출결 제거 실패'} fontSize={20} />
  </View>
);

const EndFailedModal = ({content}) => (
  <View style={styles.modalView}>
    <Image
      source={require('../../assets/images/attend_failed.png')}
      resizeMode="contain"
      style={{width: 120, height: 120}}
    />
    <Gap />
    <StyledText
      content={content}
      fontSize={20}
    />
  </View>
)

const EndFinModal = () => (
  <View style={styles.modalView}>
    <Image
      source={require('../../assets/images/attend_success.png')}
      resizeMode="contain"
      style={{width: 120, height: 120}}
    />
    <Gap />
    <StyledText
      content={'오늘 출결 종료'}
      fontSize={20}
    />
  </View>
)

const AdminAttendanceScreen = () => {
  const [sessions, setSessions] = useState();
  const [sessionForHighlight, setSessionForHighlight] = useState();
  const [isToday, setIsToday] = useState(false);
  const [codeText, setCodeText] = useState('코드 생성');
  const [isModalVisible, setModalVisible] = useState(false);
  const [sessionId, setSessionId] = useState();
  const [attendStatusContent, setAttendStatusContent] = useState('출결 저장');
  const [codeTimeOut, setCodeTimeOut] = useState();
  const [codeTimeoutText, setCodeTimeoutText] = useState('');
  const [codeLoading, setCodeLoading] = useState(false);

  // 이미 생성된 출석 코드가 있는지 확인
  const getTodayCode = async () => {
    const userToken = await getData('user_token');
    const url = '/attend/getCode';
    const body = {userToken};

    const res = await fetchPost(url, body);
    if (res.code) {
      setCodeText(res.code.code);
      let timeout = new Date(res.code.created_at);
      timeout.setMinutes(timeout.getMinutes() + 3); // 3분 더한 기간으로 변환
      setCodeTimeOut(timeout);
    }
  };
  useEffect(() => {
    getTodayCode();
  }, []);

  // 현재 시간 대비 코드 남은 기간
  useEffect(() => {
    if (codeTimeOut) {
      setTimeout(() => {
        const now = new Date();
        if (codeTimeOut) {
          const limit = new Date(codeTimeOut.getTime() - now.getTime());
          if (limit <= 0) {
            setCodeText('코드 생성');
            setCodeTimeoutText(null);
            setCodeTimeOut(null);
          } else {
            const min = String(limit.getMinutes()).padStart(2, '0');
            const sec = String(limit.getSeconds()).padStart(2, '0');
            setCodeTimeoutText(`${min}:${sec}`);
          }
        }
      }, 1000);
    }
  });

  const getSessionsByWeek = async () => {
    const userToken = await getData('user_token');
    const url = '/session/getWeekSessions';
    const body = {
      userToken: userToken,
    };
    const result = await fetchPost(url, body);
    // console.log(result.sessions);
    setSessions(result.sessions);
  };

  const getSessions = async () => {
    const userToken = await getData('user_token');
    const url = '/session/getSessions';
    const body = {
      userToken: userToken,
    };
    const result = await fetchPost(url, body);
    console.log('result: ', result.sessions);
    setSessionForHighlight(result.sessions);
  };

  useEffect(() => {
    getSessionsByWeek();
    getSessions();
  }, []);

  // 오늘세션 있는지 확인
  const checkToday = () => {
    const today = new Date();
    if (sessionForHighlight) {
      sessionForHighlight.map(session => {
        const sessionDate = new Date(session.date);
        if (
          today.getMonth() === sessionDate.getMonth() &&
          today.getDate() === sessionDate.getDate()
        ) {
          setIsToday(true);
          setSessionId(session.session_id);
        }
      });
    }
  };

  useEffect(() => {
    checkToday();
  }, [sessionForHighlight]);

  //출석코드 생성 함수
  const onPressGenerateCode = async () => {
    const userToken = await getData('user_token');
    const url = '/attend/generateCode';
    const body = {
      token: userToken,
    };
    setCodeLoading(true);
    await fetchPost(url, body);

    await getTodayCode();
    setCodeLoading(false);
  };

  //모달 띄우고 접고
  const toggleModal = () => {
    setDeleteCode(null);
    setModalVisible(!isModalVisible);
  };

  // 출석 삭제를 위한 코드

  const [deleteCode, setDeleteCode] = useState();
  // 삭제 완료
  const [deleteFinModalVisible, setDeleteFinModalVisible] = useState(false);
  // 코드 없음
  const [nullCodeModalVisible, setNullCodeModalVisible] = useState(false);

  // 삭제 실패
  const [deleteFailedModalVisible, setDeleteFailedModalVisible] = useState(false);
  // 종료 실패
  const [endFailedModalVisible, setEndFailedModalVisible] = useState(false);
  const [endFailedContent, setEndFailedContent] = useState('');
  // 종료 성공
  const [endFinModalVisible, setEndFinModalVisible] = useState(false);

  // 로딩
  const [loading, setLoading] = useState(false);

  //출석 삭제 함수
  const onPressDeleteAttend = async () => {
    setLoading(true);
    const userToken = await getData('user_token');
    const url = '/attend/deleteTempAttend';
    const body = {
      userToken: userToken,
      deleteCode: deleteCode,
    };
    const res = await fetchPost(url, body);
    setLoading(false);
    setModalVisible(!isModalVisible);
    if (res.result === '삭제 완료') {
      setTimeout(() => {
        setDeleteFinModalVisible(true);
      }, 500);
      setTimeout(() => {
        setDeleteFinModalVisible(false);
      }, 3000);
    } else if (res.result === '코드 없음') {
      setTimeout(() => {
        setNullCodeModalVisible(true);
      }, 500);
      setTimeout(() => {
        setNullCodeModalVisible(false);
      }, 3000);
    } else if (res.result === '삭제 실패') {
      setTimeout(() => {
        setDeleteFailedModalVisible(true);
      }, 500);
      setTimeout(() => {
        setDeleteFailedModalVisible(false);
      }, 3000);
    }
  };

  // 출결 종료 함수
  const onPressEndAttend = async () => {
    Alert.alert(
      '오늘 출결을 종료하시겠습니까?',
      '',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: async () => {
            setLoading(true);
            const userToken = await getData('user_token');
            const url = '/attend/endAttend';
            const body = {
              userToken: userToken,
              session_id: sessionId
            };
            const res = await fetchPost(url, body);
            setLoading(false);
            if(res.result == false) {
              setEndFailedContent('출결 저장 실패: 출결 3회 이상 진행 됨');
              setEndFailedModalVisible(true);
              setTimeout(() => {
                setEndFailedModalVisible(false);
              }, 2000);
            } else if(res.result == true) {
              setEndFinModalVisible(true);
              setTimeout(() => {
                setEndFinModalVisible(false);
              }, 2000);
            } else {
              setEndFailedContent(res.result);
              setEndFailedModalVisible(true);
              setTimeout(() => {
                setEndFailedModalVisible(false);
              }, 2000);
            }
          },
        },
      ],
    );
  }

  const onPressCancelAttend = () => {
    Alert.alert(
      '오늘 출결을 취소하시겠습니까?',
      '저장된 오늘 세션 출결이 삭제됩니다',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: async () => {
            setLoading(true);
            const userToken = await getData('user_token');
            const url = '/attend/cancelAttend';
            const body = {
              userToken: userToken,
              session_id: sessionId
            };
            const res = await fetchPost(url, body);
            setLoading(false);
            if(res.result == true) {
              setEndFinModalVisible(true);
              setTimeout(() => {
                setEndFinModalVisible(false);
              }, 2000);
            } else {
              setEndFailedContent(res.result);
              setEndFailedModalVisible(true);
              setTimeout(() => {
                setEndFailedModalVisible(false);
              }, 2000);
            }
          },
        },
      ],
    );
  }
  const [bottomModalVisible, setBottomModalVisible] = useState(false);
  const toggleBottomModal = () => {
    setBottomModalVisible(!bottomModalVisible);
  };
  return (

    <TouchableWithoutFeedback
      onPress={() => setModalVisible(false)}
    >
    <StyledContainer>
      <HeaderDetail title={'출석'} />
      <ScrollView
        style={styles.scrollContainer}
      >
        {sessions?.map((item, index) => (
          <WeekContainer key={index} week={index + 1} item={item} />
        ))}
      </ScrollView>

      {/* 로딩 */}
      <Modal animationType="slide" transparent={true} visible={loading}>
        <View style={styles.circles}>
          <Progress.CircleSnail
            style={styles.progress}
            color={COLORS.green}
          />
        </View>
      </Modal>
      
      {/* 출결 삭제 코드 입력 모달 */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
      >
        <DeleteAttendModal
          deleteCode={deleteCode}
          setDeleteCode={setDeleteCode}
          onPressDeleteAttend={onPressDeleteAttend}
        />
      </Modal>

        {/* 삭제 완료 모달 */}
        <Modal
          isVisible={deleteFinModalVisible}
          onBackdropPress={toggleModal}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}>
          <DeleteFinModal del_code={deleteCode} />
        </Modal>

        {/* 코드 없음 모달 */}
        <Modal
          isVisible={nullCodeModalVisible}
          onBackdropPress={toggleModal}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}>
          <NullCodeModal del_code={deleteCode} />
        </Modal>


      {/* 출결 종료 오류 모달 */}
      <Modal
        isVisible={endFailedModalVisible}
        onBackdropPress={toggleModal}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
      >
        <EndFailedModal
          content={endFailedContent} />
      </Modal>

      {/* 삭제 완료 모달 */}
      <Modal
        isVisible={endFinModalVisible}
        onBackdropPress={toggleModal}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
      >
        <EndFinModal />
      </Modal>
      <BottomModalBtn onPress={toggleBottomModal}>
        <DarkModalBar />
      </BottomModalBtn>
      {!!isToday ? (
        <Modal 
         isVisible={bottomModalVisible}
         onBackdropPress={toggleBottomModal}
         style={{justifyContent: 'flex-end', margin: 0 }}>
          <BottomModalContainer>
            <DarkModalBar />
            <Gap height={20} />
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <ButtonContainer
                onPress={onPressGenerateCode}>
                <View style={styles.codeTextView}>
                  <StyledText
                    fontSize={22}
                    color={COLORS.bg_black}
                    content={codeLoading ? '생성중...' : codeText}
                    />
                </View>
                {codeTimeoutText ? (
                  <View style={styles.codeTextView}>
                    <StyledText
                      fontSize={22}
                      color={COLORS.bg_black}
                      content={codeTimeoutText}
                    />
                  </View>
                ) : null}
              </ButtonContainer>
              <GapH />
              <ButtonContainer
                onPress={() => {
                  toggleBottomModal();
                  toggleModal();
                }}>
                <StyledText
                  fontSize={22}
                  color={COLORS.bg_black}
                  content={'일부 삭제'}
                />
              </ButtonContainer>
            </View>
       
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
            <ButtonContainer
              onPress={onPressEndAttend}>
              <StyledText
                fontSize={22}
                color={COLORS.bg_black}
                content={'출결 종료'}
              />
            </ButtonContainer>
            <GapH />
            <ButtonContainer
              onPress={onPressCancelAttend}>
              <StyledText
                fontSize={22}
                color={COLORS.bg_black}
                content={'전체 취소'}
              />
            </ButtonContainer>
            </View>
          </BottomModalContainer>
        </Modal>
      ) : null}
    </StyledContainer>

    </TouchableWithoutFeedback>
  );
};
const DarkModalBar = styled.View`
  height: 5px;
  width: 15%;
  border-radius: 10px;
  background-color: ${COLORS.light_gray};
`;
const BottomModalBtn = styled.TouchableOpacity`
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  height: 50px;
  background-color: ${COLORS.gray};
  width: 100%;
  align-items: center;
  padding: 16px;
`;
const BottomModalContainer = styled.View`
  background-color: ${COLORS.gray};
  height: 250px;
  padding: 16px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  align-items: center;
`
//스타일시트
const styles = StyleSheet.create({
  progress: {
    margin: 10,
  },
  circles: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  codeTextView: {
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: `${COLORS.gray}`,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  modalInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalInput: {
    flex: 1,
    borderRadius: 13,
    borderColor: COLORS.green,
    borderWidth: 3,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  deleteBtn: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 13,
    backgroundColor: COLORS.green,
  },
  saveBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default AdminAttendanceScreen;
