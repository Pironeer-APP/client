import {useNavigation} from '@react-navigation/native';
import {StyledText} from '../components/Text';
import {RowView} from '../screens/HomeScreen';
import {Image, TouchableOpacity, View} from 'react-native';

export const HeaderDetail = props => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <RowView>
      <TouchableOpacity onPress={handleGoBack}>
        <Image
          source={require('../assets/icons/left-arrow.png')}
          style={{width: 20, height: 20}}
        />
      </TouchableOpacity>
      <StyledText content={`${props.title}`} fontSize={24} />
      <View style={{width: 20}} />
    </RowView>
  );
};
