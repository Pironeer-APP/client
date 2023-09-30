import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import StyledContainer from '../../components/StyledContainer';
import HeaderDetail from '../../components/Header';
import {RowView} from '../HomeScreen';
import {StyledSubText, StyledText} from '../../components/Text';
import {COLORS} from '../../assets/Theme';
import {Box} from '../../components/Box';
import {MainButton, RightArrowBtn} from '../../components/Button';
import Gap from '../../components/Gap';
import {Assignmentdata} from '../AssignmentScreen';
import {useNavigation} from '@react-navigation/native';

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
  return (
    <StyledContainer>
      <HeaderDetail title={'과제 채점'} />
      <View style={{flex: 1}}>
        <FlatList
          data={Assignmentdata}
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
