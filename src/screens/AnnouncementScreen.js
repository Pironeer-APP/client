import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
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

const data = {
  posts: [
    {
      post_id: 1,
      level: 20,
      title: 'test1_title',
      content: 'test1_content',
      category: 1,
      created_at: '2023-09-24T23:48:02.000Z',
      updated_at: '2023-09-24T23:48:02.000Z',
      due_date: null,
    },
    {
      post_id: 2,
      level: 20,
      title: 'test1_title2',
      content: 'test1_content2',
      category: 2,
      created_at: '2023-09-25T01:05:05.000Z',
      updated_at: '2023-09-25T01:05:05.000Z',
      due_date: null,
    },
    {
      post_id: 3,
      level: 20,
      title: 'test1_title3',
      content: 'test1_content3',
      category: 3,
      created_at: '2023-09-25T01:05:20.000Z',
      updated_at: '2023-09-25T01:05:20.000Z',
      due_date: null,
    },
    {
      post_id: 4,
      level: 20,
      title: 'test1_title3',
      content: 'test1_content3',
      category: 3,
      created_at: '2023-09-25T01:05:20.000Z',
      updated_at: '2023-09-25T01:05:20.000Z',
      due_date: null,
    },
    {
      post_id: 5,
      level: 20,
      title: 'test1_title3',
      content: 'test1_content3',
      category: 3,
      created_at: '2023-09-25T01:05:20.000Z',
      updated_at: '2023-09-25T01:05:20.000Z',
      due_date: null,
    },
    {
      post_id: 6,
      level: 20,
      title: 'test1_title3',
      content: 'test1_content3',
      category: 3,
      created_at: '2023-09-25T01:05:20.000Z',
      updated_at: '2023-09-25T01:05:20.000Z',
      due_date: null,
    },
  ],
};

const BadgeCSS = styled.View`
  background-color: ${props => props.color};
  padding: 5px 15px;
  border-radius: 20px;
`;

const Badge = props => {
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
const PostBox = ({title, sort, date, read}) => {
  const dateString = date;
  const formattedDate = dayjs(dateString).format('M.D ddd').toUpperCase();
  return (
    <View>
      <TouchableOpacity>
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
    read={true}
  />
);

const FirstRoute = () => (
  <View style={{flex: 1}}>
    <FlatList
      data={data.posts}
      renderItem={RenderItem}
      keyExtractor={item => item.post_id}
    />
  </View>
);

const FilteredItems = ({category}) => {
  const filteredPosts = data.posts.filter(item => item.category === category);
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={filteredPosts}
        renderItem={RenderItem}
        keyExtractor={item => item.post_id}
      />
    </View>
  );
};

const SecondRoute = () => <FilteredItems category={1} />;
const ThirdRoute = () => <FilteredItems category={2} />;
const FourthRoute = () => <FilteredItems category={3} />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
});

const AnnouncementScreen = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'All'},
    {key: 'second', title: '세션'},
    {key: 'third', title: '과제'},
    {key: 'fourth', title: '기타'},
  ]);

  return (
    <StyledContainer>
      <HeaderDetail title={'공지'} />
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
