import React, { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import Device from "expo-device";
import * as Location from "expo-location";
import MapComponent from "./MapComponent";
import BottomSheetRef from "./BottonSheetRef";
import { useDispatch, useSelector } from "react-redux";
import { updateUserCurrentLocationAction } from "../store/reducer";
import { LOCATION_COORDS, useAuth } from "../../AuthContext";
import * as secureStore from "expo-secure-store";
import { TOKEN_KEY_USER_DETAILS } from "../../AuthContext";
import { useSocket } from "../../SocketProvider";
export default function UserLocation() {
  const dispatch = useDispatch();
  const {
    userDetails: { userId },
  } = useAuth();
  const [usersOnMap, setUsersOnMap] = useState();
  const { socket } = useSocket();
  const [activeUsers, setActiveUsers] = useState([]);
  const [allNearByUsers, setAllNearByUsers] = useState([]);

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const localStorageCoords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      await secureStore.setItemAsync(
        LOCATION_COORDS,
        JSON.stringify(localStorageCoords)
      );

      const localData = await secureStore.getItemAsync(TOKEN_KEY_USER_DETAILS);
      const { userId } = JSON.parse(localData);

      socket.emit("update_userLocation", {
        ...localStorageCoords,
        userId,
      });
      socket.on("nearbyUsers", (data) => {
        setActiveUsers((prev) => [...prev, ...data]);
        setAllNearByUsers(data);
      });
      dispatch(
        updateUserCurrentLocationAction({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      );
    })();
  }, []);

  useEffect(() => {
    socket.on("locationUpdate", (user) => {
      setUsersOnMap(user);
      setActiveUsers((prev) => [...prev, { ...user }]);
    });
  }, []);

  useEffect(() => {
    if (userId) {
      socket.query = { driverId: userId };
      socket.connect();
      //     socket.emit("send_message", { message: "hello baby" });
    }
  }, [userId]);

  useEffect(() => {
    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [userId]);

  const loading = useSelector((store) => store.map.isLoading);
  const latitude = useSelector(
    (store) => store.map.userCurrentLocation.latitude
  );
  const longitude = useSelector(
    (store) => store.map.userCurrentLocation.longitude
  );
  return (
    <>
      <MapComponent
        activeUsers={activeUsers}
        latitude={latitude}
        longitude={longitude}
      />
      <BottomSheetRef />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});
