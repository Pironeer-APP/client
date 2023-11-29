import { View, Text, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import useAdminDeposit from './use-adminDeposit';
import AdminDepositElement from './AdminDepositElement';
import MsgForEmptyScreen from '../components/MsgForEmptyScreen';
import { useSelector } from 'react-redux';
import { selectJwt } from '../features/account/accountSlice';

export default function AdminDepositList({ adminInfo }) {
  const { userList, fetchData } = useAdminDeposit();
  const userToken = useSelector(selectJwt);

  useEffect(() => {
    fetchData(userToken);
  }, []);

  if (!userList) {
    return <MsgForEmptyScreen content={'등록된 회원이 없습니다.'} />;
  }
  return (
    <ScrollView>
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        {userList?.map(user => (
          <AdminDepositElement
            key={user.user_id}
            userInfo={user}
            adminInfo={adminInfo}
          />
        ))}
      </View>
    </ScrollView>
  );
}
