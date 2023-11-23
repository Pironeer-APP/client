import { View, Text, Animated, StyleSheet, Easing } from 'react-native'
import React, {useRef, useEffect} from 'react'
import { Shadow } from 'react-native-shadow-2';
import { COLORS } from '../assets/Theme';

export default OnAirCircle = ({color = COLORS.green}) => {
  const scale = useRef(new Animated.Value(1)).current; // 초기 크기 1
  const unscale = useRef(new Animated.Value(1)).current; // 초기 크기 1

  useEffect(() => {
    // 크기 애니메이션 설정
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.easeInOut,
          useNativeDriver: false,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          easing: Easing.easeInOut,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);
  useEffect(() => {
    // 크기 애니메이션 반대로 설정
    Animated.loop(
      Animated.sequence([
        Animated.timing(unscale, {
          toValue: 0.8,
          duration: 1000,
          easing: Easing.easeInOut,
          useNativeDriver: false,
        }),
        Animated.timing(unscale, {
          toValue: 1,
          duration: 1000,
          easing: Easing.easeInOut,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      style={{ padding: 10, transform: [{ scale }] }}
    >
      <Shadow
        startColor={color}
      >
        <View style={styles(color).onAirCircleBack}>
          <Animated.View
            style={[styles(color).onAirCircle, { transform: [{ scale: unscale }] }]}
          />
        </View>
      </Shadow>
    </Animated.View>
  )
}

const styles = (color = COLORS.green) => StyleSheet.create({
  onAirCircleBack: {
    width: 20,
    height: 20,
    backgroundColor: color,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  onAirCircle: {
    width: 30,
    height: 30,
    backgroundColor: color,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.textColor,
  }
})