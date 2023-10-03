import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {StyledSubText, StyledText} from '../components/Text';
import CouponElement from './CouponElement';
import {RowView} from '../screens/HomeScreen';
import {COLORS} from '../assets/Theme';
import styled from 'styled-components';
import Gap from '../components/Gap';

export default function DepositHistoryHeader(props) {
  return (
    <DepositHeaderContainer>
      <StyledText content="보증금 현황" fontSize={16} />
      <RowView>
        <StyledText
          content={props.userInfo?.deposit?.toLocaleString('en')}
          fontSize={40}
          weight={600}
        />
        <StyledText content="원" fontSize={30} />
      </RowView>
      <Gap height={20} />
      {/* 뱃지 */}
      <BadgeBox>
        <StyledText
          content={`보유 쿠폰: ${props.couponInfo.length}`}
          fontSize={16}
          color={'black'}
          weight={900}
        />
      </BadgeBox>
    </DepositHeaderContainer>
  );
}
const BadgeBox = styled.View`
  background-color: white;
  padding: 10px 16px;
  border-radius: 10px;
`;
const DepositHeaderContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.deposit_header_blue};
  padding: 40px 0 60px;
`;
