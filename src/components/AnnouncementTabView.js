import { View, Text, useWindowDimensions, FlatList, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { TabBar, TabView } from 'react-native-tab-view';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectAllPosts } from '../features/posts/postsSlice';
import { COLORS } from '../assets/Theme';
import styled from 'styled-components';
import MsgForEmptyScreen from './MsgForEmptyScreen';
import PostBox from './PostBox';

const RenderItem = ({item}) => (
  <PostBox
    title={item.title}
    sort={item.category}
    date={item.created_at}
    id={item.post_id}
    read={true}
  />
);

export default function AssignmentTabView() {
  const [refreshing, setRefreshing] = useState(false);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'All' },
    { key: 'second', title: '세션' },
    { key: 'third', title: '과제' },
    { key: 'fourth', title: '기타' },
  ]);

  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);

  const FilteredItems = ({ category }) => {
    const filteredPosts = posts?.filter(item => item.category === category);

    return (
      <View style={{ flex: 1 }}>
        {filteredPosts.length === 0 ? (
          <MsgForEmptyScreen content={'등록된 공지글이 없습니다.'} />
        ) : (
          <FlatList
            style={{ paddingHorizontal: 20, marginBottom: 20 }}
            data={filteredPosts}
            renderItem={RenderItem}
            keyExtractor={item => item.post_id}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => dispatch(fetchPosts())}
                tintColor={COLORS.green}
              />
            }
          />
        )}
      </View>
    );
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return (
          <View style={{ flex: 1 }}>
            {posts.length === 0 ? (
              <MsgForEmptyScreen content={'등록된 공지글이 없습니다.'} />
            ) : (
              <FlatList
                style={{ paddingHorizontal: 20, marginBottom: 20 }}
                data={posts}
                renderItem={RenderItem}
                keyExtractor={item => item.post_id}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => dispatch(fetchPosts())}
                    tintColor={COLORS.green}
                  />
                }
              />
            )}
          </View>
        );
      case 'second':
        return (
          <FilteredItems
            category={1}
          />
        );
      case 'third':
        return (
          <FilteredItems
            category={2}
          />
        );
      case 'fourth':
        return (
          <FilteredItems
            category={3}
          />
        );
      default:
        return null;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => (
        <View style={{ paddingHorizontal: 20 }}>
          <TabBar
            {...props}
            indicatorStyle={{
              backgroundColor: `${COLORS.green}`,
              height: '99%',
              borderWidth: 5,
              borderRadius: 15,
              borderColor: `${COLORS.icon_gray}`,
            }}
            style={{
              backgroundColor: `${COLORS.icon_gray}`,
              fontWeight: 'bold',
              shadowOffset: { height: 0, width: 0 },
              shadowColor: 'transparent',
              borderRadius: 15,
            }}
            pressColor={'transparent'}
            renderLabel={({ route, focused }) => (
              <TabLabel focused={focused}>{route.title}</TabLabel>
            )}
          />
        </View>
      )}
    />
  )
}

const TabLabel = styled.Text`
  color: ${props =>
    props.focused ? `${COLORS.bg_black}` : `${COLORS.textColor}`};
  font-size: 14px;
  font-weight: bold;
`;