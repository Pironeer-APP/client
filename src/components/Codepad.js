import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../assets/Theme';
import {GapH} from './Gap';
import {StyledText} from './Text';
import {fetchPost, getData} from '../utils';
import Modal from 'react-native-modal';

const Codebox = ({code}) => {
  return (
    <View style={styles.codebox}>
      <StyledText content={code} fontSize={35} color={COLORS.green} />
    </View>
  );
};

const Numberpad = ({onNumberPress, onDeletePress, code, setBottomSheet, setModalVisible, isModalVisible, setCodeConfirmed}) => {


  const numbers = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  //출석코드 일치 확인
  const confirmCode = async () => {
    const userToken = await getData('user_token');
    const url = `/attend/addAttend`;
    const body = {
      token: userToken,
    };
    const attenResult = await fetchPost(url, body);
    setCodeConfirmed(attenResult.result);
    setModalVisible(true);
    setBottomSheet(false);
    console.log(attenResult.result);
  };

  // 출석성공실패 모달 3초 후에 사라지게 하기
  if (isModalVisible) {
    const timer = setTimeout(() => {
      setModalVisible(false);
    }, 1500);
  }

  return (
    <View
      style={[
        styles.numberpadMarginBottom,
        {
          flex: 1,
          justifyContent: 'space-around',
        },
      ]}>
      {numbers.map((row, rowIndex) => {
        return (
          <View key={rowIndex} style={styles.numberpadRow}>
            {row.map((num, numIndex) => {
              return (
                <TouchableOpacity
                  key={numIndex}
                  onPress={() => onNumberPress(num)}>
                  <StyledText content={num} fontSize={30} color={'white'} />
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}
      <View style={styles.numberpadRow}>
        <TouchableOpacity
          style={{position: 'relative', left: 4}}
          onPress={onDeletePress}>
          <Image
            source={require('../assets/icons/leftarrow_icon.png')}
            style={{width: 30, height: 20}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{position: 'relative', left: 19}} onPress={() => onNumberPress(0)}>
          <StyledText content={0} fontSize={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            padding: 9,
            backgroundColor: code.includes('')
              ? COLORS.icon_gray
              : COLORS.green,
            position: 'relative',
            left: 13,
          }}
          onPress={confirmCode}
          disabled={code.includes('') ? true : false}>
          <StyledText
            content={'확인'}
            fontSize={28}
            color={code.includes('') ? 'white' : 'black'}
          />
        </TouchableOpacity>

        {/* 출결성공/실패 모달 */}
        {/* <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          style={styles.centeredView}>
          <View style={styles.modalView}>
            {!!codeConfirmed ? (
              <>
                <Image
                  source={require('../assets/images/attend_success.png')}
                  resizeMode="contain"
                  style={{width: 120, height: 120}}
                />
                <StyledText content={'출석 성공'} fontSize={25} />
                </>
            ) : (
              <>
                <Image
                  source={require('../assets/images/attend_late.png')}
                  resizeMode="contain"
                  style={{width: 120, height: 120}}
                />
                <StyledText content={'지각처리 되었습니다'} fontSize={25} />
              </>
            )}
          </View>
        </Modal> */}
      </View>
    </View>
  );
};

const Codepad = ({ setBottomSheet, setModalVisible, isModalVisible, setCodeConfirmed }) => {
  const [codes, setCodes] = useState(['', '', '', '']);

  const updateCode = (index, value) => {
    const updatedCodes = [...codes];
    updatedCodes[index] = value;
    setCodes(updatedCodes);
  };

  const deleteCode = index => {
    const updatedCodes = [...codes];
    updatedCodes[index] = '';
    setCodes(updatedCodes);
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 20,
        }}>
        {codes.map((code, index) => (
          <Codebox key={index} code={code} />
        ))}
      </View>
      <Numberpad
        onNumberPress={number => {
          for (let i = 0; i < codes.length; i++) {
            if (codes[i] === '') {
              updateCode(i, number);
              break;
            }
          }
        }}
        onDeletePress={() => {
          for (let i = 0; i < codes.length; i++) {
            if (codes[i] === '' && i !== 0) {
              deleteCode(i - 1);
              break;
            }
          }
          if (!codes.includes('')) {
            deleteCode(3);
          }
        }}
        code={codes}
        setBottomSheet={setBottomSheet}
        setModalVisible={setModalVisible}
        isModalVisible={isModalVisible}
        setCodeConfirmed={setCodeConfirmed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  codebox: {
    borderWidth: 2,
    borderColor: COLORS.icon_gray,
    borderRadius: 15,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberpadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // marginBottom: 100,
  },
  numberpadMarginBottom: Platform.select({
    ios: {
      marginBottom: 40,
    },
    android: {
      marginBottom: 8,
    },
  }),
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: `${COLORS.gray}`,
    width: 300,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    gap: 20,
    position: 'absolute',
  },
});

export default Codepad;
