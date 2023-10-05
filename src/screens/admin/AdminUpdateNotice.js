import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import StyledContainer from '../../components/StyledContainer';
import {StyledText} from '../../components/Text';
import HeaderDetail from '../../components/Header';
import {COLORS} from '../../assets/Theme';
import {Camera, ChooseCategory, ImagesContainer} from './AdminCreateNotice';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {fetchPost, getAPIHost, getData, pushNoti} from '../../utils';

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

  const updatePost = async () => {
    const url = `/post/update`;
    const userToken = await getData('user_token');
    const post_id = post.post_id;
    const body = {title, content, category, userToken, post_id};

    if (title.length === 0 || content.length === 0) {
      Alert.alert('내용을 입력해주세요');
    } else {
      try {
        await fetchPost(url, body);
        if (imgsIsChanged) {
          updateImages(post.post_id);
        }
        await pushNoti({title: `수정된 공지가 있습니다-${title}`, body: content});
        navigation.navigate('AnnouncementScreen');
      } catch (error) {
        console.error('Error sending data:', error);
      }
    }
  };
  const updateImages = async postId => {
    const formData = new FormData();
    const SERVER_URL = getAPIHost();
    const URL = SERVER_URL + '/post/uploadimages';
    images.forEach(image => {
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
    <StyledContainer>
      <HeaderDetail
        title={'수정하기'}
        button={'완료'}
        buttonOnPress={updatePost}
      />
      <View style={{padding: 20, flex: 1}}>
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
          <Camera onImageSelect={onImageSelect} />
        </KeyboardAvoidingView>
      </View>
    </StyledContainer>
  );
};
const styles = StyleSheet.create({
  inputWrapper: {
    paddingVertical: 15,
  },
  textInputTitle: {
    color: 'white',
    height: 60,
    marginBottom: 15,
    borderWidth: 1,
    fontSize: 25,
    borderBottomColor: COLORS.light_gray,
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
