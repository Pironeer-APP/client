import { View, Text, TouchableOpacity, ScrollView, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import React, { useEffect, useState } from 'react';
import styled from "styled-components/native";
import { COLORS } from "../../assets/Theme";
import { StyledSubText, StyledText } from '../../components/Text';
import StyledContainer from '../../components/StyledContainer';
import HeaderDetail from '../../components/Header';
import { Dimensions } from 'react-native';
import useAdminDeposit from '../../deposit/use-adminDeposit'
import { FontStyledText } from '../../components/Text'
// import { RightArrowBtn } from '../../components/Button'
import { useNavigation } from '@react-navigation/native';
import { MainButton } from '../../components/Button'
import { fetchPost, getData } from '../../utils';
import { useIsFocused } from '@react-navigation/native';

// const useAdminAttendance = () => {
//   const 
// }
// 그냥 useAdminDeposit을 사용해서 해당 기수 전체 유저를 가져와보겠음

const DepositContainer = styled.TouchableOpacity`
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
background: ${COLORS.gray};
border-radius: 15px;
padding: 25px 30px;
margin: 10px;
`
const AmountContainer = styled.View`
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`

const AttendanceCircle = styled.View`
width: 30px;
height: 30px;
border-radius: 50px;
background-color: ${COLORS.light_gray};
`

//출석, 지각, 결석 버튼
const AttendanceStatusButton = (props) => {
  return (
    <TouchableOpacity 
    onPress={props.onPress}
    style={{ borderRadius: 10, backgroundColor: `${props.bgColor}`, width: 100, height: 50, alignItems: 'center', justifyContent: 'center' }}
    >
      <StyledText content={props.content} fontSize={props.fontSize} />
    </TouchableOpacity>
  )
}

//해당 학생 이름, 날짜, 출석상태
const AttendanceStatus = (props) => {
  return (
    <View>
      <View style={{ marginBottom: 5 }}>
        <StyledSubText content={props.title} />
      </View>
      <StyledText content={props.content} fontSize={props.fontSize} />
    </View> 
  )
}

const AdminAttendanceElement = ({rerender, setRerender, session_id, userInfo, month, day}) => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const navigation = useNavigation();

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };

  //출석, 지각, 결석 버튼 색깔 바꾸기
  const btnColors = [
    COLORS.icon_gray,
    COLORS.green,
    'orange',
    'red'
  ]
  const [selectedBtn, setSelectedBtn] = useState(0);

  const handleSelectBtn = (type) => {
    // type 0: 선택X type 1: 출석 type 2: 지각 type 3: 결석
    setSelectedBtn(type);
  }

  const onPressUpdateAttend = async () => {
    const attendType = selectedBtn === 0 ? null : selectedBtn === 1 ? '출석' : selectedBtn === 2 ? '지각' : '결석';
    const url = '/attend/updateAttend';
    const body = {
      user_id: userInfo.user_id,
      attendType: attendType,
      session_id: session_id
    }
    const result = await fetchPost(url, body);
    console.log(result);
    setBottomSheetVisible(!isBottomSheetVisible);
    setSelectedBtn(0);
    setRerender(!rerender);
  }

  return (
    <View>
      <DepositContainer onPress={toggleBottomSheet}>
        <FontStyledText style={{fontSize: 20}}>{userInfo.name}</FontStyledText>
        <AmountContainer>
          <AttendanceCircle />  
        </AmountContainer>
      </DepositContainer>
      {/* 바텀 모달 */}
        <Modal 
        isVisible={isBottomSheetVisible}
        onBackdropPress={toggleBottomSheet}
        style={{ justifyContent: 'flex-end', margin: 0 }}
        >
          <View style={styles.modalContainer}>
            <View style={{ alignItems: 'center', marginTop: 10}}>
              <StyledText content={'출석 사항 변경'} fontSize={25} />
            </View>
            <View style={{ marginVertical: 35 }}>
              <AttendanceStatus title={'Name'} content={userInfo.name} fontSize={35} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between' }}>
              <AttendanceStatus title={'Date'} content={`${month}월 ${day}일`} fontSize={25} style={{}}/>
              <AttendanceStatus title={'Status'} content={userInfo.type} fontSize={25}/>
              <AttendanceStatus title={''} content={''} fontSize={25}/>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 60 }}>
              <AttendanceStatusButton content={'출석'} fontSize={25} onPress={() => handleSelectBtn(1)} bgColor={selectedBtn === 0 || selectedBtn === 1 ? btnColors[selectedBtn] : btnColors[0]}/>
              <AttendanceStatusButton content={'지각'} fontSize={25} onPress={() => handleSelectBtn(2)} bgColor={selectedBtn === 0 || selectedBtn === 2 ? btnColors[selectedBtn] : btnColors[0]}/>
              <AttendanceStatusButton content={'결석'} fontSize={25} onPress={() => handleSelectBtn(3)} bgColor={selectedBtn === 0 || selectedBtn === 3 ? btnColors[selectedBtn] : btnColors[0]}/>
            </View>
            <View style={{flex:1, justifyContent: 'center'}}>
              <MainButton height={60} content={'변경'} onPress={onPressUpdateAttend} />
            </View>
          </View>
        </Modal>
    </View>
  )
};

const AdminAttendanceList = (props) => {
  return (
    <ScrollView>
      {props.attends?.map((user) => (
        <AdminAttendanceElement
          key={user.user_id}
          session_id={props.session_id}
          userInfo={user}
          month={props.month}
          day={props.day}
          rerender={props.rerender}
          setRerender={props.setRerender}
        />
      ))}
    </ScrollView>
  )
}

const AdminAttendanceDetailScreen = ({route}) => {
  const month = route.params.month;
  const day = route.params.day;
  const session_id = route.params.session_id;
  
  const [attends, setAttends] = useState();
  const [rerender, setRerender] = useState(false);

  const getAttends = async () => {
    const userToken = await getData('user_token');
    const url = '/attend/getSessionAttendAdmin';
    const body = {
      userToken: userToken,
      session_id: session_id,
    }
    const result = await fetchPost(url, body);
    setAttends(result.attends);
  }
  
  useEffect(() => {
    getAttends();
  }, [rerender]);

  return (
    <StyledContainer>
      <HeaderDetail title={`${month}월 ${day}일 출석`} />
      <AdminAttendanceList 
          rerender={rerender}
          setRerender={setRerender}
          session_id={session_id} attends={attends} month={month} day={day}/>
    </StyledContainer>
  )
}

//스타일시트
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: `${COLORS.gray}`,
    padding: 16, 
    minHeight: 500, 
    borderTopRightRadius: 20, 
    borderTopLeftRadius: 20,
    paddingHorizontal: 30,
  },
})

export default AdminAttendanceDetailScreen