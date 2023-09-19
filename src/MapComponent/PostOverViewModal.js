import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Button,
} from "react-native";
import { getDistance } from "geolib";
import { getImage } from "../utils/helpers";
import { UserProfileTag } from "../components/UserProfileTag";
import InputScreen from "../components/InputScreen";
import { GiftedChat } from "react-native-gifted-chat";

function Comment({ comment }) {
  return (
    <View style={styles.commentContainer}>
      <Text style={styles.author}>{comment.author}:</Text>
      <Text style={styles.text}>{comment.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  author: {
    fontWeight: "bold",
  },
  text: {
    marginTop: 5,
  },
});

const commentData = [
  {
    id: 1,
    author: "User1",
    text: "This is the first comment.",
  },
  {
    id: 2,
    author: "User2",
    text: "Nice work on this post!",
  },
  {
    id: 3,
    author: "User3",
    text: "I have a question about this topic.",
  },
  {
    id: 4,
    author: "User3",
    text: "I have a question about this topic.",
  },
  {
    id: 5,
    author: "User3",
    text: "I have a question about this topic.",
  },
  {
    id: 6,
    author: "User3",
    text: "I have a question about this topic.",
  },
  {
    id: 7,
    author: "User3",
    text: "I have a question about this topic.",
  },
  {
    id: 8,
    author: "User3",
    text: "I have a question about this topic.",
  },
  {
    id: 9,
    author: "User3",
    text: "I have a question about this topic.",
  },
];

export default function PostOverViewModal({ route }) {
  const postLat = route.params.cluster.location.coordinates[1];
  const postLon = route.params.cluster.location.coordinates[0];
  const latitude = useSelector(
    (store) => store.map.userCurrentLocation.latitude
  );
  const longitude = useSelector(
    (store) => store.map.userCurrentLocation.longitude
  );

  const { isLoadings, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://api.github.com/repos/TanStack/query").then((res) =>
        res.json()
      ),
  });

  const getDistanceHandler = () => {
    return getDistance(
      { latitude: postLat, longitude: postLon },
      { latitude, longitude }
    );
  };

  const [comments, setComments] = useState(commentData);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  const loadMoreComments = useCallback(async () => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);
    setIsLoadingMore(false);

    console.log("setIsLoadingMore");
  }, []);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={80}
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "#ffffff",
        }}
      > */}
      <View
        style={{
          flex: 1,
          padding: 15,
          backgroundColor: "#ffffff",
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              borderRadius: 10,
              gap: 30,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Pressable>
                  <View style={{ width: 40, height: 40 }}>{getImage(0)}</View>
                </Pressable>
                <View>
                  <Text
                    style={{
                      color: "#262528",
                      fontWeight: 600,
                      fontSize: 16,
                    }}
                  >
                    {route.params.cluster.userName}
                  </Text>
                </View>
              </View>
              <Text style={{ color: "#404040" }}>
                {route.params.cluster.message}
              </Text>
              <Text>{getDistanceHandler()}m</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#f6f6f6",
                width: "100%",
                borderRadius: 8,
                flexDirection: "column",
                // borderWidth: 2,
                // borderColor: "red",

                gap: 25,
              }}
            >
              <View style={{ height: 400 }}>
                <FlatList
                  data={[...comments]}
                  renderItem={({ item }) => <Comment comment={item} />}
                  keyExtractor={(item) => item.id.toString()}
                  onEndReached={loadMoreComments}
                  onEndReachedThreshold={0.1}
                  ListFooterComponent={() =>
                    isLoadingMore ? <ActivityIndicator /> : null
                  }
                  ListEmptyComponent={() => <Text>No comments available</Text>}
                />

                <Button title="Send" />
              </View>
              {/* <ScrollView
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
                </ScrollView> */}
              {/* <View style={{ padding: 10 }}>
                <InputScreen />
              </View> */}
            </View>
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
    </KeyboardAvoidingView>
  );
}

const styless = StyleSheet.create({
  container: {
    // Set the fixed height for the parent container
  },
  flatList: {
    flex: 1,
  },
});
