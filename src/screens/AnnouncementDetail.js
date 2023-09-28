import {View, Text} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import StyledContainer from '../components/StyledContainer';
import HeaderDetail from '../components/Header';
import {useRoute} from '@react-navigation/native';
import {StyledText} from '../components/Text';
import useUserInfo from '../use-userInfo';
import {MainButton} from '../components/Button';
import { fetchGet, fetchPost } from '../utils';

const AnnouncementDetail = ({navigation}) => {
  const [post, setPost] = useState([]);
  const route = useRoute();
  const post_id = route.params.post_id;

  const {userInfo, getUserInfo} = useUserInfo();
  useEffect(() => {
    getUserInfo();
  }, []);

  const getPosts = async () => {
    const url = `/post/20/${post_id}`;
    const res = await fetchGet(url);
    setPost(res.post);
  }

  useEffect(() => {
    getPosts();
  }, []);

  // delete fetch
  const deletePost = async () => {
    const url = `/post/delete/${post.post_id}`;
    const body = {
      post_id: post.post_id
    }
    const res = fetchPost(url, body);
    navigation.goBack();
  };

  return (
    <StyledContainer>
      <HeaderDetail title={'공지'} />
      <StyledText content={`${post?.created_at}`} fontSize={24} />
      <StyledText content={`${post?.category}`} fontSize={24} />
      <StyledText content={`${post?.title}`} fontSize={24} />
      <StyledText content={`${post?.content}`} fontSize={24} />
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
