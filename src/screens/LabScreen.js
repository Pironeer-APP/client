import { View, Text, StyleSheet, PanResponder, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { COLORS } from '../assets/Theme'
import StyledContainer from '../components/StyledContainer'
import HeaderDetail from '../components/Header'

export default function LabScreen() {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        pan.setValue(0, 1000)
      },
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    })
  ).current;

  const fall = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const fallAnim = Animated.spring(fall, {
      toValue: 300,
      duration: 2000,
      useNativeDriver: true,
      friction: 1,
      tension: 20,
    }).start();

    const rotateAnim = Animated.timing(rotate, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Animated.parallel([
      fallAnim,
      rotateAnim,
    ]).start();
  }, [])

  const trans = {
    transform: [
      { translateX: pan.x },
      {translateY: fall},
      // {rotate: rotate.interpolate({
      //   inputRange: [0, 1],
      //   outputRange: ['0dge', '360deg'],
      // })}
    ]
  }

  return (
    <StyledContainer>
      <HeaderDetail title="실험실" />
      <View
        style={styles.container}
      >
        <Animated.Text {...panResponder.panHandlers} style={[styles.font, { transform: [{ translateX: pan.x }, { translateY: pan.y }], }]}>P</Animated.Text>
        <Animated.View style={[styles.object, trans]}>

        </Animated.View>
      </View>
    </StyledContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  font: {
    fontSize: 18,
    color: COLORS.textColor,
    fontFamily: 'PoetsenOne-Regular',
  },
  greenFont: {
    fontSize: 18,
    color: COLORS.green,
    fontFamily: 'PoetsenOne-Regular',
  },
  object: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.green,
  }
})