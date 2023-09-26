import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import HeaderDetail from '../../components/Header'
import StyledContainer from '../../components/StyledContainer'
import { ProgressBar, RowView } from '../HomeScreen'
import { StyledText } from '../../components/Text'
import { Box } from '../../components/Box'
import { MainButton } from '../../components/Button'
import { useNavigation } from '@react-navigation/native';
// grade(과제 결과 INT값)
// title(과제 제목)
// due_date(마감 기한)
// created_at(공지 생성 시각)
const data = [
  {
    id: 1,
    date: '7.20',
    day: 'MON',
    title: '피로그래머 카드게임',
    status: 'donggrami',
    // donggrami / semo / ex
    done: false,
  },
  {
    id: 2,
    date: '7.22',
    day: 'TUE',
    title: '피로그래머 카드게임',
    done: true,
  },
  {
    id: 3,
    date: '7.22',
    day: 'TUE',
    title: '피로그래머 카드게임',
    done: true,
  },
  {
    id: 4,
    date: '7.22',
    day: 'TUE',
    title: '피로그래머 카드게임',
    done: true,
  },
  {
    id: 5,
    date: '7.22',
    day: 'TUE',
    title: '피로그래머 카드게임',
    done: true,
  },
  {
    id: 6,
    date: '7.22',
    day: 'TUE',
    title: '피로그래머 카드게임',
    done: true,
  },
];
const StatusCircle = () => (
  <View
    style={{
      width: 40,
      height: 40,
      borderRadius: 40,
      backgroundColor: 'white',
    }}></View>
);
const InProgressAsgBox = () => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
      marginBottom: 20,
    }}>
    <StatusCircle />
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
      }}>
      <Box>
        <View style={{padding: 20}}>
          <RowView style={{marginBottom: 10}}>
            <StyledText content={'7.20 MON'} fontSize={16} />
            <StyledText content={'DUE 7.22'} fontSize={16} />
          </RowView>
          <StyledText content={'피로그래머 카드게임'} fontSize={20} />
          <RowView style={{marginTop: 10}}>
            <ProgressBar status={'30%'} />
            <StyledText content={'18:38:43'} fontSize={16} />
          </RowView>
        </View>
      </Box>
    </View>
  </View>
);
const DoneAsgBox = () => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    }}>
    <StatusCircle />
    <View
      style={{
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
      }}>
      <View style={{padding: 20}}>
        <RowView style={{marginBottom: 10}}>
          <View>
            <StyledText content={'7.22'} fontSize={20} />
            <StyledText content={'TUE'} fontSize={20} />
          </View>
          <View style={{flex: 1, marginLeft: 20}}>
            <StyledText content={'피로그래머 카드게임'} fontSize={20} />
          </View>
        </RowView>
      </View>
    </View>
  </View>
);
const renderItem = ({item}) => {
  return <>{item.done === false ? <InProgressAsgBox /> : <DoneAsgBox />}</>;
};
export default function AdminSessionScreen() {
  const navigation = useNavigation();
  const onPressAddSchedule = () => {
    navigation.navigate('AdminAddSessionScreen');
  }
  return (
    <StyledContainer>
      <HeaderDetail title={'과제'} />
      <View style={{flex: 1}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <MainButton content="일정 추가하기" onPress={onPressAddSchedule} />
    </StyledContainer>
  );
};
