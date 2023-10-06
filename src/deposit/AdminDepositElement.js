import {View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

import {COLORS} from '../assets/Theme';
import {FontStyledText, StyledSubText, StyledText} from '../components/Text';
import {RightArrowBtn, UnTouchableRightArrow} from '../components/Button';
import {Box} from '../components/Box';
import Gap from '../components/Gap';
import {RowView} from '../screens/HomeScreen';

const DepositIcon = ({deposit}) => {
  let iconSource;
  if (deposit >= 100000) {
    iconSource = require('../assets/icons/deposit-good.png');
  } else if (deposit >= 50000) {
    iconSource = require('../assets/icons/deposit-soso.png');
  } else {
    iconSource = require('../assets/icons/deposit-bad.png');
  }
  return (
    <Image
      source={iconSource}
      style={{
        resizeMode: 'contain',
        width: 40,
        height: 40,
        marginRight: 20,
      }}
    />
  );
};

export default function AdminDepositElement({userInfo, adminInfo}) {
  const navigation = useNavigation();

  return (
    <>
      <Box>
        <DepositContainer
          onPress={() =>
            navigation.navigate({
              name: 'AdminDepositDetail',
              params: {userInfo: userInfo, adminInfo: adminInfo},
            })
          }>
          <RowView>
            <DepositIcon deposit={userInfo.deposit} />

            <View>
              <StyledText
                content={`${userInfo.deposit.toLocaleString('en')}원`}
                fontSize={14}
                color={COLORS.green}
              />
              {Platform.OS === 'ios' ? <Gap height={5} /> : null}

              <StyledText content={userInfo.name} fontSize={20} />
            </View>
          </RowView>

          <UnTouchableRightArrow />
        </DepositContainer>
      </Box>
      <Gap height={10} />
    </>
  );
}

const DepositContainer = styled.TouchableOpacity`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
