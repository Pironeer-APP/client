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

const AssignmentBox = ({title, due}) => {
  const navigation = useNavigation();
  return (
    <>
      <Box>
        <TouchableOpacity
          style={{padding: 20}}
          onPress={() => navigation.navigate('AdminGradingScreen', {title})}>
          <RowView>
            <View>
              <StyledSubText content={due} />
              <Gap height={5} />
              <StyledText content={title} />
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
  return <AssignmentBox title={item.title} due={item.due_date} />;
};

const AdminAssignmentScreen = () => {
  const navigation = useNavigation();
  const [assigns, setAssigns] = useState([]);
  const isFocused = useIsFocused();

  const getAssigns = async () => {
    const url = `/admin/assign/20`;
    const res = await fetchGet(url);
    setAssigns(res.posts);
    console.log(res);
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
          keyExtractor={item => item.id}
        />
      </View>
      <MainButton
        content={'과제 등록하기'}
        onPress={() => {
          navigation.navigate('AdminCreateAssignment');
        }}
        height={60}
      />
    </StyledContainer>
  );
};

export default AdminAssignmentScreen;
