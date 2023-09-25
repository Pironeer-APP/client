import {View, Text} from 'react-native';
import React from 'react';
import HeaderDetail from '../../components/Header';
import StyledContainer from '../../components/StyledContainer';

const AdminCreateNotice = () => {
  return (
    <StyledContainer>
      <HeaderDetail title={'글 작성하기'} />
    </StyledContainer>
  );
};

export default AdminCreateNotice;
