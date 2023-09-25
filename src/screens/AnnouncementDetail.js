import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import StyledContainer from '../components/StyledContainer';
import HeaderDetail from '../components/Header';
import {useRoute} from '@react-navigation/native';
import {StyledText} from '../components/Text';

const AnnouncementDetail = () => {
  const [post, setPost] = useState([]);
  const route = useRoute();
  const post_id = route.params.post_id;

  useEffect(() => {
    const url =
      Platform.OS === 'android'
        ? `http://10.0.2.2:3000/api/post/20/${post_id}`
        : `http://localhost:3000/api/post/20/${post_id}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data.post);
        setPost(data.post);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);
  return (
    <StyledContainer>
      <HeaderDetail title={'공지'} />
      <StyledText content={`${post.created_at}`} fontSize={24} />
      <StyledText content={`${post.category}`} fontSize={24} />
      <StyledText content={`${post.title}`} fontSize={24} />
      <StyledText content={`${post.content}`} fontSize={24} />
    </StyledContainer>
  );
};

export default AnnouncementDetail;
