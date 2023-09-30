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
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import HeaderDetail from '../../components/Header';
import StyledContainer from '../../components/StyledContainer';
import {StyledText} from '../../components/Text';
import {COLORS} from '../../assets/Theme';
import {MainButton} from '../../components/Button';
import {fetchPost} from '../../utils';
import {Box} from '../../components/Box';
import {RowView} from '../HomeScreen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';

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
const AdminCreateNotice = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(1); // 1: 세션, 2: 과제, 3: 기타
  const [selectedImages, setSelectedImages] = useState([]);

  const sendDataToServer = async () => {
    const url = '/post/create/20';
    const body = {title, content, category};
    try {
      const result = await fetchPost(url, body); //서버에서 result.insertId return
      if (result.createdPostId && selectedImages.length > 0) {
        uploadImages(result.createdPostId);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const uploadImages = async postId => {
    const url =
      Platform.OS === 'ios'
        ? 'http://localhost:3000/api/post/uploadimages'
        : 'http://10.0.2.2:3000/api/post/uploadimages';
    console.log(url);
    const formData = new FormData();
    selectedImages.forEach(image => {
      const file = {
        name: image.fileName,
        type: image.type,
        uri: image.uri,
      };
      formData.append('images', file);
    });

    formData.append('post_id', postId);

    fetch(url, {
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
  };

  const Camera = () => (
    <TouchableOpacity onPress={onImageSelect} style={{paddingTop: 10}}>
      <Image
        source={require('../../assets/icons/camera.png')}
        style={{width: 30, height: 30}}
      />
    </TouchableOpacity>
  );

  return (
    <StyledContainer>
      <HeaderDetail
        title={'글 작성하기'}
        button={'완료'}
        buttonOnPress={sendDataToServer}
      />

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
                style={{width: 100, height: 100}}
              />
            ))}
          </ScrollView>
        </ImagesContainer>
        <Camera />
      </KeyboardAvoidingView>
    </StyledContainer>
  );
};
const ImagesContainer = styled.View`
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
