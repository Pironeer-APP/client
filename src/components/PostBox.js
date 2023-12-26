import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import useClientTime from '../use-clientTime';
import { RowView } from '../screens/HomeScreen';
import { PaddingBox } from './Box';
import { StyledSubText, StyledText } from './Text';
import { Badge } from '../screens/AnnouncementScreen';
import styled from 'styled-components';
import Gap, { GapH } from './Gap';

const NotiLayoutView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
`

export default function PostBox({ title, sort, date, id, read }) {
  const navigation = useNavigation();
  const goToAncDet = () => {
    navigation.navigate('AnnouncementDetail', {
      post_id: id,
    });
  };

  const { renderMonth, renderDate, renderDay, renderHour, renderMinute } =
    useClientTime(date);

  const formattedDate = `${renderMonth}.${renderDate} ${renderDay} ${renderHour}:${renderMinute}`;

  return (
    <TouchableOpacity onPress={goToAncDet}>
      <PaddingBox>
        <RowView>
          <StyledSubText content={formattedDate} />
          <Badge sort={sort} />
        </RowView>
        <Gap height={10} />
        <View style={{width: '75%'}}>
        <StyledText content={title} fontSize={24} />
        </View>
      </PaddingBox>
    </TouchableOpacity>
  );
}