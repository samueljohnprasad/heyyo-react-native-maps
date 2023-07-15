import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useQuery } from "react-query";
import { fetchData } from "../../helpers";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function MapComponent({ latitude, longitude }) {
  // const {
  //   isLoading,
  //   error,
  //   data = [],
  // } = useQuery(["data", latitude, longitude], () =>
  //   fetchData(latitude, longitude)
  // );
  const mapRef = useRef(null);

  const [userCurrentLocation, setUserCurrentLocation] = useState([]);
  const { navigate } = useNavigation();
  useEffect(() => {
    const getDate = async () => {
      console.log({ latitude, longitude });
      const apidata = await fetchData(latitude, longitude);
      console.log("useEfft", { useeff: apidata });
      apidata && setUserCurrentLocation([...apidata]);
    };
    getDate();
    const region = {
      latitude: latitude || 51.5072,
      longitude: longitude || 0.1276,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    mapRef.current.animateToRegion(region, 1 * 1000);
  }, [latitude, longitude]);

  // if (isLoading) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>loading...</Text>
  //       {/* <UserLocation /> */}
  //     </View>
  //   );
  // }

  //console.log(">>>>>>> data", { data: data?.data });
  // console.log(">>>>>>> location", { data: data[0].location.coordinates });
  console.log(">>>>>>> data", { data: userCurrentLocation });
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView
        ref={mapRef}
        loadingEnabled
        loadingIndicatorColo="red"
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsCompass
        showsIndoorLevelPicker
        showsIndoors
        showsMyLocationButton
        showsBuildings
        showsScale
        showsUserLocation
        userLocationAnnotationTitle="this is my location"
        style={styles.map}
      >
        {userCurrentLocation.map((map, index) => {
          return (
            <Marker
              key={index}
              tracksViewChanges
              coordinate={{
                latitude: map.location.coordinates[1],
                longitude: map.location.coordinates[0],
              }}
              onSelect={() => navigate("PostOverViewModal")}
              onPress={() => console.log("on onPress >>>>>")}
              title={"samuel"}
              description={"hello samuel"}
            >
              <View style={styles.roundView}></View>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },

  customMarker: {
    position: "relative",
    width: 200,
    height: 200,
    borderRadius: "50%",
    backgroundColor: "#red",
    borderColor: "black",
    borderWidth: 2,
  },
  roundView: {
    position: "relative",
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#f0f0f0",
    overflow: "visible",
    borderColor: "black",
    borderWidth: 2,
  },
});
