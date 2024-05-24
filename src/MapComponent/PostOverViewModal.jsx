/* eslint-disable indent */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable function-paren-newline */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useRef, useState } from 'react';
import TimeAgo from 'react-native-timeago';
import { getDistance } from 'geolib';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import * as secureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import ReactTimeAgo from 'react-time-ago';
import { getImage } from '../utils/helpers';
import { getBaseUrl } from '../../helpers';
import InputScreen from '../components/InputScreen';
import { socket } from '../network/socket';
import { TOKEN_KEY_USER_DETAILS } from '../../AuthContext';
import UserProfileTag from '../components/UserProfileTag';
// export NODE_TLS_REJECT_UNAUTHORIZED='0'

const styles = StyleSheet.create({
  commentContainer: {
    padding: 10,
  },
  author: {
    fontWeight: 'bold',
  },
  text: {
    marginTop: 5,
  },
});
function Time({ children }) {
  return <Text>{children}</Text>;
}
export function ShowTime({ date }) {
  return (
    <ReactTimeAgo
      timeStyle="mini"
      locale="en-US"
      date={new Date(date)}
      component={Time}
    />
  );
}

function Comment({ comment }) {
  return (
    <View style={styles.commentContainer}>
      <View
        style={{
          flexDirection: 'row',
          gap: 5,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <UserProfileTag userName={comment.user.userName} />
        <ShowTime date={comment.createdAt} />
      </View>
      <Text style={styles.text}>{comment.text}</Text>
    </View>
  );
}

export default function PostOverViewModal({ route }) {
  const postLat = route.params.cluster.location.coordinates[1];
  const postLon = route.params.cluster.location.coordinates[0];
  const latitude = useSelector(
    (store) => store.map.userCurrentLocation.latitude,
  );
  const longitude = useSelector(
    (store) => store.map.userCurrentLocation.longitude,
  );
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [comments, setComments] = useState([]);
  // const [page, setPage] = useState(1);

  // ${route.params.cluster._id}
  const getData = async () => {
    try {
      const result = await fetch(
        !comments.length
          ? `${getBaseUrl()}/post/${route.params.cluster._id}?page=10`
          : `${getBaseUrl()}/post/${
              route.params.cluster._id
            }?page=10&timestamp=${comments[comments.length - 1].createdAt}`,
      ).then((res) => res.json());
      if (!result.comments.length) return 0;
      setComments((prev) => [...prev, ...result.comments]);
      return result.comments.length;
    } catch (e) {
      setIsLoadingMore(false);
      Toast.show({
        type: 'error',
        text1: 'Error fetching post details',
      });
    }
    return 0;
  };

  useEffect(() => {
    socket.on('newComment', (comment) => {
      setComments((prevComments) => [comment, ...prevComments]);
    });
  }, []);

  const getDistanceHandler = () =>
    getDistance(
      { latitude: postLat, longitude: postLon },
      { latitude, longitude },
    );
  const flatlistRef = useRef();

  const loadMoreComments = async () => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);
    await getData();

    setIsLoadingMore(false);
  };

  const addCommentHandler = async (comment) => {
    const localData = await secureStore.getItemAsync(TOKEN_KEY_USER_DETAILS);
    const { userId } = JSON.parse(localData);

    try {
      socket.emit('postComment', {
        postId: route.params.cluster._id,
        comment: comment.trim(),
        userId,
      });
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Error adding comment',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={50}
      style={{ flex: 1, padding: 10 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* <View style={{ flex: 1 }}> */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: 10,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <TouchableOpacity activeOpacity={0.7}>
            <View style={{ width: 40, height: 40 }}>
              {getImage(route.params.cluster.user.imageId)}
            </View>
          </TouchableOpacity>
          <Text
            style={{
              color: '#262528',
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            {route.params.cluster.user.userName}
          </Text>
        </View>
        <Text style={{ color: '#404040' }}>{route.params.cluster.message}</Text>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TimeAgo time={route.params.cluster.createAt} />
          <Text>{`${getDistanceHandler()}m away`}</Text>
        </View>
      </View>
      <FlatList
        style={{ flex: 1 }}
        ref={flatlistRef}
        data={[...comments]}
        renderItem={({ item }) => <Comment comment={item} />}
        keyExtractor={(item, index) => item._id.toString() + index}
        onEndReached={loadMoreComments}
        onEndReachedThreshold={0.01}
        // ListFooterComponent={() => <ActivityIndicator />}
        ListEmptyComponent={() => (
          <View style={{ marginTop: 30 }}>
            <Text>No comments available</Text>
          </View>
        )}
        scrollEventThrottle={150}
        ItemSeparatorComponent={({ highlighted }) => (
          <View
            style={[highlighted && { marginLeft: 0, backgroundColor: 'red' }]}
          />
        )}
      />
      <View
        style={{
          padding: 20,
          paddingLeft: 50,
          paddingRight: 50,
          paddingBottom: 50,
          borderTopWidth: 1,
          borderTopColor: '#F2F4F7',
        }}
      >
        <InputScreen addCommentHandler={addCommentHandler} />
      </View>
    </KeyboardAvoidingView>
  );
}

/* <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: 10,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            borderWidth: 2,
          }}
        >
          <Pressable>
            <View style={{ width: 40, height: 40 }}>{getImage(0)}</View>
          </Pressable>
          <View>
            <Text
              style={{
                color: '#262528',
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              {route.params.cluster.userName}
            </Text>
          </View>
        </View>
        <Text style={{ color: '#404040' }}>{route.params.cluster.message}</Text>
        <Text>{getDistanceHandler()}</Text>
      </View> */

/* <View
              style={{
                backgroundColor: '#f6f6f6',
                width: '100%',
                borderRadius: 8,
                flexDirection: 'column',
                // borderWidth: 2,
                // borderColor: "red",

                gap: 25,
              }}
            > */

/* <ScrollView
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    flexDirection: "column",
                    gap: 10,
                    maxHeight: 500,

                    // borderWidth: 2,
                    // borderColor: "red",
                  }}
                  contentContainerStyle={{
                    rowGap: 10,
                    flexGrow: 1,
                    padding: 10,
                  }}
                >
                  <View style={{ gap: 2 }}>
                    <UserProfileTag />
                    <Text>
                      In React Native, to make a parent container take its
                      child's width, you can use the following approach:
                    </Text>
                  </View>
                  <View style={{ gap: 2 }}>
                    <UserProfileTag />
                    <Text>
                      In React Native, to make a parent container take its
                      child's width, you can use the following approach:
                    </Text>
                  </View>
                  <View style={{ gap: 2 }}>
                    <UserProfileTag />
                    <Text>
                      In React Native, to make a parent container take its
                      child's width, you can use the following approach:
                    </Text>
                  </View>
                  <View style={{ gap: 2 }}>
                    <UserProfileTag />
                    <Text>
                      In React Native, to make a parent container take its
                      child's width, you can use the following approach:
                    </Text>
                  </View>
                  <View style={{ gap: 2 }}>
                    <UserProfileTag />
                    <Text>
                      In React Native, to make a parent container take its
                      child's width, you can use the following approach:
                    </Text>
                  </View>
                  <View style={{ gap: 2 }}>
                    <UserProfileTag />
                    <Text>
                      In React Native, to make a parent container take its
                      child's width, you can use the following approach:
                    </Text>
                  </View>
                  <View style={{ gap: 2 }}>
                    <UserProfileTag />
                    <Text>
                      In React Native, to make a parent container take its
                      child's width, you can use the following approach:
                    </Text>
                  </View>
                  <View style={{ gap: 2 }}>
                    <UserProfileTag />
                    <Text>
                      In React Native, to make a parent container take its
                      child's width, you can use the following approach:
                    </Text>
                  </View>
                  <View style={{ gap: 2 }}>
                    <UserProfileTag />
                    <Text>
                      In React Native, to make a parent container take its
                      child's width, you can use the following approach:
                    </Text>
                  </View>
                  <View style={{ gap: 2 }}>
                    <UserProfileTag />
                    <Text>
                      In React Native, to make a parent container take its
                      child's width, you can use the following approach:
                    </Text>
                  </View>
                </ScrollView> */

/* <FlatList
                  scrollToEnd={(params) => {
                    console.log('paramsssss', params);
                  }}
                  ref={flatlistRef}
                  data={[...comments]}
                  renderItem={({ item }) => <Comment comment={item} />}
                  keyExtractor={(item) => item._id.toString()}
                  onEndReached={loadMoreComments}
                  onEndReachedThreshold={0.01}
                  // ListFooterComponent={() => <ActivityIndicator />}
                  ListEmptyComponent={() => <Text>No comments available</Text>}
                  scrollEventThrottle={150}
                  onScrollBeginDrag={() => setParentScrollEnabled(false)} // Disable parent scroll
                  onScrollEndDrag={() => setParentScrollEnabled(true)}
                />

                <InputScreen addCommentHandler={addCommentHandler} /> */
