import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {StyledSubText, StyledText} from '../components/Text';
import CouponElement from './CouponElement';
import {RowView} from '../screens/HomeScreen';
import {COLORS} from '../assets/Theme';
import styled from 'styled-components';
import Gap from '../components/Gap';

export default function DepositHistoryHeader({
  userInfo,
  adminInfo,
  couponInfo,
  toggleModal,
  onPressDeleteBadge,
}) {
  return (
    <DepositHeaderContainer>
      <StyledText content="보증금 현황" fontSize={16} />
      <RowView>
        <StyledText
          content={userInfo?.deposit?.toLocaleString('en')}
          fontSize={40}
          weight={600}
        />
        <StyledText content="원" fontSize={30} />
      </RowView>
      <Gap height={20} />
      {/* 뱃지 */}
      <BadgeBox>
        <StyledText
          content={`보증금 방어권: ${couponInfo.length}`}
          fontSize={16}
          color={'black'}
          weight={900}
        />
        {!!adminInfo && (
          <Pressable
            style={{
              paddingVertical: 7,
              paddingHorizontal: 12,
              backgroundColor: `${COLORS.deposit_header_blue}`,
              borderRadius: 10,
            }}
            onPress={toggleModal}>
            <StyledText content={'관리'} fontSize={16} weight={900} />
          </Pressable>
        )}
      </BadgeBox>
      <View
        style={{
          width: '100%',
          backgroundColor: COLORS.deposit_header_blue,
          bottom: -50,
          height: 50,
          position: 'absolute',
        }}
      />
    </DepositHeaderContainer>
  );
}
const BadgeBox = styled.View`
  background-color: white;
  padding: 10px 16px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
const DepositHeaderContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.deposit_header_blue};
  padding: 40px 0 60px;
`;
