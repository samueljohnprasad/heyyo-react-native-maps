import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Pressable,
} from "react-native";
import { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { getDistance } from "geolib";
import { getImage } from "../utils/helpers";
import { useAuth } from "../../AuthContext";
import { getNearByMePost } from "../store/thunk";
import { useDispatch } from "react-redux";
import usePostNearByme from "../hooks/usePostNearByme";
import ClusteredMapView from "./ClusteredMapView/ClusteredMapView";

export default function MapComponent({ latitude, longitude, activeUsers }) {
  const { userDetails } = useAuth();
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const { height } = Dimensions.get("window");
  const CARD_HEIGHT = height / 4;
  const CARD_WIDTH = CARD_HEIGHT - 50;

  const { navigate } = useNavigation();
  const [sliderPosts, setSliderPosts] = useState([]);
  const postNearByme = usePostNearByme();
  useEffect(() => {
    dispatch(getNearByMePost({ latitude, longitude }));
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

  const onMapPostClick = (cluster) => {
    if (cluster.length == 1)
      return navigate("PostOverViewModal", { cluster: cluster[0] });
    setSliderPosts(cluster);
  };

  const onPressSliderCard = (post) => {
    navigate("PostOverViewModal", { cluster: post });
  };

  const getDistanceHandler = (postLatitude, postLongitude) => {
    return getDistance(
      { latitude, longitude },
      { latitude: postLatitude, longitude: postLongitude }
    );
  };

  const animateToRegion = () => {
    let region = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    mapRef.current.animateToRegion(region, 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ClusteredMapView
        clusterColor="#00B386"
        // clusterTextColor="#00B386"
        rotateEnabled={false}
        pitchEnabled={false}
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
        <Pressable onPress={animateToRegion}>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              direction: "rtl",
              top: 70,
              width: 40,
              height: 40,
              backgroundColor: "white",
              borderRadius: "50%",
              position: "absolute",
              right: 20,
              textAlign: "right",
              float: "right",
            }}
          >
            <MaterialCommunityIcons
              name="navigation-variant"
              size={24}
              color="black"
            />
          </View>
        </Pressable>
        {activeUsers.map((map, index) => {
          return (
            <Marker
              key={index}
              tracksViewChanges
              coordinate={{
                latitude: map.coordinates[1],
                longitude: map.coordinates[0],
              }}
              title={map.userName || "activeUser"}
            >
              <Pressable>
                <View style={{ width: 40, height: 40 }}>
                  {getImage(userDetails.imageId)}
                </View>
              </Pressable>
            </Marker>
          );
        })}
        {postNearByme.map((cluster, index) => {
          return (
            <Marker
              key={index}
              tracksViewChanges
              coordinate={{
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
              onPress={() => onMapPostClick(cluster)}
              title={cluster.length.toString()}
            >
              <View style={styles.roundView}></View>
            </Marker>
          );
        })}
      </ClusteredMapView>
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
                <Ionicons
                  name="ios-close"
                  size={24}
                  color="black"
                />
              </View>
            </Pressable>
            <View style={{ flexDirection: "row" }}>
              {sliderPosts.map((post, index) => {
                return (
                  <Pressable
                    key={index}
                    onPress={() => onPressSliderCard(post)}
                  >
                    <View style={styles.card}>
                      <Text>{post.userName}</Text>
                      <Text>{post.message}</Text>
                      <Text>
                        {getDistanceHandler(
                          post.location.coordinates[1],
                          post.location.coordinates[0]
                        )}
                      </Text>
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
  roundViewRed: {
    position: "relative",
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: "red",
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
  tinyLogo: {
    width: 60,
    height: 60,
  },
});
