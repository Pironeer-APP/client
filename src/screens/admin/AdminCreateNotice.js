import {
  View,
  Text,
  useWindowDimensions,
  FlatList,
  Platform,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import HeaderDetail from '../../components/Header';
import StyledContainer from '../../components/StyledContainer';
import {StyledText} from '../../components/Text';
import {useRoute} from '@react-navigation/native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {COLORS} from '../../assets/Theme';
import {MainButton} from '../../components/Button';

const FirstRoute = () => <View style={{height: 1, backgroundColor: 'blue'}} />;
const SecondRoute = () => null;
const ThirdRoute = () => null;

const AdminCreateNotice = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const route = useRoute();
  const [routes] = useState([
    {key: 'first', title: '세션'},
    {key: 'second', title: '과제'},
    {key: 'third', title: '기타'},
  ]);
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute />;
      case 'second':
        return <SecondRoute />;
      case 'third':
        return <ThirdRoute />;
      default:
        return null;
    }
  };
  let category = 1;
  const navigation = useNavigation();

  const sendDataToServer = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/post/create/20', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, content, category}),
      });

      const result = await response.json();
      console.log('create', result);
      navigation.goBack();
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  return (
    <StyledContainer>
      <HeaderDetail title={'글 작성하기'} />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{
              backgroundColor: `${COLORS.green}`,
              height: 47,
              borderWidth: 5,
              borderRadius: 15,
              borderColor: `${COLORS.icon_gray}`,
            }}
            style={{
              backgroundColor: `${COLORS.icon_gray}`,
              fontWeight: 'bold',
              shadowOffset: {height: 0, width: 0},
              shadowColor: 'transparent',
              borderRadius: 15,
            }}
            pressColor={'transparent'}
            renderLabel={({route, focused}) => (
              <TabLabel focused={focused}>{route.title}</TabLabel>
            )}
          />
        )}
      />
      <View style={{flex: 1}}>
        <TextInput
          placeholder="제목"
          value={title}
          onChangeText={text => setTitle(text)}
          placeholderTextColor={COLORS.light_gray}
          style={styles.textInputTitle}
        />
        <TextInput
          placeholder="내용"
          value={content}
          onChangeText={text => setContent(text)}
          placeholderTextColor={COLORS.light_gray}
          style={styles.textInputContent}
          multiline={true}
        />
      </View>
      <MainButton content={'완료'} onPress={sendDataToServer} />
    </StyledContainer>
  );
};
const TabLabel = styled.Text`
  color: ${props =>
    props.focused ? `${COLORS.bg_black}` : `${COLORS.textColor}`};
  font-size: 14px;
  font-weight: bold;
`;

const styles = StyleSheet.create({
  inputWrapper: {
    paddingVertical: 15,
  },
  textInputTitle: {
    color: 'white',
    height: 60,
    marginBottom: 15,
    borderWidth: 2,
    fontSize: 25,
    borderBottomColor: COLORS.light_gray,
  },
  textInputContent: {
    color: 'white',
    height: 60,
    marginBottom: 15,
    fontSize: 20,
    flex: 1,
  },
});
export default AdminCreateNotice;
