import {View, Text, TouchableOpacity, FlatList, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import StyledContainer from '../../components/StyledContainer';
import HeaderDetail from '../../components/Header';
import {RowView} from '../HomeScreen';
import Modal from 'react-native-modal';
import {StyledSubText, StyledText} from '../../components/Text';
import {COLORS} from '../../assets/Theme';
import {Box} from '../../components/Box';
import {MainButton, RightArrowBtn} from '../../components/Button';
import Gap from '../../components/Gap';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {fetchGet} from '../../utils';
import dayjs from 'dayjs';

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
const AssignmentBox = ({title, due, level, assignLevel}) => {
  const navigation = useNavigation();
  const dateString = due;
  const formattedDate = dayjs(dateString).format('MM.DD ddd HH:mm');
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <>
      <Modal
        isVisible={modalVisible}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 22,
        }}>
        <Pressable
          style={{
            width: '100%',
            height: '100%',
          }}
          onPress={toggleModal}
        />
        <ModalBox>
          <View style={{padding: 20, alignItems: 'center', gap: 5}}>
            <StyledText content={title} />
            <StyledSubText content={formattedDate} />
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
                  assignLevel,
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
            <ModalBtn onPress={() => {}}>
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
              assignLevel,
            })
          }
          onLongPress={() => {
            setModalVisible(true);
          }}>
          <RowView>
            <View>
              <StyledSubText content={`DUE ${formattedDate}`} />
              <Gap height={5} />
              <StyledText content={title} fontSize={20} />
            </View>
            <RightArrowBtn />
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

  const renderItem = ({item}) => {
    // console.log(item);
    return (
      <AssignmentBox
        title={item.title}
        due={item.due_date}
        level={getLevel}
        assignLevel={item.assignschedule_id}
      />
    );
  };
  const getAssigns = async () => {
    const url = `/admin/assign/${getLevel}`;
    try {
      const responseData = await fetchGet(url);
      // console.log('받아온 데이터:', responseData);
      setAssigns(responseData.data);
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
      <View style={{flex: 1}}>
        <FlatList
          data={assigns}
          renderItem={renderItem}
          keyExtractor={item => item.assignschedule_id}
        />
      </View>
      <MainButton
        content={'과제 등록하기'}
        onPress={() => {
          navigation.navigate('AdminCreateAssignment', {level: getLevel});
        }}
        height={60}
      />
    </StyledContainer>
  );
};

export default AdminAssignmentScreen;
