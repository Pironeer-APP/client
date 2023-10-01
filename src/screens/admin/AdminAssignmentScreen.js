import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import StyledContainer from '../../components/StyledContainer';
import HeaderDetail from '../../components/Header';
import {RowView} from '../HomeScreen';
import {StyledSubText, StyledText} from '../../components/Text';
import {COLORS} from '../../assets/Theme';
import {Box} from '../../components/Box';
import {MainButton, RightArrowBtn} from '../../components/Button';
import Gap from '../../components/Gap';
import {Assignmentdata} from '../AssignmentScreen';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {fetchGet} from '../../utils';
import dayjs from 'dayjs';
const AssignmentBox = ({title, due}) => {
  const navigation = useNavigation();
  const dateString = due;
  const formattedDate = dayjs(dateString).format('MM.DD ddd HH:mm');
  return (
    <>
      <Box>
        <TouchableOpacity
          style={{padding: 20}}
          onPress={() => navigation.navigate('AdminGradingScreen', {title})}>
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

const renderItem = ({item}) => {
  console.log(item);
  return <AssignmentBox title={item.title} due={item.due_date} />;
};

const AdminAssignmentScreen = ({route}) => {
  const navigation = useNavigation();
  const [assigns, setAssigns] = useState([]);
  const isFocused = useIsFocused();
  const adminLevel = route.params.userLevel;
  const nonAdminLevel = adminLevel + 1;

  const getAssigns = async () => {
    const url = `/admin/assign/${nonAdminLevel}`;
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
          navigation.navigate('AdminCreateAssignment', {level: nonAdminLevel});
        }}
        height={60}
      />
    </StyledContainer>
  );
};

export default AdminAssignmentScreen;
