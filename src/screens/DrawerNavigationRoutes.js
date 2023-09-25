import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import AssignmentScreen from './AssignmentScreen';
import AnnouncementScreen from './AnnouncementScreen';
import DepositScreen from './DepositScreen';
import AttendanceScreen from './AttendanceScreen';
import Settings from './Settings';
import OperationPolicyScreen from './OperationPolicyScreen';

const Stack = createNativeStackNavigator();

export default function DrawerNavigationRoutes() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AssignmentScreen" component={AssignmentScreen} />
      <Stack.Screen name="AnnouncementScreen" component={AnnouncementScreen} />
      <Stack.Screen name="DepositScreen" component={DepositScreen} />
      <Stack.Screen name="AttendanceScreen" component={AttendanceScreen} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="OperationPolicyScreen" component={OperationPolicyScreen} />
    </Stack.Navigator>
  );
}
