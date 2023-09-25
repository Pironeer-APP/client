import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminHomeScreen from './admin/AdminHomeScreen';
import AddUserScreen from './admin/AddUserScreen';
import AddUserSuccessScreen from './admin/AddUserSuccessScreen';
import GradeAssignScreen from './admin/GradeAssignScreen';
import AdminSessionScreen from './admin/AdminSessionScreen';
import AdminDepositScreen from './admin/AdminDepositScreen';
import AdminDepositDetail from './admin/AdminDepositDetail';
import Settings from './Settings';

const Stack = createNativeStackNavigator();

export default function AdminNavigationRoutes() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen} />
      <Stack.Screen name="AdminDepositScreen" component={AdminDepositScreen} />
      <Stack.Screen name="AdminDepositDetail" component={AdminDepositDetail} />
      <Stack.Screen name="GradeAssignScreen" component={GradeAssignScreen} />
      <Stack.Screen name="AdminSessionScreen" component={AdminSessionScreen} />
      <Stack.Screen name="AddUserScreen" component={AddUserScreen} />
      <Stack.Screen name="AddUserSuccess" component={AddUserSuccessScreen} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  )
}