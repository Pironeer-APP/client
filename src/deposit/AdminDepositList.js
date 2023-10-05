import {View, Text, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import useAdminDeposit from './use-adminDeposit';
import AdminDepositElement from './AdminDepositElement';

export default function AdminDepositList({adminInfo}) {
  const {userList, fetchData} = useAdminDeposit();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{padding: 20}}>
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
