import {Alert, Platform} from 'react-native';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

class PermissionCheck {
  cmmDevicePlatformCheck = () => {
    let isUseDevice = true;
    if (Platform.OS !== 'ios' && Platform.OS !== 'android') !isUseDevice;
    return isUseDevice;
  };

  cmmReqPermission = async selectImages => {
    if (!this.cmmDevicePlatformCheck()) return;
    const platformPermissions =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.PHOTO_LIBRARY;
    try {
      const result = await request(platformPermissions);

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
  };
}

const permissionCheck = new PermissionCheck();
export default permissionCheck;
