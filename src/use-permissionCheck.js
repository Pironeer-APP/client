import {Alert, Platform} from 'react-native';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {PermissionsAndroid} from 'react-native';

class PermissionCheck {
  cmmDevicePlatformCheck = () => {
    let isUseDevice = true;
    if (Platform.OS !== 'ios' && Platform.OS !== 'android') !isUseDevice;
    return isUseDevice;
  };
 
  cmmReqPermission = async selectImages => {
    if (!this.cmmDevicePlatformCheck()) return;
    if (Platform.OS === 'ios') {
      const permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
      try {
        const result = await request(permission);
  
        if (result == RESULTS.GRANTED) {
          console.log('권한이 허용되었습니다.');
          selectImages();
        } else {
          Alert.alert('갤러리 접근 권한을 허용해주세요');
        }
      } catch (err) {
        Alert.alert('Images permission err');
        console.warn(err);
      }


    } else if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        ]).then((result) => {
          if (result['android.permission.READ_EXTERNAL_STORAGE'] && result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted') {
            console.log('모든 권한 획득');
            selectImages();
          }
          else {
            console.log('거절된 권한있음')
          }
        })
      } catch (err) {
        console.warn(err);
      }
    }
  };
}


const permissionCheck = new PermissionCheck();
export default permissionCheck;
