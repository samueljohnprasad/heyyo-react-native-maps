import React from "react";
import { useSelector } from "react-redux";
import { View, Text } from "react-native";
import { getDistance } from "geolib";

export default function PostOverViewModal({ route }) {
  const postLat = route.params.cluster.location.coordinates[1];
  const postLon = route.params.cluster.location.coordinates[0];
  const latitude = useSelector(
    (store) => store.map.userCurrentLocation.latitude
  );
  const longitude = useSelector(
    (store) => store.map.userCurrentLocation.longitude
  );

  const getDistanceHandler = () => {
    return getDistance(
      { latitude: postLat, longitude: postLon },
      { latitude, longitude }
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View>
        <Text>PostOverViewModal</Text>
        <Text>{getDistanceHandler()}</Text>
      </View>
    </View>
  );
}
