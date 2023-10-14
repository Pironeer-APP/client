import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {fetchPost, getData} from '../../utils';
import dayjs from 'dayjs';
import MsgForEmptyScreen from '../../components/MsgForEmptyScreen';
import {MediumLoader} from '../../components/Loader';
import useClientTime from '../../use-clientTime';

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
  level,
  assignId,
  getAssigns,
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

  const formattedDate = `${renderMonth}.${renderDate} ${renderDay}`;
  const formattedDue = `${dueMonth}.${dueDate} ${dueDay}`;
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    getAssigns();
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
      await fetchPost(url, body);
      toggleModal(); // 재랜더링되어야 함
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
                  level,
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
              level,
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
  const [assigns, setAssigns] = useState([]);
  const isFocused = useIsFocused();
  const getLevel = route.params.userLevel;
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const renderItem = ({item}) => {
    // console.log(item);
    return (
      <AssignmentBox
        createdAt={item.created_at}
        title={item.title}
        due={item.due_date}
        level={getLevel}
        assignId={item.assignschedule_id}
        getAssigns={getAssigns}
      />
    );
  };
  const getAssigns = async () => {
    setRefreshing(true);
    const userToken = await getData('user_token');
    const url = `/assign/readAssign/all`;
    const body = {
      userToken: userToken,
    };
    // console.log('body: ', body);
    try {
      const responseData = await fetchPost(url, body);
      console.log('받아온 데이터: ', responseData);
      setAssigns(responseData.data);
      setIsLoading(false);
      setRefreshing(false);
    } catch (error) {
      // 네트워크 오류 또는 예외 처리
      console.error(error);
    }
  };

  useEffect(() => {
    getAssigns();
  }, [isFocused]);

  return (
    <StyledContainer>
      <HeaderDetail title={'과제 채점'} />
      {!!isLoading ? (
        <MediumLoader />
      ) : assigns.length === 0 ? (
        <View style={{flex: 1, paddingHorizontal: 20}}>
          <MsgForEmptyScreen content={'등록된 과제가 없습니다.'} />
          <MainButton
            content={'과제 등록하기'}
            onPress={() => {
              navigation.navigate('AdminCreateAssignment', {level: getLevel});
            }}
            height={60}
          />
        </View>
      ) : (
        <View style={{flex: 1, paddingHorizontal: 20}}>
          <View style={{flex: 1}}>
            <FlatList
              data={assigns}
              renderItem={renderItem}
              keyExtractor={item => item.assignschedule_id}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={getAssigns}
                  tintColor={COLORS.green}
                />
              }
            />
          </View>
          <MainButton
            content={'과제 등록하기'}
            onPress={() => {
              navigation.navigate('AdminCreateAssignment', {level: getLevel});
            }}
            height={60}
          />
        </View>
      )}
    </StyledContainer>
  );
};

export default AdminAssignmentScreen;
