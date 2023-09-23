import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import React from 'react';
import {COLORS} from '../assets/Theme';
import styled from 'styled-components/native';
import {StyledText} from '../components/Text';
import {Box} from '../components/Box';

const StyledContainer = styled.SafeAreaView`
  background-color: black;
  flex: 1;
  padding: ${Platform.OS === 'android' ? '20px' : 0};
`;

const Header = () => (
  <View>
    <Image
      source={require('../assets/images/headerLogo.png')}
      style={{width: 50, height: 50}}
    />
  </View>
);

const Gap = () => <View style={{height: 20}}></View>;

const HomeScreen = () => {
  return (
    <StyledContainer>
      <ScrollView>
        <Header />
        <Gap />
        <StyledText
          content={'20기 김피로님 \n오늘은 대면 세션 날이에요'}
          fontSize={24}
        />
        <Gap />
        <Box>
          <StyledText content={'과제'} fontSize={24} />
        </Box>
        <Gap />
        <View
          style={{
            flexDirection: 'row',
            gap: 20,
          }}>
          <View style={{flex: 1}}>
            <Box>
              <StyledText content={'출석체크'} fontSize={24} />
            </Box>
          </View>
          <View style={{gap: 20, flex: 1}}>
            <Box>
              <StyledText content={'보증금'} fontSize={24} />
            </Box>
            <Box style={{height: 350}}>
              <StyledText content={'공지'} fontSize={24} />
            </Box>
          </View>
        </View>
        <Gap />
        <StyledText
          content={'피로그래밍을 알차게 즐기고 싶다면?'}
          fontSize={20}
        />
        <Gap />
        <Box>
          <StyledText content={'공식 홈페이지 바로가기'} fontSize={20} />
        </Box>
        <Gap />
        <Box>
          <StyledText content={'노션 바로가기'} fontSize={20} />
        </Box>
        <Gap />
        <Box>
          <StyledText content={'피로스퀘어 바로가기'} fontSize={20} />
        </Box>
      </ScrollView>
    </StyledContainer>
  );
};

export default HomeScreen;
