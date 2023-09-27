import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import StyledContainer from '../../components/StyledContainer';
import {StyledText} from '../../components/Text';
import HeaderDetail from '../../components/Header';
import {COLORS} from '../../assets/Theme';
import {MainButton} from '../../components/Button';
import {ChooseCategory} from './AdminCreateNotice';
import {fetchPost} from '../../utils';

const AdminUpdateNotice = () => {
  const route = useRoute();
  const post = route.params.post;
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [category, setCategory] = useState(post.category);
  const navigation = useNavigation();

  const updatePost = async () => {
    const url = `/post/update/${post.post_id}`;
    const body = {title, content, category};
    try {
      await fetchPost(url, body);
      navigation.navigate('AnnouncementScreen');
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  return (
    <StyledContainer>
      <HeaderDetail
        title={'수정하기'}
        button={'완료'}
        buttonOnPress={updatePost}
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
    borderWidth: 1,
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
