import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, { useSharedValue, useAnimatedStyle, useDerivedValue, withSpring } from 'react-native-reanimated'

import { COLORS } from '../assets/Theme'
import StyledContainer from '../components/StyledContainer'
import HeaderDetail from '../components/Header'

const useFollowAnimatedPosition = ({ x, y }) => {
  const followX = useDerivedValue(() => {
    return withSpring(x.value);
  })
  const followY = useDerivedValue(() => {
    return withSpring(y.value);
  })

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: followX.value },
        { translateY: followY.value }
      ],
    }
  })

  return { followX, followY, rStyle }
}

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const SIZE = 80;

export default function LabScreen() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const context = useSharedValue({ x: 0, y: 0 });

  const gesture = Gesture.Pan().onStart(() => {
    context.value = { x: translateX.value, y: translateY.value }
  }).onUpdate((event) => {
    translateX.value = event.translationX + context.value.x;
    translateY.value = event.translationY + context.value.y;
  }).onEnd(() => {
    console.log('x...');
    console.log(translateX.value);
    console.log(SCREEN_WIDTH/2)
    console.log('y...');
    console.log(translateY.value);
    console.log(SCREEN_HEIGHT/2)
    if(translateX.value > SCREEN_WIDTH/2) {
      translateX.value = SCREEN_WIDTH/2-SIZE;
    } else if(translateX.value < -(SCREEN_WIDTH/2)) {
      translateX.value = -SCREEN_WIDTH/2+SIZE;
    }
    if(translateY.value > SCREEN_HEIGHT/2) {
      translateY.value = SCREEN_HEIGHT/2-SIZE;
    } else if(translateY.value < -(SCREEN_HEIGHT/2)) {
      translateY.value = -SCREEN_HEIGHT/2+SIZE;
    }
  })

  const { followX: frontFollowX, followY: frontFollowY, rStyle: frontCircleStyle } = useFollowAnimatedPosition({ x: translateX, y: translateY });
  const { followX: midFollowX, followY: midFollowY, rStyle: midCircleStyle } = useFollowAnimatedPosition({ x: frontFollowX, y: frontFollowY });
  const { followX: backFollowX, followY: backFollowY, rStyle: backCircleStyle } = useFollowAnimatedPosition({ x: midFollowX, y: midFollowY });
  const { followX: lastFollowX, followY: lastFollowY, rStyle: lastCircleStyle } = useFollowAnimatedPosition({ x: backFollowX, y: backFollowY });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StyledContainer>
        <HeaderDetail title="실험실" />
        <View
          style={styles.container}
        >
          <Text style={styles.font}>Hi</Text>
          <Animated.View style={[styles.circle, lastCircleStyle]} />
          <Animated.View style={[styles.circle, backCircleStyle]} />
          <Animated.View style={[styles.circle, midCircleStyle]} />
          <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.circle, frontCircleStyle]} />
          </GestureDetector>
        </View>
      </StyledContainer>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  font: {
    fontSize: 22,
    color: COLORS.textColor,
    fontFamily: 'PoetsenOne-Regular',
  },
  greenFont: {
    fontSize: 22,
    color: COLORS.green,
    fontFamily: 'PoetsenOne-Regular',
  },
  circle: {
    height: SIZE,
    aspectRatio: 1,
    backgroundColor: COLORS.green,
    borderRadius: SIZE/2,
    opacity: 0.8,
    position: 'absolute'
  }
})