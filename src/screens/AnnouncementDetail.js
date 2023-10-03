import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import dayjs from 'dayjs';
import StyledContainer from '../components/StyledContainer';
import HeaderDetail from '../components/Header';
import {useRoute, useIsFocused} from '@react-navigation/native';
import {StyledSubText, StyledText} from '../components/Text';
import useUserInfo from '../use-userInfo';
import {MainButton} from '../components/Button';
import {fetchGet, fetchPost, getAPIHost, getData} from '../utils';
import {Badge} from './AnnouncementScreen';
import {RowView} from './HomeScreen';
import Gap from '../components/Gap';
import {COLORS} from '../assets/Theme';
import styled from 'styled-components';
import {Box} from '../components/Box';
import AutoHeightImage from 'react-native-auto-height-image';

const StyledBottomLine = styled.View`
  height: 1px;
  background-color: ${COLORS.light_gray};
  margin: 5px 0 20px 0;
`;
const TitleBottomLine = () => <StyledBottomLine />;

export function convertToUrl(url) {
  const host =
    Platform.OS === 'ios' ? 'http://127.0.0.1:3000/' : 'http://10.0.2.2:3000/';
  const FULL_URL = host + url;
  return FULL_URL.replace(/\\/g, '/');
}
const AnnouncementDetail = ({navigation}) => {
  const [post, setPost] = useState([]);
  const [images, setImages] = useState([]);
  const route = useRoute();
  const post_id = route.params.post_id;

  const {userInfoFromServer, getUserInfoFromServer} = useUserInfo();
  useEffect(() => {
    getUserInfoFromServer();
  }, []);

  const isFocused = useIsFocused();
  const getPost = async () => {
    const url = `/post/detail`;
    const userToken = await getData('user_token');
    const body = {userToken, post_id};
    const res = await fetchPost(url, body);
    setPost(res.post);
    setImages(res.result);
  };
  useEffect(() => {
    getPost();
  }, [isFocused]);

  const imagesUrl = images.map(img => convertToUrl(img));
  // console.log('imagesUrl: ', imagesUrl);

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

  const dateString = `${post.created_at}`;
  const date = new Date(dateString);
  date.setHours(date.getHours() + 9);
  const RenderDate = dayjs(date).format('M.D ddd').toUpperCase();

  const windowWidth = Dimensions.get('window').width;

  return (
    <StyledContainer>
      <HeaderDetail title={'공지'} />
      <ScrollView>
        <RowView>
          <RowView style={{gap: 10}}>
            <StyledSubText content={`${RenderDate}`} />
            <Badge sort={post.category} />
          </RowView>
          {!!userInfoFromServer.is_admin && (
            <RowView style={{gap: 10}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AdminUpdateNotice', {post, imagesUrl})
                }>
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
        <Gap height={10} />
        {imagesUrl.map((image, index) => (
          <AutoHeightImage
            key={index}
            source={{uri: image}}
            width={windowWidth}
            style={{borderRadius: 10, marginBottom: 10}}
          />
        ))}
      </ScrollView>
    </StyledContainer>
  );
};

export default AnnouncementDetail;
