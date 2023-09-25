import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import StyledContainer from '../components/StyledContainer';
import HeaderDetail from '../components/Header';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import styled from 'styled-components/native';
import {COLORS} from '../assets/Theme';
import Gap from '../components/Gap';

const FirstRoute = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);
const ThirdRoute = () => <View style={{flex: 1, backgroundColor: '#ff4081'}} />;
const FourthRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
});

const AnnouncementScreen = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
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
              borderColor: `${COLORS.light_gray}`,
            }}
            style={{
              backgroundColor: `${COLORS.light_gray}`,
              fontWeight: 'bold',
              shadowOffset: {height: 0, width: 0},
              shadowColor: 'transparent',
              borderRadius: 15,
              marginBottom: 20,
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

const styles = StyleSheet.create({});
