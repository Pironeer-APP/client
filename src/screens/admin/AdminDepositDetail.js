import React from 'react';

import HeaderDetail from '../../components/Header';
import StyledContainer from '../../components/StyledContainer';

export default function AdminDepositDetail({ route, navigation }) {
  const userInfo = route.params.userInfo;
  return (
    <StyledContainer>
      <HeaderDetail title={`${userInfo.name}님의 보증금 관리`} />
    </StyledContainer>
  );
}
