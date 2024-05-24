import { useSharedValue } from 'react-native-reanimated';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
import { Dimensions } from 'react-native';

const useShareableState = () => {
  const animatedPOIListIndex = useSharedValue(0);
  const animatedPOIListPosition = useSharedValue(SCREEN_HEIGHT);
  return {
    animatedPOIListIndex,
    animatedPOIListPosition,
  };
};
export default useShareableState;
