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

const Codebox = ({code, highlight}) => {
  return (
    <View style={[styles.codebox, highlight ? {borderColor: COLORS.green} : null ]}>
      <StyledText content={code} fontSize={35} color={COLORS.green} />
    </View>
  );
};

const Numberpad = ({onNumberPress, onDeletePress, code, confirmCode}) => {


  const numbers = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  // useEffect(() => {
  //   // 출석성공실패 모달 3초 후에 사라지게 하기
  //   if (!isBottomSheetVisible) {
  //     setTimeout(() => {
  //       setModalVisible(!isModalVisible);
  //     }, 1500);
  //   }
  // }, [codeConfirmed]);

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
                  onPress={() => onNumberPress(num)}
                  style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <StyledText content={num} fontSize={30} color={'white'} />
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}
      <View style={styles.numberpadRow}>
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          onPress={onDeletePress}>
          <Image
            source={require('../assets/icons/leftarrow_icon.png')}
            style={{width: 30, height: 20}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onNumberPress(0)}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <StyledText content={0} fontSize={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={confirmCode}
          disabled={code.length === 4 ? false : true}>
            <View
              style={{
                borderRadius: 10,
                padding: 9,
                backgroundColor: code.length === 4
                  ? COLORS.green
                  : COLORS.icon_gray,
                position: 'relative',
                left: 13,
              }}>
            <StyledText
              content={'확인'}
              fontSize={28}
              color={code.length === 4 ? 'black' : 'white'}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Codepad = ({ confirmCode, codes, setCodes }) => {

  const updateCode = (value) => {
    if(codes.length < 4) {
      setCodes(codes+value);
    }
  };

  const deleteCode = () => {
    setCodes(codes.slice(0, -1));
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 20,
        }}>
        <Codebox code={codes.slice(0,1)} highlight={codes.length === 1} />
        <Codebox code={codes.slice(1,2)} highlight={codes.length === 2} />
        <Codebox code={codes.slice(2,3)} highlight={codes.length === 3} />
        <Codebox code={codes.slice(3,4)} highlight={codes.length === 4} />
      </View>
      <Numberpad
        onNumberPress={number => {
          updateCode(number);
        }}
        onDeletePress={() => {
          if(codes.length) {
            deleteCode();
          }
        }}
        code={codes}
        confirmCode={confirmCode}
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
