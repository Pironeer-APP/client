import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import AssignmentScreen from './AssignmentScreen';
import AnnouncementScreen from './AnnouncementScreen';
import DepositScreen from './DepositScreen';
import AttendanceScreen from './AttendanceScreen';
import Settings from './Settings';
import OperationPolicyScreen from './OperationPolicyScreen';
import AnnouncementDetail from './AnnouncementDetail';
import AdminDepositDetail from './admin/AdminDepositDetail';
import AdminCreateNotice from './admin/AdminCreateNotice';
import GradeAssignScreen from './admin/GradeAssignScreen';
import AdminSessionScreen from './admin/AdminSessionScreen';
import AddUserScreen from './admin/AddUserScreen';
import AddUserSuccessScreen from './admin/AddUserSuccessScreen';
import AdminAddSessionScreen from './admin/AdminAddSessionScreen';
import CheckScreen from '../settings/screens/CheckScreen';
import UpdateScreen from '../settings/screens/UpdateScreen';
import UpdateSuccessScreen from '../settings/screens/UpdateSuccessScreen';
import AdminUpdateNotice from './admin/AdminUpdateNotice';
import AdminAttendanceScreen from './admin/AdminAttendanceScreen';
import AdminAttendanceDetailScreen from './admin/AdminAttendanceDetailScreen';
import AdminAssignmentScreen from './admin/AdminAssignmentScreen';
import AdminCreateAssignment from './admin/AdminCreateAssignment';
import AdminGradingScreen from './admin/AdminGradingScreen';
import AdminUpdateAssign from './admin/AdminUpdateAssign';
import OSSScreen from './OSSScreen';
import LabScreen from './LabScreen';

const Stack = createNativeStackNavigator();

export default function DrawerNavigationRoutes() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AssignmentScreen" component={AssignmentScreen} />
      <Stack.Screen name="AnnouncementScreen" component={AnnouncementScreen} />
      <Stack.Screen name="AnnouncementDetail" component={AnnouncementDetail} />
      <Stack.Screen name="DepositScreen" component={DepositScreen} />
      <Stack.Screen name="AttendanceScreen" component={AttendanceScreen} />

      {/* 전체 설정 */}
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="CheckScreen" component={CheckScreen} />
      <Stack.Screen name="UpdateScreen" component={UpdateScreen} />
      <Stack.Screen
        name="UpdateSuccessScreen"
        component={UpdateSuccessScreen}
      />

      <Stack.Screen
        name="OperationPolicyScreen"
        component={OperationPolicyScreen}
      />
      <Stack.Screen
        name="OSSScreen"
        component={OSSScreen}
      />
      <Stack.Screen
        name="LabScreen"
        component={LabScreen}
      />

      {/* 관리자 */}
      <Stack.Screen
        name="AdminAttendanceScreen"
        component={AdminAttendanceScreen}
      />
      <Stack.Screen
        name="AdminAttendanceDetailScreen"
        component={AdminAttendanceDetailScreen}
      />
      <Stack.Screen
        name="AdminAssignmentScreen"
        component={AdminAssignmentScreen}
      />
      <Stack.Screen
        name="AdminCreateAssignment"
        component={AdminCreateAssignment}
      />
      <Stack.Screen name="AdminUpdateAssign" component={AdminUpdateAssign} />
      <Stack.Screen name="AdminGradingScreen" component={AdminGradingScreen} />
      <Stack.Screen name="AdminDepositDetail" component={AdminDepositDetail} />
      <Stack.Screen name="GradeAssignScreen" component={GradeAssignScreen} />

      <Stack.Screen name="AdminCreateNotice" component={AdminCreateNotice} />
      <Stack.Screen name="AdminUpdateNotice" component={AdminUpdateNotice} />
      <Stack.Screen name="AdminSessionScreen" component={AdminSessionScreen} />
      <Stack.Screen
        name="AdminAddSessionScreen"
        component={AdminAddSessionScreen}
      />
      <Stack.Screen name="AddUserScreen" component={AddUserScreen} />
      <Stack.Screen name="AddUserSuccess" component={AddUserSuccessScreen} />
    </Stack.Navigator>
  );
}
