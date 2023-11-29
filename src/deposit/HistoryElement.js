import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {StyledSubText, StyledText} from '../components/Text';
import {RowView} from '../screens/HomeScreen';
import Gap, {GapH} from '../components/Gap';
import {COLORS} from '../assets/Theme';
import styled from 'styled-components';

export default function HistoryElement({history}) {
  return (
    <HistoryElementBox>
      <RowView>
        <StyledSubText content={`${history.monthDay}`} />
        <GapH />
        <StyledText content={`${history.type}`} fontSize={18} />
      </RowView>
      <View style={{alignItems: 'flex-end'}}>
        <StyledText
          content={
            history.price < 0
              ? `${history.price?.toLocaleString('en')}원`
              : `+${history.price?.toLocaleString('en')}원`
          }
          fontSize={18}
          weight={600}
          color={history.price < 0 ? 'white' : COLORS.green}
        />
        <Gap height={5} />
        {/* 잔액 */}
        <StyledSubText
          content={
            history.price != 120000
              ? `${history.balance?.toLocaleString('en')}원`
              : '120,000원'
          }
        />
      </View>
    </HistoryElementBox>
  );
}

const HistoryElementBox = styled.View`
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  padding: 30px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.icon_gray};
  /* background-color: white; */
`;
