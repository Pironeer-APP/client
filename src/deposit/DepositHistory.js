import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import StyledContainer from '../components/StyledContainer';
import {StyledText} from '../components/Text';
import useAdminDepositDetail from './use-depositDetail';
import {RowView} from '../screens/HomeScreen';
import CouponElement from './CouponElement';
import HistoryElement from './HistoryElement';
import {COLORS} from '../assets/Theme';
import styled from 'styled-components';

export default function DepositHistory(props) {
  // 보증금 계산 로직은 필요 없음 => 출결 상황에 따라 userInfo.deposit이 update될 예정
  // 따라서 새로고침의 구현을 위해 userInfo는 여기서 fetch로 받아와야 함

  // 출결 이력과 과제 이력을 합쳐야 함

  return (
    <DepositHistoryBox>
      {/* 이력 */}
      <ScrollView>
        {props.depositHistory?.map(history => (
          <HistoryElement key={history.SEQ} history={history} />
        ))}
      </ScrollView>
    </DepositHistoryBox>
  );
}
const DepositHistoryBox = styled.View`
  flex: 1;
  padding-bottom: 60px;
  background-color: ${COLORS.gray};
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;
