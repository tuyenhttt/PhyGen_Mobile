import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  View,
} from 'react-native';

export default function Loading() {
  const rotation = useRef(new Animated.Value(0)).current;
  const whiteDotOpacity = useRef(new Animated.Value(0)).current;

  const animateRotation = () => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2400,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const animateWhiteDot = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(whiteDotOpacity, {
          toValue: 0.6,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(whiteDotOpacity, {
          toValue: 0,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    animateRotation();
    animateWhiteDot();
  }, []);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.loader, { transform: [{ rotate }] }]}>
        {/* White flash dot */}
        <Animated.View
          style={[
            styles.dot,
            styles.whiteDot,
            { opacity: whiteDotOpacity },
          ]}
        />
        {/* 4 color dots */}
        <View style={[styles.dot, styles.dot2]} />
        <View style={[styles.dot, styles.dot3]} />
        <View style={[styles.dot, styles.dot4]} />
        <View style={[styles.dot, styles.dot5]} />
      </Animated.View>
    </View>
  );
}

const DOT_SIZE = 24;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: 100,
    height: 100,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    position: 'absolute',
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
  whiteDot: {
    backgroundColor: 'white',
    zIndex: 10,
  },
  dot2: {
    backgroundColor: '#FF4444',
    top: 0,
    left: '50%',
    marginLeft: -DOT_SIZE / 2,
  },
  dot3: {
    backgroundColor: '#FFBB33',
    top: '50%',
    left: 0,
    marginTop: -DOT_SIZE / 2,
  },
  dot4: {
    backgroundColor: '#99CC00',
    bottom: 0,
    left: '50%',
    marginLeft: -DOT_SIZE / 2,
  },
  dot5: {
    backgroundColor: '#33B5E5',
    top: '50%',
    right: 0,
    marginTop: -DOT_SIZE / 2,
  },
});
