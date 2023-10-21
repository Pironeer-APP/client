import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import StyledContainer from '../../components/StyledContainer';
import HeaderDetail from '../../components/Header';
import {useRoute} from '@react-navigation/native';
import {Box} from '../../components/Box';
import {RowView} from '../HomeScreen';
import {StyledSubText, StyledText} from '../../components/Text';
import {StatusCircle} from '../AssignmentScreen'; // 0: x / 1, 2: semo / 3: O
import Gap from '../../components/Gap';
import {COLORS} from '../../assets/Theme';
import {Image} from 'react-native-svg';
import {fetchPost, getData} from '../../utils';
import {MediumLoader} from '../../components/Loader';

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

const GradeBtn = (props) => (
  <View style={styles.gradeBtn}>
    <TouchableOpacity
      onPress={
        props.nowGrade == undefined
          ? () => props.createGrade(props.grade, props.assignScheduleId)
          : () => props.updateGrade(props.grade, props.assignScheduleId)
      }>
      <StatusCircle grade={props.grade} />
      {props.grade == 4 && props.nowGrade == undefined ? null : props.nowGrade == props.grade ? null : <UnSelectedBtn />}
    </TouchableOpacity>
    <Gap height={5} />
    <StyledSubText content={props.btnContent} />
  </View>
)

const Student = ({
  id,
  name,
  grade,
  realStdId,
  stdId,
  setStdId,
  stdGrade,
  setStdGrade,
  assignScheduleId,
  getStdsData,
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
            <GradeBtn
              createGrade={createGrade}
              updateGrade={updateGrade}
              grade={4}
              nowGrade={grade}
              assignScheduleId={assignScheduleId}
              btnContent={'낫옛'}
            />
            <GradeBtn
              createGrade={createGrade}
              updateGrade={updateGrade}
              grade={0}
              nowGrade={grade}
              assignScheduleId={assignScheduleId}
              btnContent={'안함'}
            />
            <GradeBtn
              createGrade={createGrade}
              updateGrade={updateGrade}
              grade={1}
              nowGrade={grade}
              assignScheduleId={assignScheduleId}
              btnContent={'미흡'}
            />
            <GradeBtn
              createGrade={createGrade}
              updateGrade={updateGrade}
              grade={2}
              nowGrade={grade}
              assignScheduleId={assignScheduleId}
              btnContent={'지각'}
            />
            <GradeBtn
              createGrade={createGrade}
              updateGrade={updateGrade}
              grade={3}
              nowGrade={grade}
              assignScheduleId={assignScheduleId}
              btnContent={'완료'}
            />
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
  const [refreshing, setRefreshing] = useState(false);

  // console.log(level, title, assignId);
  const getStdsData = async () => {
    setRefreshing(true);
    const userToken = await getData('user_token');
    const url = `/assign/readAssign/detail`;
    const body = {assignId, userToken};
    try {
      const stdDatas = await fetchPost(url, body);
      setStdInfo(stdDatas.data);
      setIsLoading(false);
      setRefreshing(false);
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
        assignScheduleId={assignId}
        getStdsData={getStdsData}
        isLastItem={isLastItem}
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
        <View>
          <FlatList
            style={{padding: 20}}
            data={stdInfo}
            renderItem={renderItem}
            keyExtractor={item => item.studentId}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={getStdsData}
                tintColor={COLORS.green}
              />
            }
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
  gradeBtn: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AdminGradingScreen;
