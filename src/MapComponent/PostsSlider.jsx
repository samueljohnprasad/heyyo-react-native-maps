/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import TimeAgo from 'react-native-timeago';
import { getDistance } from 'geolib';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getImage } from '../utils/helpers';
import useSelectedCluster from '../hooks/useSelectedCluster';
import { updateSelectedCluster } from '../store/post.reducer';

const styles = StyleSheet.create({
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
    // position: 'absolute',
    // bottom: 100,
    // left: 0,
    // right: 0,
    // paddingVertical: 10,
  },
});
function PostsSlider() {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const sliderPosts = useSelectedCluster();
  const { height } = Dimensions.get('window');
  const CARD_HEIGHT = height / 4;
  const CARD_WIDTH = CARD_HEIGHT - 50;
  const latitude = useSelector(
    (store) => store.map.userCurrentLocation.latitude,
  );
  const longitude = useSelector(
    (store) => store.map.userCurrentLocation.longitude,
  );
  const getDistanceHandler = (postLatitude, postLongitude) =>
    getDistance(
      { latitude, longitude },
      { latitude: postLatitude, longitude: postLongitude },
    );

  const onPressSliderPostsBack = () => {
    dispatch(updateSelectedCluster({ selectedCluster: -1 }));
  };

  const onPressSliderCard = (post) => {
    navigate('PostOverViewModal', { cluster: post });
  };

  if (!sliderPosts.length) return null;
  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      scrollEventThrottle={1}
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH}
      // style={styles.scrollView}
    >
      <View
        style={{
          flexDirection: 'column',
          gap: 10,
          marginHorizontal: 10,
        }}
      >
        <TouchableOpacity activeOpacity={0.7} onPress={onPressSliderPostsBack}>
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
  );
}

export default PostsSlider;
