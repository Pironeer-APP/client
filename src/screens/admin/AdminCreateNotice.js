import {
  View,
  Text,
  useWindowDimensions,
  FlatList,
  Platform,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
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
import {fetchPost} from '../../utils';
import {Box} from '../../components/Box';
import {RowView} from '../HomeScreen';

export const Camera = () => (
  <TouchableOpacity>
    <Image
      source={require('../../assets/icons/camera.png')}
      style={{width: 30, height: 30}}
    />
  </TouchableOpacity>
);

export const ChooseCategory = ({category, setCategory}) => {
  const PressedCat = ({index, content}) => {
    let color = COLORS.green;
    if (index === category) {
      color = COLORS.green;
    } else {
      color = COLORS.light_gray;
    }
    return (
      <TouchableOpacity onPress={() => setCategory(index)}>
        <StyledText content={content} fontSize={17} color={color} />
      </TouchableOpacity>
    );
  };
  return (
    <Box>
      <View style={{paddingVertical: 15, paddingHorizontal: 20}}>
        <RowView>
          <StyledText content={'카테고리 선택'} fontSize={17} />
          <RowView style={{width: '40%'}}>
            <PressedCat index={1} content={'세션'} />
            <PressedCat index={2} content={'과제'} />
            <PressedCat index={3} content={'기타'} />
          </RowView>
        </RowView>
      </View>
    </Box>
  );
};
const AdminCreateNotice = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(1); // 1: 세션, 2: 과제, 3: 기타

  const navigation = useNavigation();
  const sendDataToServer = async () => {
    const url = '/post/create/20';
    const body = {title, content, category};
    try {
      await fetchPost(url, body);
      navigation.goBack();
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  return (
    <StyledContainer>
      <HeaderDetail
        title={'글 작성하기'}
        button={'완료'}
        buttonOnPress={sendDataToServer}
      />

      <View>
        <ChooseCategory category={category} setCategory={setCategory} />
      </View>

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
        <Camera />
      </View>
    </StyledContainer>
  );
};

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
