import {
  FlatList,
  Platform,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import dayjs from 'dayjs';
import StyledContainer from '../components/StyledContainer';
import HeaderDetail from '../components/Header';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import styled from 'styled-components/native';
import {COLORS} from '../assets/Theme';
import Gap from '../components/Gap';
import {Box, PaddingBox} from '../components/Box';
import {StyledSubText, StyledText} from '../components/Text';
import {RowView} from './HomeScreen';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {MainButton} from '../components/Button';
import {useRoute} from '@react-navigation/native';
import {fetchGet, fetchPost, getData} from '../utils';
import useUserInfo from '../use-userInfo';
import {MediumLoader} from '../components/Loader';
import MsgForEmptyScreen from '../components/MsgForEmptyScreen';
import {create} from 'react-test-renderer';
import useClientTime from '../use-clientTime';

const BadgeCSS = styled.View`
  background-color: ${props => props.color};
  padding: 5px 15px;
  border-radius: 20px;
`;

export const Badge = props => {
  if (props.sort === 1) {
    return (
      <BadgeCSS color={`${COLORS.badge_skyblue}`}>
        <StyledText content={'세션'} fontSize={16} />
      </BadgeCSS>
    );
  } else if (props.sort === 2) {
    return (
      <BadgeCSS color={`${COLORS.badge_orange}`}>
        <StyledText content={'과제'} fontSize={16} />
      </BadgeCSS>
    );
  } else if (props.sort === 3) {
    return (
      <BadgeCSS color={`${COLORS.badge_green}`}>
        <StyledText content={'기타'} fontSize={16} />
      </BadgeCSS>
    );
  }
};
const PostBox = ({title, sort, date, id, read}) => {
  const navigation = useNavigation();
  const goToAncDet = () => {
    navigation.navigate('AnnouncementDetail', {
      post_id: id,
    });
  };

  const {renderMonth, renderDate, renderDay, renderHour, renderMinute} =
    useClientTime(date);

  const formattedDate = `${renderMonth}.${renderDate} ${renderDay} ${renderHour}:${renderMinute}`;

  return (
    <View>
      <TouchableOpacity onPress={goToAncDet}>
        <PaddingBox style={{marginTop: 0}}>
          <RowView>
            <StyledSubText content={formattedDate} />
            <Badge sort={sort} />
          </RowView>
          <StyledText content={title} fontSize={24} />
        </PaddingBox>
      </TouchableOpacity>
    </View>
  );
};
const RenderItem = ({item}) => (
  <PostBox
    title={item.title}
    sort={item.category}
    date={item.created_at}
    id={item.post_id}
    read={true}
  />
);

const FirstRoute = ({posts}) => (
  <View style={{flex: 1}}>
    {posts.length === 0 ? (
      <MsgForEmptyScreen content={'등록된 공지글이 없습니다.'} />
    ) : (
      <FlatList
        data={posts}
        renderItem={RenderItem}
        keyExtractor={item => item.post_id}
      />
    )}
  </View>
);

const FilteredItems = ({category, posts}) => {
  const filteredPosts = posts?.filter(item => item.category === category);

  return (
    <View style={{flex: 1}}>
      {filteredPosts.length === 0 ? (
        <MsgForEmptyScreen content={'등록된 공지글이 없습니다.'} />
      ) : (
        <FlatList
          data={filteredPosts}
          renderItem={RenderItem}
          keyExtractor={item => item.post_id}
        />
      )}
    </View>
  );
};

const SecondRoute = ({posts}) => <FilteredItems category={1} posts={posts} />;
const ThirdRoute = ({posts}) => <FilteredItems category={2} posts={posts} />;
const FourthRoute = ({posts}) => <FilteredItems category={3} posts={posts} />;

const AnnouncementScreen = ({navigation}) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'All'},
    {key: 'second', title: '세션'},
    {key: 'third', title: '과제'},
    {key: 'fourth', title: '기타'},
  ]);

  const [posts, setPosts] = useState([]);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const getPosts = async () => {
    const url = '/post/all';
    userToken = await getData('user_token');
    body = {userToken};
    const res = await fetchPost(url, body);
    setPosts(res.posts);
    setIsLoading(false);
  };
  useEffect(() => {
    getPosts();
  }, [isFocused]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute posts={posts} />;
      case 'second':
        return <SecondRoute posts={posts} />;
      case 'third':
        return <ThirdRoute posts={posts} />;
      case 'fourth':
        return <FourthRoute posts={posts} />;
      default:
        return null;
    }
  };

  const {userInfoFromServer, getUserInfoFromServer} = useUserInfo();
  useEffect(() => {
    getUserInfoFromServer();
  }, []);

  return (
    <StyledContainer>
      <HeaderDetail title={'공지'} />
      {!!isLoading ? (
        <MediumLoader />
      ) : (
        <View style={{flex: 1, paddingHorizontal: 20}}>
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
          {!!userInfoFromServer.is_admin && (
            <MainButton
              content={'글 작성하기'}
              onPress={() => navigation.navigate('AdminCreateNotice')}
              height={60}
            />
          )}
        </View>
      )}
    </StyledContainer>
  );
};

const TabLabel = styled.Text`
  color: ${props =>
    props.focused ? `${COLORS.bg_black}` : `${COLORS.textColor}`};
  font-size: 14px;
  font-weight: bold;
`;

export default AnnouncementScreen;
