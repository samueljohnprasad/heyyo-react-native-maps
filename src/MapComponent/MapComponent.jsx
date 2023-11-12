/* eslint-disable operator-linebreak */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable implicit-arrow-linebreak */
import { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from '@expo/vector-icons';
import { getDistance } from 'geolib';
import { useDispatch } from 'react-redux';
import TimeAgo from 'react-native-timeago';
import { getImage } from '../utils/helpers';
import { getNearByMePost } from '../store/thunk';
import usePostNearByme from '../hooks/usePostNearByme';
import ClusteredMapView from './ClusteredMapView/ClusteredMapView';
import useSelectedCluster from '../hooks/useSelectedCluster';
import { updateSelectedCluster } from '../store/post.reducer';
import { IntersectingCircles } from '../components/Circle';
import Compass from '../ComponentsSvg/Compass';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },

  customMarker: {
    position: 'relative',
    width: 200,
    height: 200,
    borderRadius: '50%',
    backgroundColor: '#red',
    borderColor: 'black',
    borderWidth: 2,
  },
  roundView: {
    position: 'relative',
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: '#f0f0f0',
    overflow: 'visible',
    borderColor: 'black',
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 1.84,
      },
    }),
  },
  roundViewRed: {
    position: 'relative',
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: 'red',
    overflow: 'visible',
    borderColor: 'black',
    borderWidth: 2,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: 200,
    width: 200,
    overflow: 'hidden',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
  },
  scrollView: {
    position: 'absolute',
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

export default function MapComponent({ latitude, longitude, activeUsers }) {
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const { height } = Dimensions.get('window');
  const CARD_HEIGHT = height / 4;
  const CARD_WIDTH = CARD_HEIGHT - 50;
  const [showActiveUsers, setShowActiveUsers] = useState(false);

  const { navigate } = useNavigation();
  // const [sliderPosts, setSliderPosts] = useState([]);
  const sliderPosts = useSelectedCluster();
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
    // setSliderPosts([]);
    dispatch(updateSelectedCluster({ selectedCluster: -1 }));
  };

  const onMapPostClick = (selectedCluster, cluster) => {
    if (cluster.length === 1) {
      navigate('PostOverViewModal', { cluster: cluster[0] });
      return;
    }
    // setSliderPosts(cluster);
    dispatch(updateSelectedCluster({ selectedCluster }));
  };

  const onPressSliderCard = (post) => {
    navigate('PostOverViewModal', { cluster: post });
  };

  const getDistanceHandler = (postLatitude, postLongitude) =>
    getDistance(
      { latitude, longitude },
      { latitude: postLatitude, longitude: postLongitude },
    );

  const animateToRegion = () => {
    const region = {
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    mapRef.current.animateToRegion(region, 2000);
  };
  console.log('activeUsers>>>>>>>>>>>>>', activeUsers);
  return (
    <View style={styles.container}>
      <ClusteredMapView
        clusterColor="#00B386"
        // clusterTextColor="#00B386"
        rotateEnabled={false}
        pitchEnabled={false}
        ref={mapRef}
        loadingEnabled
        // followsUserLocation
        loadingIndicatorColor="red"
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        moveOnMarkerPress
        showsIndoors
        showsMyLocationButton
        showsBuildings
        showsUserLocation
        userLocationAnnotationTitle="this is my location"
        style={styles.map}
        // userInterfaceStyle="dark"
        // userLocationFastestInterval={5000}
        // onUserLocationChange={() => console.log('onUserLocationChange')}
      >
        {showActiveUsers &&
          activeUsers.map((map, index) => (
            <Marker
              key={index}
              tracksViewChanges
              coordinate={{
                latitude: map.coordinates[1],
                longitude: map.coordinates[0],
              }}
              title={map.userName || 'activeUser'}
            >
              <TouchableOpacity activeOpacity={0.7}>
                <View style={{ width: 40, height: 40 }}>
                  {getImage(map.imageId)}
                </View>
              </TouchableOpacity>
            </Marker>
          ))}
        {!showActiveUsers &&
          postNearByme.map((cluster, index) => (
            <Marker
              key={index}
              tracksViewChanges
              coordinate={{
                latitude:
                  cluster.reduce(
                    (acc, image) => acc + image.location.coordinates[1],
                    0,
                  ) / cluster.length,

                longitude:
                  cluster.reduce(
                    (acc, image) => acc + image.location.coordinates[0],
                    0,
                  ) / cluster.length,
              }}
              onPress={() => onMapPostClick(index, cluster)}
              // title={cluster.length.toString()}
            >
              {/* <View
              style={{
                padding: 5,
                backgroundColor: '#fff',
                borderRadius: '50%',
                flexDirection: 'row',
              }}
            > */}
              {/* <View style={styles.roundView}>{getImage(0)}</View>
              <View style={styles.roundView}>{getImage(2)}</View> */}
              <IntersectingCircles count={1} cluster={cluster} />
              {/* </View> */}
            </Marker>
          ))}
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
              flexDirection: 'column',
              gap: 10,
              marginHorizontal: 10,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onPressSliderPostsBack}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons name="ios-close" size={24} color="black" />
              </View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
              {sliderPosts.map((post, index) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  key={index}
                  onPress={() => onPressSliderCard(post)}
                >
                  <View style={styles.card}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        gap: 15,
                      }}
                    >
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          gap: 5,
                        }}
                      >
                        <View style={{ width: 30, height: 30 }}>
                          {getImage(post.user.imageId)}
                        </View>
                        <Text
                          style={{
                            color: '#262528',
                            fontWeight: 600,
                            fontSize: 14,
                          }}
                        >
                          {post.user.userName}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'column', gap: 5 }}>
                        <View style={{ maxHeight: 90 }}>
                          <Text numberOfLines={5}>{post.message}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                          <TimeAgo time={post.createAt} />
                          <Text>
                            {`${getDistanceHandler(
                              post.location.coordinates[1],
                              post.location.coordinates[0],
                            )}m away`}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                      }}
                    >
                      <MaterialIcons
                        name="keyboard-arrow-right"
                        size={24}
                        color="black"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Animated.ScrollView>
      )}
      <View
        style={{
          position: 'absolute',
          top: 70,
          right: 30,
          backgroundColor: '#FBFBFB',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <TouchableOpacity
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            direction: 'rtl',
            textAlign: 'right',
            float: 'right',
            width: 40,
            height: 40,
            borderBottomWidth: 0.3,
            borderBottomColor: '#B7B7B5',
          }}
          activeOpacity={0.7}
          onPress={animateToRegion}
        >
          {/* <MaterialCommunityIcons
            name="navigation-variant"
            size={24}
            color="black"
          /> */}
          <Compass />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowActiveUsers((prev) => !prev)}
        >
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
            }}
          >
            {!showActiveUsers && (
              <Octicons name="people" size={24} color="#6C6C6C" />
            )}
            {showActiveUsers && (
              <MaterialCommunityIcons
                name="post-outline"
                size={24}
                color="#6C6C6C"
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ...Platform.select({
//   ios: {
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 2.84,
//   },
// }),
