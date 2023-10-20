import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import StyledContainer from '../components/StyledContainer';
import {StyledText} from '../components/Text';
import {SettingsItem} from '../settings/UserSection';
import {PaddingBox} from '../components/Box';
import HeaderDetail from '../components/Header';
import Gap, {GapH} from '../components/Gap';
import {RowView} from './HomeScreen';

export default function OperationPolicyScreen() {
  const navigation = useNavigation();
  const onPressOSS = () => navigation.push('OSSScreen');
  const onPressLab = () => navigation.push('LabScreen');

  return (
    <StyledContainer>
      <HeaderDetail title="이용안내" />
      <View style={{paddingHorizontal: 20}}>
        <ScrollView>
          <Gap height={10} />
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <StyledText content="앱 버전" fontSize={18} />
            <GapH width={5} />
            <StyledText content="1.0.0" fontSize={16} />
          </View>
          <Gap height={10} />
          <PaddingBox>
            <SettingsItem text="공지사항" />
          </PaddingBox>
          <PaddingBox>
            <SettingsItem text="서비스 이용 약관" />
          </PaddingBox>
          <PaddingBox>
            <SettingsItem text="오픈소스 라이선스" onPress={onPressOSS} />
          </PaddingBox>
          <PaddingBox>
            <SettingsItem text="실험실" onPress={onPressLab} />
          </PaddingBox>
        </ScrollView>
      </View>
    </StyledContainer>
  );
}
