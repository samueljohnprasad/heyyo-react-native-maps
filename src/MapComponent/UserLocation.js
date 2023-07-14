import React, { useEffect } from "react";
import { Platform, StyleSheet } from "react-native";
import Device from "expo-device";
import * as Location from "expo-location";
import MapComponent from "./MapComponent";
import BottomSheetRef from "./BottonSheetRef";
import { useDispatch, useSelector } from "react-redux";
import { updateUserCurrentLocationAction } from "../store/reducer";
export default function UserLocation() {
  const dispatch = useDispatch();

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
      dispatch(
        updateUserCurrentLocationAction({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
      );
    })();
  }, []);

  const loading = useSelector((store) => store.map.isLoading);
  const latitude = useSelector(
    (store) => store.map.userCurrentLocation.latitude
  );
  const longitude = useSelector(
    (store) => store.map.userCurrentLocation.longitude
  );
  //console.log("loading>>>>>>>>>", { loading });
  return (
    <>
      <MapComponent latitude={latitude} longitude={longitude} />
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
