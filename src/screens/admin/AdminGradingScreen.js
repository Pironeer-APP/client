import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import StyledContainer from '../../components/StyledContainer';
import HeaderDetail from '../../components/Header';
import {useRoute} from '@react-navigation/native';
import {Box} from '../../components/Box';
import {RowView} from '../HomeScreen';
import {StyledText} from '../../components/Text';
import {StatusCircle} from '../AssignmentScreen'; // 0: x / 1, 2: semo / 3: O
import Gap from '../../components/Gap';
import {COLORS} from '../../assets/Theme';
import {Image} from 'react-native-svg';
import {fetchPost, getData} from '../../utils';
import {MediumLoader} from '../../components/Loader';

// const StdGradingData = [
//   {
//     id: 1,
//     name: '정환희',
//     grade: 4,
//   },
//   {
//     id: 2,
//     name: '장민서',
//     grade: 4,
//   },
//   {
//     id: 3,
//     name: '양원채',
//     grade: 4,
//   },
//   {
//     id: 4,
//     name: '민세원',
//     grade: 4,
//   },
//   {
//     id: 5,
//     name: '박석류',
//     grade: 4,
//   },
//   {
//     id: 6,
//     name: '김정곤',
//     grade: 4,
//   },
// ];
const UnSelectedBtn = () => (
  <View
    style={{
      position: 'absolute',
      backgroundColor: 'black',
      opacity: 0.6,
      borderRadius: 50,
      width: '100%',
      height: '100%',
    }}
  />
);

const Student = ({
  id,
  name,
  grade,
  stdId,
  setStdId,
  stdGrade,
  setStdGrade,
  isLastItem,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  // const gradeAndClose = grade => {
  //   setModalVisible(!modalVisible);
  //   setStdGrade(grade);
  // };
  const createGrade = async (grade, assignScheduleId) => {
    const userToken = await getData('user_token');
    const url = `/assign/createAssignGrade`;
    const body = {
      userToken: userToken,
      userId: realStdId,
      assignScheduleId: assignScheduleId,
      inputGrade: grade,
    };
    try {
      await fetchPost(url, body);
      setModalVisible(!modalVisible);
      setStdGrade(grade);
      getStdsData();
    } catch (error) {
      console.log('에러 발생: ', error);
    }
  };
  const updateGrade = async (grade, assignScheduleId) => {
    const userToken = await getData('user_token');
    const url = `/assign/updateAssignGrade`;
    const body = {
      userToken: userToken,
      userId: realStdId,
      assignScheduleId: assignScheduleId,
      updateGrade: grade,
    };
    try {
      await fetchPost(url, body);
      setModalVisible(!modalVisible);
      setStdGrade(grade);
      getStdsData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        isVisible={modalVisible}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        style={styles.centeredView}
        onBackdropPress={toggleModal}>
        <View style={styles.modalView}>
          <StyledText content={`${name}`} fontSize={20} />
          <RowView style={{gap: 20}}>
            <TouchableOpacity
              onPress={
                grade == null
                  ? () => createGrade(4, assignScheduleId)
                  : () => updateGrade(4, assignScheduleId)
              }>
              <StatusCircle grade={4} />
              {grade == undefined ? null : <UnSelectedBtn />}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                grade == null
                  ? () => createGrade(0, assignScheduleId)
                  : () => updateGrade(0, assignScheduleId)
              }>
              <StatusCircle grade={0} />
              {grade == 0 ? null : <UnSelectedBtn />}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                grade == null
                  ? () => createGrade(1, assignScheduleId)
                  : () => updateGrade(1, assignScheduleId)
              }>
              <StatusCircle grade={1} />
              {grade == 1 ? null : <UnSelectedBtn />}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                grade == null
                  ? () => createGrade(3, assignScheduleId)
                  : () => updateGrade(3, assignScheduleId)
              }>
              <StatusCircle grade={3} />
              {grade == 3 ? null : <UnSelectedBtn />}
            </TouchableOpacity>
          </RowView>
        </View>
      </Modal>
      <Box>
        <TouchableOpacity
          style={{padding: 20}}
          onPress={() => {
            setModalVisible(true);
            setStdId(id);
            setStdGrade(grade);
          }}>
          <RowView>
            <StyledText content={name} fontSize={18} />
            <StatusCircle grade={grade} />
          </RowView>
        </TouchableOpacity>
      </Box>

      <Gap height={isLastItem ? 200 : 10} />
    </>
  );
};
const AdminGradingScreen = () => {
  const route = useRoute();
  const title = route.params?.title;
  const level = route.params.level;
  const assignId = route.params.assignId;
  const [stdId, setStdId] = useState(0);
  const [stdGrade, setStdGrade] = useState(null);
  const [stdInfo, setStdInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(level, title, assignId);
  const getStdsData = async () => {
    const userToken = await getData('user_token');
    const url = `/assign/readAssign/detail`;
    const body = {assignId, userToken};
    try {
      const stdDatas = await fetchPost(url, body);

      setStdInfo(stdDatas.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  useEffect(() => {
    getStdsData();
  }, []);
  const renderItem = ({item, index}) => {
    // 마지막 항목이라면 marginBottom을 적용하기 위해
    const isLastItem = index === stdInfo.length - 1;

    return (
      <Student
        id={item.studentId}
        name={item.name}
        grade={item.grade}
        realStdId={item.user_id}
        stdId={stdId}
        setStdId={setStdId}
        stdGrade={stdGrade}
        setStdGrade={setStdGrade}
        isLastItem={isLastItem}
        assignScheduleId={assignId}
        getStdsData={getStdsData}
      />
    );
  };

  //   보낼 값
  // console.log(stdId, stdGrade);
  return (
    <StyledContainer>
      <HeaderDetail title={title} />
      {!!isLoading ? (
        <MediumLoader />
      ) : (
        <View style={{padding: 20}}>
          <FlatList
            data={stdInfo}
            renderItem={renderItem}
            keyExtractor={item => item.studentId}
          />
        </View>
      )}
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
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
    gap: 20,
    position: 'absolute',
  },
});

export default AdminGradingScreen;
