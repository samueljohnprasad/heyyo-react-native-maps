/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable operator-linebreak */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-curly-newline */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useDerivedValue } from 'react-native-reanimated';
import { useBetween } from 'use-between';
import { useDispatch } from 'react-redux';
import BlurredBackground from './BlurredBackground';
import MakePost from './MakePost';
import Event from './Event';
import Weather from './TransitionWithBottomSheet';
import useShareableState from '../hooks/useShareableState';
import Profile from './modelScreens/Profile';
import BottomTabs from '../components/BottomTabs';
import {
  subscribeToEventUpdate,
  subscribeToUpdateEvents,
} from '../store/realTimeUpdatesThunks';

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

function BottomSheetRef() {
  const bottomSheetRef = useRef(null);
  const snapPoints = ['9%', '16%', '50%', '90%'];
  const [selectedTab, setSelectedTab] = useState(0);
  const { animatedPOIListIndex, animatedPOIListPosition } =
    useBetween(useShareableState);
  const dispatch = useDispatch();

  const weatherAnimatedIndex = useDerivedValue(
    () => animatedPOIListIndex.value,
  );
  const weatherAnimatedPosition = useDerivedValue(
    () => animatedPOIListPosition.value,
  );

  const components = [
    <MakePost key="MakePost" />,
    <Event key="Event" />,
    <Profile key="Profile" />,
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
  useEffect(() => {
    subscribeToUpdateEvents()(dispatch);
  }, []);

  useEffect(() => {
    subscribeToEventUpdate()(dispatch);
  }, []);
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
        /// backgroundStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.60)' }}
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
      <BottomTabs
        openBottomSheetToSnapPoint={openBottomSheetToSnapPoint}
        selectedTab={selectedTab}
      />
    </>
  );
}

export default BottomSheetRef;
// rgba(255, 255, 255, 0.60)
