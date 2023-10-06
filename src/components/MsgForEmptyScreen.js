import {View} from 'react-native';
import {StyledText} from './Text';

const MsgForEmptyScreen = ({content}) => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <StyledText content={content} color={'white'} fontSize={18} />
  </View>
);

export default MsgForEmptyScreen;
