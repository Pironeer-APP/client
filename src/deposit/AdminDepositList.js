import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import useAdminDeposit from './use-adminDeposit'
import AdminDepositElement from './AdminDepositElement';

export default function AdminDepositList() {
  const {
    userList,
    fetchData
  } = useAdminDeposit();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView>
      {userList?.map((user) => (
        <AdminDepositElement
          key={user.user_id}
          userInfo={user}
        />
      ))}
    </ScrollView>
  )
}