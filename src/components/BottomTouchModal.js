import { View, Text, Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React, {useRef, useState} from 'react'
import { COLORS } from '../assets/Theme'

export default function BottomTouchModal({children}) {
  const [isVisible, setIsVisible] = useState(false);
  const springAnim = useRef(new Animated.ValueXY()).current;

  const springUp = () => {
    Animated.spring(springAnim, {
      toValue: {x: 0, y: -350},
      useNativeDriver: true
    }).start();
    console.log('up!');
    setIsVisible(true);
  }
  const springDown = () => {
    Animated.spring(springAnim, {
      toValue: {x: 0, y: 0},
      useNativeDriver: true
    }).start();
    console.log('down!');
    setIsVisible(false);
  }

  return (
    <Animated.View
      style={[
        styles.modalContainer,
        springAnim.getTranslateTransform()
      ]}
    >
      <TouchableWithoutFeedback
        style={styles.touchableArea}
        onPress={isVisible ? springDown : springUp}>
          <View style={styles.touchableArea}>
            <View style={styles.touchHandle} />
          </View>
      </TouchableWithoutFeedback>
      <View style={styles.sheetContent}>{children}</View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    height: 400,
    bottom: -350,
    width: '100%',
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  touchableArea: {
    width: '100%',
    height: 50,
    justifyContent: 'start',
    alignItems: 'center',
    paddingTop: 10,
  },
  touchHandle: {
    width: 100,
    height: 6,
    backgroundColor: COLORS.light_gray,
    borderRadius: 10,
  },
  sheetContent: {
    flex: 1,
    width: '100%'
  }
});