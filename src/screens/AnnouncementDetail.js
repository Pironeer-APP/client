import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import dayjs from 'dayjs';
import StyledContainer from '../components/StyledContainer';
import HeaderDetail from '../components/Header';
import {useRoute, useIsFocused} from '@react-navigation/native';
import {StyledSubText, StyledText} from '../components/Text';
import useUserInfo from '../use-userInfo';
import {MainButton} from '../components/Button';
import {fetchGet, fetchPost} from '../utils';
import {Badge} from './AnnouncementScreen';
import {RowView} from './HomeScreen';
import Gap from '../components/Gap';
import {COLORS} from '../assets/Theme';
import styled from 'styled-components';

const StyledBottomLine = styled.View`
  height: 1px;
  background-color: ${COLORS.light_gray};
  margin: 5px 0 20px 0;
`;
const TitleBottomLine = () => <StyledBottomLine />;

const AnnouncementDetail = ({navigation}) => {
  const [post, setPost] = useState([]);
  const route = useRoute();
  const post_id = route.params.post_id;

  const {
    userInfoFromServer,
    getUserInfoFromServer
  } = useUserInfo();
  useEffect(() => {
    getUserInfoFromServer();
  }, []);

  const isFocused = useIsFocused();
  const getPost = async () => {
    const url = `/post/20/${post_id}`;
    const res = await fetchGet(url);
    setPost(res.post);
  };
  useEffect(() => {
    getPost();
  }, [isFocused]);

  // delete fetch
  const deletePost = async () => {
    const url = `/post/delete/${post_id}`;
    const body = {post_id};
    try {
      await fetchPost(url, body);
      navigation.navigate('AnnouncementScreen');
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const dateString = post.created_at;
  const formattedDate = dayjs(dateString).format('M.D ddd').toUpperCase();
  return (
    <StyledContainer>
      <HeaderDetail title={'공지'} />
      <RowView>
        <RowView style={{gap: 10}}>
          <StyledSubText content={`${formattedDate}`} />
          <Badge sort={post.category} />
        </RowView>
        {!!userInfoFromServer.is_admin && (
          <RowView style={{gap: 10}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AdminUpdateNotice', {post})}>
              <StyledSubText content={'수정'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={deletePost}>
              <StyledSubText content={'삭제'} />
            </TouchableOpacity>
          </RowView>
        )}
      </RowView>
      <Gap />
      <StyledText content={`${post.title}`} />
      <TitleBottomLine />
      <StyledText content={`${post.content}`} fontSize={20} />
    </StyledContainer>
  );
};

export default AnnouncementDetail;
