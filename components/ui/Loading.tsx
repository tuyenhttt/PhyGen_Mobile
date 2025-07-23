import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
    View,
} from 'react-native';

export default function Loading() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;
  const dot4 = useRef(new Animated.Value(0)).current;
  const dot5 = useRef(new Animated.Value(0)).current;

  const createAnimation = (animatedValue: Animated.Value, delay: number) => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 300,
          delay,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 300,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
  };

  useEffect(() => {
    createAnimation(dot1, 0).start();
    createAnimation(dot2, 100).start();
    createAnimation(dot3, 200).start();
    createAnimation(dot4, 300).start();
    createAnimation(dot5, 400).start();
  }, []);

  const renderDot = (animatedValue: Animated.Value, key: string) => {
    const scale = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1.2],
    });

    const backgroundColor = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['#b3d4fc', '#6793fb'],
    });

    return (
      <Animated.View
        key={key}
        style={[
          styles.dot,
          {
            transform: [{ scale }],
            backgroundColor,
          },
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderDot(dot1, 'dot1')}
      {renderDot(dot2, 'dot2')}
      {renderDot(dot3, 'dot3')}
      {renderDot(dot4, 'dot4')}
      {renderDot(dot5, 'dot5')}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 20,
    width: 20,
    marginRight: 10,
    borderRadius: 10,
  },
});
