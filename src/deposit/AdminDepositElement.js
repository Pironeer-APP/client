import { View, Text } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native';

import { COLORS } from '../assets/Theme'
import { FontStyledText } from '../components/Text'
import { RightArrowBtn } from '../components/Button'

export default function AdminDepositElement({userInfo}) {
  const navigation = useNavigation();     
  return (
    // navigate로 스크린에 파라미터 보내는 방법
    <DepositContainer onPress={() => navigation.navigate({name: 'AdminDepositDetail', params: {userInfo: userInfo}})}>
      <FontStyledText style={{fontSize: 20}}>{userInfo.name}</FontStyledText>
      <AmountContainer>
        <FontStyledText style={{fontSize: 20, color: COLORS.green, marginHorizontal: 20}}>{userInfo.deposit.toLocaleString('en')}</FontStyledText>
        <RightArrowBtn />
      </AmountContainer>
    </DepositContainer> 
  )
}

const DepositContainer = styled.TouchableOpacity`
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
background: ${COLORS.gray};
border-radius: 15px;
padding: 25px 30px;
margin: 10px;
`
const AmountContainer = styled.View`
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
`