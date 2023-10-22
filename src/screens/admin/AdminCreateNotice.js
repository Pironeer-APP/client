import {
  View,
  Text,
  useWindowDimensions,
  FlatList,
  Platform,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  NativeModules,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import HeaderDetail from '../../components/Header';
import StyledContainer from '../../components/StyledContainer';
import {StyledText} from '../../components/Text';
import {COLORS} from '../../assets/Theme';
import {fetchPost, getAPIHost, getData, pushNoti} from '../../utils';
import {Box} from '../../components/Box';
import {RowView} from '../HomeScreen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import permissionCheck from '../../use-permissionCheck';

export const ChooseCategory = ({category, setCategory}) => {
  const PressedCat = ({index, content}) => {
    let color = COLORS.green;
    if (index === category) {
      color = COLORS.green;
    } else {
      color = COLORS.light_gray;
    }
    return (
      <TouchableOpacity onPress={() => setCategory(index)}>
        <StyledText content={content} fontSize={17} color={color} />
      </TouchableOpacity>
    );
  };
  return (
    <Box>
      <View style={{paddingVertical: 15, paddingHorizontal: 20}}>
        <RowView>
          <StyledText content={'카테고리 선택'} fontSize={17} />
          <RowView style={{width: '40%'}}>
            <PressedCat index={1} content={'세션'} />
            <PressedCat index={2} content={'과제'} />
            <PressedCat index={3} content={'기타'} />
          </RowView>
        </RowView>
      </View>
    </Box>
  );
};

export const Camera = ({onImageSelect}) => (
  <TouchableOpacity onPress={onImageSelect}>
    <Image
      source={require('../../assets/icons/camera.png')}
      style={{width: 30, height: 30}}
    />
  </TouchableOpacity>
);
const AdminCreateNotice = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(1); // 1: 세션, 2: 과제, 3: 기타
  const [selectedImages, setSelectedImages] = useState([]);
  const navigation = useNavigation();

  const sendDataToServer = async () => {
    const url = '/post/create';
    const userToken = await getData('user_token');
    const body = {title, content, category, userToken};

    if (title.length === 0) {
      Alert.alert('제목 입력해 바보야');
    } else if (content.length === 0) {
      Alert.alert('내용이 빠졌잖아!');
    } else {
      try {
        const result = await fetchPost(url, body); //서버에서 result.insertId return
        if (result.createdPostId && selectedImages.length > 0) {
          uploadImages(result.createdPostId);
        }

        // await pushNoti({title: title, body: content});
        navigation.goBack();
      } catch (error) {
        console.error('Error sending data:', error);
      }
    }
  };

  const uploadImages = async postId => {
    const formData = new FormData();
    const SERVER_URL = getAPIHost();
    const URL = SERVER_URL + '/post/uploadimages';
    selectedImages.forEach(image => {
      const file = {
        name: image.fileName,
        type: image.type,
        uri: image.uri,
      };
      formData.append('images', file);
    });

    formData.append('post_id', postId);

    fetch(URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
      })
      .catch(error => {
        console.error('이미지 업로드 실패:', error);
      });
  };
  const onImageSelect = () => {
    permissionCheck.cmmReqPermission(selectImages);
    function selectImages() {
      const options = {
        mediaType: 'photo',
        quality: 1,
        multiple: true,
        selectionLimit: 10,
      };

      launchImageLibrary(options, response => {
        if (!response.didCancel) {
          setSelectedImages(response.assets);
        }
      });
    }
  };
  return (
    <StyledContainer>
      <HeaderDetail
        title={'글 작성하기'}
        button={'완료'}
        buttonOnPress={sendDataToServer}
      />
      <View style={{paddingHorizontal: 20, flex: 1}}>
        <View>
          <ChooseCategory category={category} setCategory={setCategory} />
        </View>

        <TextInput
          placeholder="제목"
          value={title}
          onChangeText={text => setTitle(text)}
          placeholderTextColor={COLORS.light_gray}
          style={styles.textInputTitle}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={{flex: 1}}>
          <TextInput
            placeholder="내용"
            value={content}
            onChangeText={text => setContent(text)}
            placeholderTextColor={COLORS.light_gray}
            style={styles.textInputContent}
            multiline={true}
          />

          <ImagesContainer>
            <ScrollView horizontal={true}>
              {selectedImages.map((image, index) => (
                <Image
                  key={index}
                  source={{uri: image.uri}}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                />
              ))}
            </ScrollView>
          </ImagesContainer>
          <Gap height={100} />
          <Camera onImageSelect={onImageSelect} />
        </KeyboardAvoidingView>
      </View>
    </StyledContainer>
  );
};
export const ImagesContainer = styled.View`
  flex-direction: row;
  overflow: hidden;
  position: absolute;
  bottom: 40px;
`;
const styles = StyleSheet.create({
  inputWrapper: {
    paddingVertical: 15,
  },
  textInputTitle: {
    color: 'white',
    height: 60,
    marginBottom: 15,
    borderWidth: 2,
    fontSize: 25,
    borderBottomColor: COLORS.light_gray,
  },
  textInputContent: {
    color: 'white',
    marginBottom: 15,
    fontSize: 20,
    flex: 1,
    textAlignVertical: 'top',
  },
});
export default AdminCreateNotice;
