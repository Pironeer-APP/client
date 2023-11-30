import {
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import StyledContainer from '../components/StyledContainer';
import HeaderDetail from '../components/Header';
import styled from 'styled-components/native';
import {COLORS} from '../assets/Theme';
import {StyledText} from '../components/Text';
import {MainButton} from '../components/Button';
import {MediumLoader} from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccount } from '../features/account/accountSlice';
import { fetchPosts } from '../features/posts/postsSlice';
import AssignmentTabView from '../components/AnnouncementTabView';

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

const AnnouncementScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const postStatus = useSelector(state => state.posts.status);

  const account = useSelector(selectAccount);

  useEffect(() => {
    if(postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch])

  return (
    <StyledContainer>
      <HeaderDetail title={'공지'} />
      {postStatus === 'loading' ? (
        <MediumLoader />
      ) : (
        <View style={{flex: 1}}>
          <AssignmentTabView />
          {!!account.is_admin && (
            <View style={{paddingHorizontal: 20}}>
            <MainButton
              content={'글 작성하기'}
              onPress={() => navigation.navigate('AdminCreateNotice')}
            />
            </View>
          )}
        </View>
      )}
    </StyledContainer>
  );
};

export default AnnouncementScreen;
