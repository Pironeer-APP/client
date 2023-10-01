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

const AdminAttendanceElement = ({userInfo, month, day}) => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };

  //출석, 지각, 결석 버튼 색깔 바꾸기
  const [changeGreen, setChangeGreen] = useState(`${COLORS.icon_gray}`);
  const [changeOrange, setChangeOrange] = useState(`${COLORS.icon_gray}`);
  const [changeRed, setChangeRed] = useState(`${COLORS.icon_gray}`);

  const handleColor1 = () => { 
    setChangeGreen(`${COLORS.green}`);
    setChangeOrange(`${COLORS.icon_gray}`);
    setChangeRed(`${COLORS.icon_gray}`);
  }

  const handleColor2 = () => {
    setChangeGreen(`${COLORS.icon_gray}`);
    setChangeOrange('orange');
    setChangeRed(`${COLORS.icon_gray}`);
  }

  const handleColor3 = () => {
    setChangeGreen(`${COLORS.icon_gray}`);
    setChangeOrange(`${COLORS.icon_gray}`);
    setChangeRed('red');
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
              <AttendanceStatus title={'Status'} content={'결석'} fontSize={25}/>
              <AttendanceStatus title={''} content={''} fontSize={25}/>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 60 }}>
              <AttendanceStatusButton content={'출석'} fontSize={25} onPress={handleColor1} bgColor={changeGreen}/>
              <AttendanceStatusButton content={'지각'} fontSize={25} onPress={handleColor2} bgColor={changeOrange}/>
              <AttendanceStatusButton content={'결석'} fontSize={25} onPress={handleColor3} bgColor={changeRed}/>
            </View>
            <View style={{flex:1, justifyContent: 'center'}}>
              <MainButton height={60} content={'변경'} onPress={'d'} />
            </View>
          </View>
        </Modal>
    </View>
  )
};

const AdminAttendanceList = (props) => {
  const {
    userList,
    fetchData
  } = useAdminDeposit();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView>
      {userList?.map((user) => (
        <AdminAttendanceElement
          key={user.user_id}
          userInfo={user}
          month={props.month}
          day={props.day}
        />
      ))}
    </ScrollView>
  )
}

const AdminAttendanceDetailScreen = ({route}) => {
  const month = route.params.month;
  const day = route.params.day;
  // const date = [month, day];
  return (
    <StyledContainer>
      <HeaderDetail title={`${month}월 ${day}일 출석`} />
      <AdminAttendanceList month={month} day={day}/>
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