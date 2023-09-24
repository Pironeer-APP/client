import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddUserScreen from './AddUserScreen';
import AddUserSuccessScreen from './AddUserSuccessScreen';

const Stack = createNativeStackNavigator();

export default function AdminNavigationRoutes() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AddUserScreen" component={AddUserScreen} />
      <Stack.Screen name="AddUserSuccess" component={AddUserSuccessScreen} />
    </Stack.Navigator>
  )
}