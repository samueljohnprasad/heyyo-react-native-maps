/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import * as secureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import MapComponent from './MapComponent';

import BottomSheetRef from './BottonSheetRef';

import { updateUserCurrentLocationAction } from '../store/reducer';
import {
  LOCATION_COORDS,
  useAuth,
  TOKEN_KEY_USER_DETAILS,
} from '../../AuthContext';
import { socket } from '../network/socket';

// const StyledBottom = styled.View`
//   height: 200px;
//   overflow: visible;
//   background-color: green;
//   &:first-child {
//     background-color: yellow;
//     overflow: visible;
//   }
// `;

export default function UserLocation() {
  const dispatch = useDispatch();
  const {
    userDetails: { userId },
  } = useAuth();
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    (async () => {
      // if (!Device.isDevice) {
      //   Toast.show(
      //     'Oops, this will not work on Snack in an Android Emulator. Try it on your device!',
      //   );
      //   return;
      // }
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Toast.show('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      const localStorageCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      await secureStore.setItemAsync(
        LOCATION_COORDS,
        JSON.stringify(localStorageCoords),
      );

      const localData = await secureStore.getItemAsync(TOKEN_KEY_USER_DETAILS);
      const { userId: userIdLocal, userName, imageId } = JSON.parse(localData);

      socket.emit('update_userLocation', {
        ...localStorageCoords,
        userId: userIdLocal,
        userName,
        imageId,
      });
      socket.on('nearbyUsers', (data) => {
        // console.log('nearbyUsers');
        setActiveUsers((prev) => [...prev, ...data]);
      });
      dispatch(
        updateUserCurrentLocationAction({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }),
      );
      setTimeout(() => {
        dispatch(
          updateUserCurrentLocationAction({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }),
        );
      }, 30000);
    })();
  }, []);

  const updateActiveusersAfterUserLef = (userIdItem) => {
    setActiveUsers((prev) => {
      const updatedUsers = prev.filter((user) => {
        if (user.userId === userIdItem) {
          return false;
        }
        return true;
      });
      return updatedUsers;
    });
  };

  useEffect(() => {
    socket.on('locationUpdate', (user) => {
      setActiveUsers((prev) => [...prev, { ...user }]);
    });

    socket.on('locationUpdate_left_user', (data) => {
      updateActiveusersAfterUserLef(data.userId);
    });
  }, []);

  useEffect(() => {
    if (userId) {
      socket.query = { driverId: userId };
      socket.connect();
    }
  }, [userId]);

  useEffect(
    () => () => {
      if (socket.connected) {
        socket.disconnect();
      }
    },
    [userId],
  );

  const latitude = useSelector(
    (store) => store.map.userCurrentLocation.latitude,
  );
  const longitude = useSelector(
    (store) => store.map.userCurrentLocation.longitude,
  );

  return (
    <View style={{ flex: 1 }}>
      <MapComponent
        activeUsers={activeUsers}
        latitude={latitude}
        longitude={longitude}
      />
      <BottomSheetRef />
    </View>
  );
}
