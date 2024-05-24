/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
import { Dimensions, StyleSheet } from 'react-native';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useShowcaseTheme } from '@gorhom/showcase-template';
import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const LOCATION_DETAILS_HEIGHT = 278;

export const SEARCH_HANDLE_HEIGHT = 169;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 12,
    top: 0,
    padding: 2,
    marginTop: 0,
    borderRadius: 4,
  },
  label: {
    fontSize: 16,
    lineHeight: 16,
  },
});
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const useTransitionWithBottomSheet = (animatedIndex, animatedPosition) => {
  const { colors } = useShowcaseTheme();
  const { bottom: bottomSafeArea } = useSafeAreaInsets();

  const lockedYPosition = useMemo(
    () =>
      SCREEN_HEIGHT -
      SEARCH_HANDLE_HEIGHT -
      LOCATION_DETAILS_HEIGHT -
      bottomSafeArea,
    [bottomSafeArea],
  );

  const containerAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY:
            animatedPosition.value > lockedYPosition
              ? animatedPosition.value - 255
              : lockedYPosition - 255,
        },
        {
          scale: interpolate(
            animatedIndex.value,
            [2, 3],
            [1, 0],
            Extrapolate.CLAMP,
          ),
        },
      ],
    }),
    [lockedYPosition],
  );

  const containerStyle = useMemo(
    () => [
      styles.container,
      { backgroundColor: colors.secondaryCard },
      containerAnimatedStyle,
    ],
    [colors.secondaryCard, containerAnimatedStyle],
  );

  return containerStyle;
};
export default useTransitionWithBottomSheet;
