import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import DrawerNavigationRoutes from './src/screens/DrawerNavigationRoutes';
import SplashScreen from './src/screens/SplashScreen';
import FindAccountScreen from './src/screens/FindAccountScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* 로그인 여부 확인 후 Login / Drawer / Admin으로 navigation */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="FindAccountScreen" component={FindAccountScreen} />
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
