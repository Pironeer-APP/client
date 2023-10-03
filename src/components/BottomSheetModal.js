import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Modal,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Dimensions} from 'react-native';
import {COLORS} from '../assets/Theme';

const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window');
const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.6;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.1;
const MAX_UPWARD_TRANSLATE_Y =
  BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT; // 음수
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;

export default function BottomSheetModal({children}) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // console.log('grant', lastGestureDy.current);
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gesture) => {
        // console.log('move', gesture.dy);
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        // console.log('release', gesture.dy);
        animatedValue.flattenOffset();

        if (gesture.dy > 0) {
          // 내림
          if (gesture.dy <= DRAG_THRESHOLD) {
            springAnimation('up');
          } else {
            springAnimation('down');
          }
        } else {
          //올림
          if (gesture.dy >= -DRAG_THRESHOLD) {
            springAnimation('down');
          } else {
            springAnimation('up');
          }
        }
      },
    }),
  ).current;

  const springAnimation = dirction => {
    // console.log('direction', dirction);
    lastGestureDy.current =
      dirction === 'down' ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y;
    Animated.spring(animatedValue, {
      toValue: lastGestureDy.current,
      useNativeDriver: true,
    }).start();
  };
  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [
            MAX_UPWARD_TRANSLATE_Y + BOTTOM_SHEET_MIN_HEIGHT,
            MAX_DOWNWARD_TRANSLATE_Y,
          ],
          outputRange: [
            MAX_UPWARD_TRANSLATE_Y + BOTTOM_SHEET_MIN_HEIGHT,
            MAX_DOWNWARD_TRANSLATE_Y,
          ],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <Animated.View
      style={[styles.bottomSheet, bottomSheetAnimation]}
      {...panResponder.panHandlers}>
      <View style={styles.draggableArea}>
        <View style={styles.dragHandle} />
      </View>
      <View style={styles.sheetContent}>{children}</View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: BOTTOM_SHEET_MAX_HEIGHT,
    bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
    backgroundColor: COLORS.gray,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 10,
  },
  draggableArea: {
    height: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
  },
  dragHandle: {
    width: 100,
    height: 6,
    backgroundColor: COLORS.light_gray,
    borderRadius: 10,
  },
  sheetContent: {
    height: BOTTOM_SHEET_MAX_HEIGHT - BOTTOM_SHEET_MIN_HEIGHT - 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
});
