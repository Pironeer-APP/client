import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import DrawerNavigationRoutes from './src/screens/DrawerNavigationRoutes';
import SplashScreen from './src/screens/SplashScreen';
import FindAccountScreen from './src/screens/FindAccountScreen';
import {PermissionsAndroid, Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { sendToken } from './src/utils';
import store from './src/app/store';
import { Provider } from 'react-redux'

const Stack = createNativeStackNavigator();

export default function App() {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  // const getFcmToken = async () => {
  //   const fcmToken = await messaging().getToken();
  //   console.log('[FCM Token] ', fcmToken);
  //   try {
  //     await sendToken(fcmToken);
  //   } catch(error) {
  //     console.log(error);
  //   }
  // };
 
  // useEffect(() => {
  //   getFcmToken();
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('[Remote Message] ', JSON.stringify(remoteMessage));
  //     // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });
  //   return unsubscribe;
  // }, []);

  return (
    <Provider store={store}>
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
    </Provider>
  );
}
