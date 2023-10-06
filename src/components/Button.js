import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import React from 'react';
import {FontStyledText, StyledText} from './Text';
import {COLORS} from '../assets/Theme';

export const MainButton = ({height = 70, content, onPress, fontSize = 22}) => {
  return (
    <TouchableOpacity
      style={[styles.container, {height: height, marginBottom: 40}]}
      onPress={onPress}>
      <FontStyledText style={[styles.text, {fontSize: fontSize}]}>
        {content}
      </FontStyledText>
    </TouchableOpacity>
  );
};

export const MiniButton = ({outline, onPress, children}) => {
  return (
    <TouchableOpacity
      style={miniStyles({outline}).miniContainer}
      onPress={onPress}>
      <FontStyledText style={miniStyles({outline}).miniText}>
        {children}
      </FontStyledText>
    </TouchableOpacity>
  );
};

export const LoginButton = ({onPress, children}) => {
  return (
    <TouchableOpacity style={styles.loginContainer} onPress={onPress}>
      <FontStyledText style={styles.loginText}>{children}</FontStyledText>
    </TouchableOpacity>
  );
};

export const LeftArrowBtn = ({onPress, size = 20, color}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={{top: 20, bottom: 10, left: 20, right: 20}}>
      {color === 'white' ? (
        <Image
          source={require('../assets/icons/left-arrow-white.png')}
          style={[styles.arrow, {width: 14, height: 24}]}
        />
      ) : (
        <Image
          source={require('../assets/icons/left-arrow.png')}
          style={[styles.arrow, {width: size}]}
        />
      )}
    </TouchableOpacity>
  );
};
export const RightArrowBtn = ({onPress, size = 10}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={require('../assets/icons/right-arrow.png')}
        style={[styles.arrow, {width: size}]}
      />
    </TouchableOpacity>
  );
};
export const UnTouchableRightArrow = ({size = 10}) => (
  <Image
    source={require('../assets/icons/right-arrow.png')}
    style={[styles.arrow, {width: size}]}
  />
);

export const CouponButton = ({selected, content, onPress}) => {
  return (
    <TouchableOpacity style={styles.couponNotSelected} onPress={onPress}>
      <StyledText
        content={content}
        fontSize={20}
        color={'black'}
        weight={600}
      />
    </TouchableOpacity>
  );
};

export const ConfirmSmallBtn = ({content}) => {
  return (
    <TouchableOpacity style={styles.confirmSmallContainer}>
      <FontStyledText style={styles.confirmSmallText}>{content}</FontStyledText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
    height: 70,
    backgroundColor: COLORS.green,
    borderRadius: 15,
  },
  text: {
    // fontSize: 22,
    textAlign: 'center',
    color: '#000000',
    fontWeight: '600',
    alignItems: 'center',
  },
  loginContainer: {
    justifyContent: 'center',
    width: '100%',
    height: 60,
    backgroundColor: COLORS.green,
    borderRadius: 15,
  },
  loginText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000000',
  },
  arrow: {
    resizeMode: 'contain',
  },
  couponNotSelected: {
    justifyContent: 'center',
    width: '100%',
    backgroundColor: `${COLORS.lightTheme_btn}`,
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 20,
  },
  notSelectedText: {
    fontSize: 22,
    textAlign: 'center',
    color: 'white',
  },
  confirmSmallContainer: {
    backgroundColor: COLORS.green,
    borderRadius: 30,
    position: 'absolute',
    right: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  confirmSmallText: {
    color: COLORS.bg_black,
    fontSize: 16,
    textAlign: 'center',
  },
});

const miniStyles = ({outline}) =>
  StyleSheet.create({
    miniContainer: {
      justifyContent: 'center',
      width: '100%',
      height: 50,
      backgroundColor: outline ? 'transparent' : COLORS.green,
      borderRadius: 13,
      borderColor: outline ? COLORS.green : 'none',
      borderWidth: 3,
    },
    miniText: {
      fontSize: 18,
      textAlign: 'center',
      color: outline ? 'white' : '#000000',
    },
  });
