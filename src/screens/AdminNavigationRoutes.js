import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminHomeScreen from './AdminHomeScreen';
import AddUserScreen from './AddUserScreen';
import AddUserSuccessScreen from './AddUserSuccessScreen';
import GradeAssignScreen from './GradeAssignScreen';

const Stack = createNativeStackNavigator();

export default function AdminNavigationRoutes() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen} />
      <Stack.Screen name="GradeAssignScreen" component={GradeAssignScreen} />
      <Stack.Screen name="AddUserScreen" component={AddUserScreen} />
      <Stack.Screen name="AddUserSuccess" component={AddUserSuccessScreen} />
    </Stack.Navigator>
  )
}