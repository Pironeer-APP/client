import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../assets/Theme'
import { GapH } from './Gap'
import { StyledText } from './Text'

const Codebox = ({code}) => {
  return (
    <View style={styles.codebox}>
      <StyledText content={code} fontSize={35} color={COLORS.green} />
    </View>
  )
}

const Numberpad = ({onNumberPress, onDeletePress, code}) => {
  const numbers = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  return (
    <View 
      style={[
        styles.numberpadMarginBottom,
        { 
          flex: 1, 
          justifyContent: 'space-around', 
        }
      ]}>
      {numbers.map((row, rowIndex) => {
        return (
          <View key={rowIndex} style={styles.numberpadRow}>
            {row.map((num, numIndex) => {
              return (
                <TouchableOpacity key={numIndex} onPress={() => onNumberPress(num)}>
                  <StyledText content={num} fontSize={30} color={'white'} />
                </TouchableOpacity>
              )
            })}
          </View>
      )})}
      <View style={styles.numberpadRow}>
        <TouchableOpacity style={{ position: 'relative', left: 4 }} onPress={onDeletePress}>
          <Image source={require('../assets/icons/leftarrow_icon.png')} style={{ width: 30, height: 20 }} />
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'relative', left: 19 }}> 
          <StyledText content={0} fontSize={30} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={{ 
            borderRadius: 10, 
            padding: 9, 
            backgroundColor: code.includes('') ? COLORS.icon_gray : COLORS.green, 
            position: 'relative', 
            left: 13 }}
        >
          <StyledText content={'확인'} fontSize={28} color={code.includes('') ? 'white' : 'black'}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Codepad = () => {
  const [codes, setCodes] = useState(['', '', '', '']);

  const updateCode = (index, value) => {
    const updatedCodes = [...codes];
    updatedCodes[index] = value;
    setCodes(updatedCodes);
  };
  
  const deleteCode = (index) => {
    const updatedCodes = [...codes];
    updatedCodes[index] = '';
    setCodes(updatedCodes);
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 }}>
        {codes.map((code, index) => (
          <Codebox key={index} code={code} />
        ))}
      </View>
      <Numberpad 
        onNumberPress={(number)=>{
          for (let i = 0; i < codes.length; i++) {
            if (codes[i] === '') {
              updateCode(i, number);
              break;
            }}
        }}
        onDeletePress={()=>{
          for (let i = 0; i < codes.length; i++) {
            if (codes[i] === '' && i !== 0) {
              deleteCode(i-1);
              break; }
          }
          if (!codes.includes('')) {
            deleteCode(3);
          }
        }}
        code={codes}
        />
    </View>
  )
}

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
    }
  })
})

export default Codepad