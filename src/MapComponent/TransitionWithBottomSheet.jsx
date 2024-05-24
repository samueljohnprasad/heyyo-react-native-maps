/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { ShowcaseLabel } from '@gorhom/showcase-template';
import useTransitionWithBottomSheet from '../hooks/useTransitionWithBottomSheet';
import PostsSlider from './PostsSlider';

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    lineHeight: 16,
  },
});

function Weather({ animatedIndex, animatedPosition }) {
  const containerStyle = useTransitionWithBottomSheet(
    animatedIndex,
    animatedPosition,
  );
  return (
    <Animated.View style={containerStyle}>
      <ShowcaseLabel style={styles.label}>
        <PostsSlider />
      </ShowcaseLabel>
    </Animated.View>
  );
}

export default Weather;
