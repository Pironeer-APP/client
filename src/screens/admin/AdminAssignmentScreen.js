import {
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import StyledContainer from '../../components/StyledContainer';
import HeaderDetail from '../../components/Header';
import {RowView} from '../HomeScreen';
import Modal from 'react-native-modal';
import {StyledSubText, StyledText} from '../../components/Text';
import {COLORS} from '../../assets/Theme';
import {Box} from '../../components/Box';
import {MainButton, UnTouchableRightArrow} from '../../components/Button';
import Gap from '../../components/Gap';
import {useNavigation} from '@react-navigation/native';
import MsgForEmptyScreen from '../../components/MsgForEmptyScreen';
import {MediumLoader} from '../../components/Loader';
import useClientTime from '../../use-clientTime';
import { client } from '../../api/client';
import { getData } from '../../api/asyncStorage';
import { fetchAssigns, selectAllAssigns } from '../../features/assigns/assignsSlice';

const ModalBox = styled.View`
  background-color: ${COLORS.gray};
  border-radius: 20px;
  width: 80%;
  align-items: center;
  position: absolute;
`;
const ModalBtn = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  padding: 20px;
`;
const AssignmentBox = ({
  createdAt,
  title,
  due,
  assignId,
}) => {
  const navigation = useNavigation();

  const {renderMonth, renderDate, renderDay, renderHour, renderMinute} =
    useClientTime(createdAt);
  const {
    renderMonth: dueMonth,
    renderDate: dueDate,
    renderDay: dueDay,
    renderHour: dueHour,
    renderMinute: dueMinute,
  } = useClientTime(due);

  const dispatch = useDispatch();

  const formattedDate = `${renderMonth}.${renderDate} ${renderDay}`;
  const formattedDue = `${dueMonth}.${dueDate} ${dueDay}`;
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const deleteAssign = async deleteId => {
    const userToken = await getData('user_token');
    const url = `/assign/deleteAssign`;
    const body = {
      userToken: userToken,
      deleteId: deleteId,
    };
    console.log('body: ', body);

    try {
      await client.post(url, body);
      dispatch(fetchAssigns()); // 재랜더링되어야 함
      toggleModal();
    } catch (error) {
      // 네트워크 오류 또는 예외 처리
      console.error(error);
    }
  };
  
  return (
    <>
      <Modal
        isVisible={modalVisible}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={toggleModal}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 22,
        }}>
        <ModalBox>
          <View style={{padding: 20, alignItems: 'center', gap: 5}}>
            <StyledText content={title} />
            <StyledSubText content={`${formattedDate} ~ ${formattedDue}`} />
          </View>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: `${COLORS.light_gray}`,
            }}
          />
          <RowView>
            <ModalBtn
              onPress={() => {
                toggleModal();
                navigation.navigate('AdminUpdateAssign', {
                  title,
                  due,
                  assignId,
                });
              }}>
              <StyledText
                content={'수정'}
                fontSize={20}
                color={`${COLORS.green}`}
              />
            </ModalBtn>
            <View
              style={{
                width: 1,
                height: '100%',
                backgroundColor: `${COLORS.light_gray}`,
              }}
            />
            <ModalBtn
              onPress={() => {
                deleteAssign(assignId);
              }}>
              <StyledText content={'삭제'} fontSize={20} color={'red'} />
            </ModalBtn>
          </RowView>
        </ModalBox>
      </Modal>
      <Box>
        <TouchableOpacity
          style={{padding: 20}}
          onPress={() =>
            navigation.navigate('AdminGradingScreen', {
              title,
              assignId,
            })
          }
          onLongPress={() => {
            setModalVisible(true);
          }}>
          <RowView>
            <View>
              <StyledSubText content={`${formattedDate} ~ ${formattedDue}`} />
              {/* <StyledSubText content={`~ ${formattedDue}`} /> */}
              <Gap height={5} />
              <StyledText content={title} fontSize={20} />
            </View>
            <UnTouchableRightArrow />
          </RowView>
        </TouchableOpacity>
      </Box>
      <Gap height={10} />
    </>
  );
};

const AdminAssignmentScreen = ({route}) => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const renderItem = ({item}) => {
    return (
      <AssignmentBox
        key={item.AssignId}
        createdAt={item.created_at}
        title={item.title}
        due={item.due_date}
        assignId={item.assignschedule_id}
      />
    );
  };

  const assignment = useSelector(selectAllAssigns);

  const assignStatus = useSelector(state => state.assigns.status);

  return (
    <StyledContainer>
      <HeaderDetail title={'과제 채점'} />
      {assignStatus === 'loading' ? (
        <MediumLoader />
      ) : assignment.length === 0 ? (
        <View style={{flex: 1, paddingHorizontal: 20}}>
          <MsgForEmptyScreen content={'등록된 과제가 없습니다.'} />
          <MainButton
            content={'과제 등록하기'}
            onPress={() => {
              navigation.navigate('AdminCreateAssignment');
            }}
            height={60}
          />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <FlatList
              style={{paddingHorizontal: 20}}
              data={assignment}
              renderItem={renderItem}
              keyExtractor={item => item.assignschedule_id}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => dispatch(fetchAssigns())}
                  tintColor={COLORS.green}
                />
              }
            />
          </View>
          <View
           style={{paddingHorizontal: 20}}
          >
          <MainButton
            content={'과제 등록하기'}
            onPress={() => {
              navigation.navigate('AdminCreateAssignment');
            }}
            height={60}
          />
          </View>
        </View>
      )}
    </StyledContainer>
  );
};

export default AdminAssignmentScreen;
