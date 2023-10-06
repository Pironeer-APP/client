import {View, Text, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import useAdminDeposit from './use-adminDeposit';
import AdminDepositElement from './AdminDepositElement';
import MsgForEmptyScreen from '../components/MsgForEmptyScreen';

export default function AdminDepositList({adminInfo}) {
  const {userList, fetchData} = useAdminDeposit();

  useEffect(() => {
    fetchData();
  }, []);

  if (!userList) {
    return <MsgForEmptyScreen content={'등록된 회원이 없습니다.'} />;
  }
  return (
    <View style={{paddingHorizontal: 20}}>
      <ScrollView>
        {userList?.map(user => (
          <AdminDepositElement
            key={user.user_id}
            userInfo={user}
            adminInfo={adminInfo}
          />
        ))}
        <Gap height={200} />
      </ScrollView>
    </View>
  );
}
