import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Pressable,
  TouchableHighlight,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useQuery } from "react-query";
import { fetchData } from "../../helpers";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function MapComponent({ latitude, longitude }) {
  // const {
  //   isLoading,
  //   error,
  //   data = [],
  // } = useQuery(["data", latitude, longitude], () =>
  //   fetchData(latitude, longitude)
  // );
  const mapRef = useRef(null);
  const { width, height } = Dimensions.get("window");
  const CARD_HEIGHT = height / 4;
  const CARD_WIDTH = CARD_HEIGHT - 50;

  const [userCurrentLocation, setUserCurrentLocation] = useState([]);
  const { navigate } = useNavigation();
  const [sliderPosts, setSliderPosts] = useState([]);
  useEffect(() => {
    const getDate = async () => {
      const apidata = await fetchData(latitude, longitude);
      //console.log("useEfft", { useeff: apidata });
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

  const onPressSliderPostsBack = () => {
    setSliderPosts([]);
  };

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
  //console.log(">>>>>>> data", { data: userCurrentLocation });
  const onMapPostClick = (cluster) => {
    if (cluster.length == 1) return navigate("PostOverViewModal");
    setSliderPosts(cluster);
  };

  const onPressSliderCard = () => {
    navigate("PostOverViewModal");
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView
        ref={mapRef}
        loadingEnabled
        loadingIndicatorColor="red"
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsIndoors
        showsMyLocationButton
        showsBuildings
        showsUserLocation
        userLocationAnnotationTitle="this is my location"
        style={styles.map}
      >
        {userCurrentLocation.map((cluster, index) => {
          // console.log("cluster XXXXXX", { cluster });
          // console.log("zzzzzzzzzzzzzzzz", cluster?.length);
          return (
            <Marker
              key={index}
              tracksViewChanges
              coordinate={{
                // latitude: map.location.coordinates[1],
                latitude:
                  cluster.reduce(
                    (acc, image) => acc + image.location.coordinates[1],
                    0
                  ) / cluster.length,

                longitude:
                  cluster.reduce(
                    (acc, image) => acc + image.location.coordinates[0],
                    0
                  ) / cluster.length,
              }}
              //onSelect={() => onMapPostClick(cluster)}
              onPress={() => onMapPostClick(cluster)}
              title={cluster.length.toString()}
              // description={map.message}
            >
              <View style={styles.roundView}></View>
            </Marker>
          );
        })}
      </MapView>
      {!!sliderPosts.length && (
        <Animated.ScrollView
          horizontal
          pagingEnabled
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          style={styles.scrollView}
        >
          <View
            style={{
              flexDirection: "column",
              gap: 10,
              marginHorizontal: 10,
            }}
          >
            <Pressable onPress={onPressSliderPostsBack}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="ios-close" size={24} color="black" />
              </View>
            </Pressable>
            <View style={{ flexDirection: "row" }}>
              {sliderPosts.map((post, index) => {
                return (
                  <Pressable key={index} onPress={onPressSliderCard}>
                    <View style={styles.card}>
                      <Text>{post.userName}</Text>
                      <Text>{post.message}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </Animated.ScrollView>
      )}
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
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: 200,
    width: 200,
    overflow: "hidden",
    borderRadius: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
});
