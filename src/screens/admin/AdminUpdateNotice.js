import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import StyledContainer from '../../components/StyledContainer';
import {StyledText} from '../../components/Text';
import HeaderDetail from '../../components/Header';
import {COLORS} from '../../assets/Theme';
import {MainButton} from '../../components/Button';

const AdminUpdateNotice = ({navigation}) => {
  const route = useRoute();
  const post = route.params.post;
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  let category = 1;
  console.log('fe: ', post.post_id);
  const sendDataToServer = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/post/update/${post.post_id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({title, content, category}),
        },
      );

      const result = await response.json();
      navigation.goBack();
      console.log('update', result.message);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  return (
    <StyledContainer>
      <HeaderDetail title={'수정하기'} />

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
export default AdminUpdateNotice;
