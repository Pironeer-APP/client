import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import StyledContainer from '../../components/StyledContainer';
import HeaderDetail from '../../components/Header';
import {COLORS} from '../../assets/Theme';
import {
  Camera,
  ChooseCategory,
  ImagesContainer,
  TitleContainer,
} from './AdminCreateNotice';
import {launchImageLibrary} from 'react-native-image-picker';
import { client, getAPIHost } from '../../api/client';
import { getData } from '../../api/asyncStorage';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../features/posts/postsSlice';

const AdminUpdateNotice = () => {
  const route = useRoute();
  const post = route.params.post;
  const getImages = route.params.imagesUrl;

  const [title, setTitle] = useState(post.title);
  const [images, setImages] = useState(getImages);
  const [imgsIsChanged, setImgIsChanged] = useState(false);
  const [content, setContent] = useState(post.content);
  const [category, setCategory] = useState(post.category);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const updatePost = async () => {
    const url = `/post/update`;
    const userToken = await getData('user_token');
    const post_id = post.post_id;
    const body = {title, content, category, userToken, post_id};

    if (title.length === 0) {
      Alert.alert('제목을 입력하세요');
    } else if (content.length === 0) {
      Alert.alert('내용을 입력하세요');
    } else {
      try {
        await client.post(url, body);
        if (imgsIsChanged) {
          await updateImages(post.post_id);
        }

        // await pushNoti({title: `수정된 공지가 있습니다-${title}`, body: content});
        dispatch(fetchPosts());
        navigation.goBack();
        navigation.goBack(); // AnnouncementScreen으로 돌아감
      } catch (error) {
        console.error('Error sending data:', error);
      }
    }
  };
  const updateImages = async postId => {
    const formData = new FormData();
    images.forEach(image => {
      const file = {
        name: image.fileName,
        type: image.type,
        uri: image.uri,
      };
      formData.append('images', file);
    });
    formData.append('post_id', postId);
    const url = '/post/uploadimages';
    try {
      const SERVER_URL = getAPIHost();
      await fetch(SERVER_URL+url, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: formData,
      });
    } catch (err) {
      return Promise.reject(err.message ? err.message : data);
    }
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
        setImages(response.assets);
        setImgIsChanged(true);
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <StyledContainer>
        <HeaderDetail
          title={'수정하기'}
          button={'완료'}
          buttonOnPress={updatePost}
        />
        <View style={{paddingHorizontal: 20, flex: 1}}>
          <View>
            <ChooseCategory category={category} setCategory={setCategory} />
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{flex: 1}}>
            <TitleContainer>
              <TextInput
                placeholder="제목"
                value={title}
                onChangeText={text => setTitle(text)}
                placeholderTextColor={COLORS.light_gray}
                style={styles.textInputTitle}
              />
              <Camera onImageSelect={onImageSelect} />
            </TitleContainer>
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
                {images.map((image, index) => {
                  let URI = image?.uri || image;
                  return (
                    <Image
                      key={index}
                      source={{uri: URI}}
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 10,
                        marginRight: 10,
                      }}
                    />
                  );
                })}
              </ScrollView>
            </ImagesContainer>
            {Platform.OS === 'ios' ? <Gap height={100} /> : null}
          </KeyboardAvoidingView>
        </View>
      </StyledContainer>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  inputWrapper: {
    paddingVertical: 15,
  },
  textInputTitle: {
    color: 'white',
    height: 60,
    fontSize: 25,
    flex: 1,
  },
  textInputContent: {
    color: 'white',
    height: 60,
    marginBottom: 15,
    fontSize: 20,
    flex: 1,
    textAlignVertical: 'top',
  },
});
export default AdminUpdateNotice;
