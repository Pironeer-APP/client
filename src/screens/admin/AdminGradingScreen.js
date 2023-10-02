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
import {fetchPost} from '../../utils';

const StdGradingData = [
  {
    id: 1,
    name: '정환희',
    grade: 4,
  },
  {
    id: 2,
    name: '장민서',
    grade: 4,
  },
  {
    id: 3,
    name: '양원채',
    grade: 4,
  },
  {
    id: 4,
    name: '민세원',
    grade: 4,
  },
  {
    id: 5,
    name: '박석류',
    grade: 4,
  },
  {
    id: 6,
    name: '김정곤',
    grade: 4,
  },
];
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

const Student = ({id, name, grade, stdId, setStdId, stdGrade, setStdGrade}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const gradeAndClose = grade => {
    setModalVisible(!modalVisible);
    setStdGrade(grade);
  };

  return (
    <>
      <Modal
        isVisible={modalVisible}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        style={styles.centeredView}>
        <Pressable
          style={{
            width: '100%',
            height: '100%',
          }}
          onPress={toggleModal}
        />
        <View style={styles.modalView}>
          <StyledText content={`${name}`} fontSize={20} />
          <RowView style={{gap: 20}}>
            <TouchableOpacity onPress={() => gradeAndClose(4)}>
              <StatusCircle grade={4} />
              {grade == 4 || grade === undefined ? null : <UnSelectedBtn />}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => gradeAndClose(0)}>
              <StatusCircle grade={0} />
              {grade == 0 ? null : <UnSelectedBtn />}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => gradeAndClose(1)}>
              <StatusCircle grade={1} />
              {grade == 1 ? null : <UnSelectedBtn />}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => gradeAndClose(3)}>
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
      <Gap height={10} />
    </>
  );
};
const AdminGradingScreen = () => {
  const route = useRoute();
  const title = route.params?.title;
  const level = route.params.level;
  const assignLevel = route.params.assignLevel;
  const [stdId, setStdId] = useState(0);
  const [stdGrade, setStdGrade] = useState(4);

  console.log(level, title, assignLevel);
  const getStdsData = async () => {
    const url = `/admin/assign/${level}/${assignLevel}`;
    const body = {title};
    try {
      const stdDatas = await fetchPost(url, body);
      console.log('stdDatas: ', stdDatas);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  useEffect(() => {
    getStdsData();
  }, []);
  const renderItem = ({item}) => {
    return (
      <Student
        id={item.id}
        name={item.name}
        grade={item.grade}
        stdId={stdId}
        setStdId={setStdId}
        stdGrade={stdGrade}
        setStdGrade={setStdGrade}
      />
    );
  };

  //   보낼 값
  console.log(stdId, stdGrade);
  return (
    <StyledContainer>
      <HeaderDetail title={title} />

      <FlatList
        data={StdGradingData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
