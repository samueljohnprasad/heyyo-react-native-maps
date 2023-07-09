import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useQuery } from "react-query";
import { fetchData } from "../../helpers";
import axios from "axios";

export default function MapComponent({ latitude, longitude }) {
  const { isLoading, error, data } = useQuery("data", () =>
    fetchData(latitude, longitude)
  );

  // useEffect(() => {
  //   console.log("useEffect");
  //   fetch("https://dark-red-catfish-tux.cyclic.app/")
  //     .then((response) => console.log(">>>>> response", { response }))
  //     .catch(console.log);
  // }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>loading...</Text>
        {/* <UserLocation /> */}
      </View>
    );
  }

  //console.log(">>>>>>> data", { data: data?.data });
  // console.log(">>>>>>> location", { data: data[0].location.coordinates });
  console.log(">>>>>>> data", { data: data });
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on yosdfdsur app!</Text>
      <StatusBar style="auto" />
      <MapView
        loadingEnabled
        loadingIndicatorColo="red"
        initialRegion={{
          latitude,
          longitude,
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
        {data.map((map, index) => {
          return (
            <Marker
              key={index}
              tracksViewChanges
              coordinate={{
                latitude: map.location.coordinates[1],
                longitude: map.location.coordinates[0],
              }}
              onSelect={() => console.log("on select >>>>>")}
              onPress={() => console.log("on onPress >>>>>")}
              title={"samuel"}
              description={"hello samuel"}
            >
              <View style={styles.roundView}></View>
            </Marker>
          );
        })}
        {/* <Marker
          coordinate={{ latitude: "13.0478078", longitude: "80.0442002" }}
          title={"samuel"}
          description={"hello samuel"}
        >
          <View style={styles.roundView}></View>
        </Marker> */}
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
  // tail: {
  //   width: 8,
  //   height: 8,
  //   borderRadius: 20,
  //   backgroundColor: "#f0f0f0",
  //   position: "absolute",
  //   left: "50%",
  //   transform: [{ translateY: 36 }, { translateX: -2 }],
  // },
});
