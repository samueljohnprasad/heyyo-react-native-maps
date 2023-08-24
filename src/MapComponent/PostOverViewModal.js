import React from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { getDistance } from "geolib";
import { getImage } from "../utils/helpers";
import InputWithButton from "../components/InputWithButton";
import { UserProfileTag } from "../components/UserProfileTag";
import InputScreen from "../components/InputScreen";

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
    <KeyboardAvoidingView
      keyboardVerticalOffset={80}
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "#ffffff",
        }}
      >
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
                <ScrollView
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
                </ScrollView>
                <View style={{ padding: 10 }}>
                  <InputScreen />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
