import {View, Text} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import StyledContainer from '../components/StyledContainer';
import HeaderDetail from '../components/Header';
import {useRoute} from '@react-navigation/native';
import {StyledText} from '../components/Text';
import useUserInfo from '../use-userInfo';
import {MainButton} from '../components/Button';

const AnnouncementDetail = ({navigation}) => {
  const [post, setPost] = useState([]);
  const route = useRoute();
  const post_id = route.params.post_id;

  const {userInfo, getUserInfo} = useUserInfo();
  useEffect(() => {
    getUserInfo();
  }, []);

  const postInMemo = useMemo(() => post, [post]);

  useEffect(() => {
    const url =
      Platform.OS === 'android'
        ? `http://10.0.2.2:3000/api/post/20/${post_id}`
        : `http://localhost:3000/api/post/20/${post_id}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('detail', data.post);

        setPost(data.post);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, [postInMemo]);

  // delete fetch
  const deletePost = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/post/delete/${post.post_id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({post_id}),
        },
      );

      const result = await response.json();
      navigation.goBack();
      console.log('delete', result);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  return (
    <StyledContainer>
      <HeaderDetail title={'공지'} />
      <StyledText content={`${post.created_at}`} fontSize={24} />
      <StyledText content={`${post.category}`} fontSize={24} />
      <StyledText content={`${post.title}`} fontSize={24} />
      <StyledText content={`${post.content}`} fontSize={24} />
      {!!userInfo.is_admin && (
        <>
          <MainButton
            content={'수정하기'}
            onPress={() => navigation.navigate('AdminUpdateNotice', {post})}
            height={70}
          />
          <MainButton content={'삭제하기'} onPress={deletePost} height={70} />
        </>
      )}
    </StyledContainer>
  );
};

export default AnnouncementDetail;
