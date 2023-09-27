import { View, Text, TouchableOpacity, ScrollView, Button } from 'react-native';
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
import { RightArrowBtn } from '../../components/Button'
import { useNavigation } from '@react-navigation/native';

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

const AttendanceStatus = (props) => {
  return (
    <View>
      <StyledSubText content={props.title} />
      <StyledText content={props.content} fontSize={props.fontSize} />
    </View>
  )
}

const AdminAttendanceElement = ({userInfo}) => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };

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
          <View style={{ backgroundColor: `${COLORS.gray}`, padding: 16, minHeight: 500 }}>
            <View style={{ alignItems: 'center' }}>
              <StyledText content={'출석 사항 변경'} fontSize={25} />
            </View>
            <AttendanceStatus title={'Name'} content={userInfo.name} fontSize={20} />
            <Button title="Close" onPress={toggleBottomSheet} />
          </View>
        </Modal>
    </View>
  )
};

const AdminAttendanceList = () => {
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
        />
      ))}
    </ScrollView>
  )
}

const AdminAttendanceDetailScreen = ({route}) => {
  const month = route.params.month;
  const day = route.params.day;
  return (
    <StyledContainer>
      <HeaderDetail title={`${month}월 ${day}일 출석`} />
      <AdminAttendanceList />
    </StyledContainer>
  )
}

export default AdminAttendanceDetailScreen