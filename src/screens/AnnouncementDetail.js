import {
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
  Alert,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import StyledContainer from '../components/StyledContainer';
import HeaderDetail from '../components/Header';
import {useRoute, useIsFocused} from '@react-navigation/native';
import {StyledSubText, StyledText} from '../components/Text';
import {Badge} from './AnnouncementScreen';
import {RowView} from './HomeScreen';
import Gap from '../components/Gap';
import {COLORS} from '../assets/Theme';
import styled from 'styled-components';
import AutoHeightImage from 'react-native-auto-height-image';
import useClientTime from '../use-clientTime';
import { client } from '../api/client';
import { getData } from '../api/asyncStorage';
import { useDispatch, useSelector } from 'react-redux';
import { _IOS_HOST, _ANDROID_AVD_HOST } from '../variables';
import { selectAccount } from '../features/account/accountSlice';
import { fetchPosts } from '../features/posts/postsSlice';

const StyledBottomLine = styled.View`
  height: 1px;
  background-color: ${COLORS.light_gray};
  margin: 5px 0 20px 0;
`;
const TitleBottomLine = () => <StyledBottomLine />;

export function convertToUrl(url) {
  const host =
    Platform.OS === 'ios' ? _IOS_HOST : _ANDROID_AVD_HOST;
  const FULL_URL = host + url;
  return FULL_URL.replace(/\\/g, '/');
}
const AnnouncementDetail = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [post, setPost] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesUrl, setImagesUrl] = useState([]);
  const route = useRoute();
  const post_id = route.params.post_id;

  const dispatch = useDispatch();
  const account = useSelector(selectAccount);

  const isFocused = useIsFocused();
  const getPost = async () => {
    setRefreshing(true);
    const url = `/post/detail`;
    const body = { post_id };
    console.log(body);
    const res = await client.post(url, body);
    setPost(res.post);
    setImages(res.result);
    setRefreshing(false);
    dispatch(fetchPosts());
  };
  useEffect(() => {
    getPost();
  }, [isFocused]);

  useEffect(() => {
    setImagesUrl(images.map(img => convertToUrl(img)));
  }, [images])

  // delete fetch
  const OnPressDeletePost = () => {
    Alert.alert('글을 삭제하시겠습니까?', '', [
      {
        text: '취소',
        style: 'cancel',
      },
      {text: '삭제', onPress: () => deletePost()},
    ]);
  };

  const deletePost = async () => {
    const url = `/post/delete/`;
    const body = { post_id };

    try {
      await client.post(url, body);
      // await pushNoti({title: '공지가 삭제되었습니다.', body: ''});
      dispatch(fetchPosts());
      navigation.navigate('AnnouncementScreen');
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const {renderMonth, renderDate, renderDay} = useClientTime(post.created_at);
  const RenderDate = `${renderMonth}.${renderDate} ${renderDay}`;

  const windowWidth = Dimensions.get('window').width;

  return (
    <StyledContainer>
      <HeaderDetail title={'공지'} />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={getPost}
              tintColor={COLORS.green}
            />
          }>
            <View style={{paddingHorizontal: 20, flex: 1}}>
          <RowView>
            <RowView style={{gap: 10}}>
              <StyledSubText content={`${RenderDate}`} />
              <Badge sort={post.category} />
            </RowView>
            {!!account.is_admin && (
              <RowView style={{gap: 10}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('AdminUpdateNotice', {post, imagesUrl})
                  }>
                  <StyledSubText content={'수정'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={OnPressDeletePost}>
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
              width={windowWidth - 40}
              style={{borderRadius: 10, marginBottom: 10}}
            />
          ))}
          <Gap height={200} />
          </View>
        </ScrollView>
    </StyledContainer>
  );
};

export default AnnouncementDetail;
