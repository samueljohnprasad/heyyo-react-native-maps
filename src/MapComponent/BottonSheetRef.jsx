/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-curly-newline */
import React, { useCallback, useRef, useState } from 'react';
import { View, Text, Platform, Pressable, Dimensions } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { MaterialIcons } from '@expo/vector-icons';
import BlurredBackground from './BlurredBackground';
import MakePost, { styles } from './MakePost';
import { getImage } from '../utils/helpers';
import { useAuth } from '../../AuthContext';
import Event from './Event';
import { BlurView } from 'expo-blur';
import { useSharedValue, useDerivedValue } from 'react-native-reanimated';
import Weather from './Weather';
// const ButtonStyled = styled.View`
//   color: turquoise;
//   background-color: red;
//   background-color: linear-gradient(
//     180deg,
//     rgba(255, 255, 255, 0) 0%,
//     rgba(255, 255, 255, 0.5) 100%
//   );
//   border-radius: 50%;
//   width: 100px;
//   height: 100px;
// `;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

function BottomSheetRef() {
  const bottomSheetRef = useRef(null);
  const snapPoints = ['9%', '16%', '50%', '90%'];
  const [selectedTab, setSelectedTab] = useState(0);
  const { userDetails } = useAuth();
  const animatedPOIListIndex = useSharedValue(0);
  const animatedPOIListPosition = useSharedValue(SCREEN_HEIGHT);

  const weatherAnimatedIndex = useDerivedValue(
    () => animatedPOIListIndex.value,
  );
  const weatherAnimatedPosition = useDerivedValue(
    () => animatedPOIListPosition.value,
  );

  const components = [
    <MakePost />,
    <Event />,
    <View>
      <Text>hi</Text>
    </View>,
  ];

  const currentSnapPointIndex = useRef(0);

  const handleSheetChanges = useCallback((index) => {
    currentSnapPointIndex.current = index;
  }, []);

  const openBottomSheetToSnapPoint = (tab) => {
    setSelectedTab(tab);
    if (!(currentSnapPointIndex.current === 0)) return;
    bottomSheetRef.current.snapToIndex(2);
  };

  return (
    <>
      <Weather
        animatedIndex={weatherAnimatedIndex}
        animatedPosition={weatherAnimatedPosition}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        animatedPosition={animatedPOIListPosition}
        animatedIndex={animatedPOIListIndex}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        keyboardBehavior="extend"
        // backgroundStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.60)' }}
        backgroundComponent={BlurredBackground}
        style={{
          borderWidth: 0.5,
          borderColor: 'rgba(0, 0, 0, 0.12)',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 2.84,
            },
          }),
        }}
      >
        {components[selectedTab]}
      </BottomSheet>
      <BlurView
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          flexDirection: 'row',
          // backgroundColor: 'white',
          backgroundColor: 'rgba(255, 255, 255, 0.30)',
          justifyContent: 'space-around',
          borderWidth: 0.5,
          borderColor: 'rgba(0, 0, 0, 0.12)',
          height: '9%',
        }}
      >
        <Pressable
          style={{
            paddingTop: 22,
            paddingBottom: 22,
            flex: 1,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          suppressHighlighting
          onPress={() => openBottomSheetToSnapPoint(0)}
        >
          <MaterialIcons
            name="post-add"
            size={30}
            color={selectedTab == 0 ? 'blue' : 'black'}
          />
        </Pressable>
        <Pressable
          suppressHighlighting
          onPress={() => openBottomSheetToSnapPoint(1)}
          style={{
            paddingTop: 22,
            paddingBottom: 22,
            flex: 1,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MaterialIcons
            name="event-note"
            size={30}
            color={selectedTab == 1 ? 'blue' : 'black'}
          />
        </Pressable>
        <Pressable
          suppressHighlighting
          onPress={() => openBottomSheetToSnapPoint(2)}
          style={{
            paddingTop: 22,
            paddingBottom: 22,
            flex: 1,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={[
              styles.circle,
              selectedTab !== 2 && {
                borderColor: 'black',
                shadowColor: 'black',
              },
            ]}
          >
            {getImage(userDetails.imageId)}
          </View>
        </Pressable>
      </BlurView>
    </>
  );
}

export default BottomSheetRef;
// rgba(255, 255, 255, 0.60)
