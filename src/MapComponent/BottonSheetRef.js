import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Image,
} from "react-native";
import BottomSheet, {
  BottomSheetView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { useAuth } from "../../AuthContext";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/EvilIcons";
import { useSelector } from "react-redux";
import * as secureStore from "expo-secure-store";
import { TOKEN_KEY_USER_DETAILS } from "../../AuthContext";
import { postTheMessage } from "../store/thunk";
import { useDispatch } from "react-redux";
import Toast from "react-native-toast-message";

const BottomSheetRef = () => {
  // ref
  const bottomSheetRef = useRef(null);
  const snapPoints = ["10%", "50%", "90%"];
  const [inputValue, setInputValue] = useState("");
  const { logout, userDetails } = useAuth();
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const [maxDistance, setMaxDistance] = React.useState("");
  const latitude = useSelector(
    (store) => store.map.userCurrentLocation.latitude
  );
  const longitude = useSelector(
    (store) => store.map.userCurrentLocation.longitude
  );

  // callbacks
  const handleSheetChanges = useCallback((index) => {}, []);

  const onChangeText = (text) => {
    setInputValue(text);
  };
  const onPressProfile = () => {
    navigate("Home");
  };
  // renders🥲
  const onPressPost = async () => {
    const localData = await secureStore.getItemAsync(TOKEN_KEY_USER_DETAILS);
    const { userName, userId } = JSON.parse(localData);
    const callBackFunction = () => {
      setInputValue("");
      setMaxDistance("");
    };

    dispatch(
      postTheMessage({
        callBackFunction,
        latitude,
        longitude,
        maxDistance,
        userName,
        message: inputValue,
        createAt: new Date(),
        userId,
      })
    );
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      keyboardBehavior="extend"
    >
      <View style={styles.contentContainer}>
        <View
          style={{
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            // borderColor: "red",
            // borderWidth: 1,
            width: "80%",
          }}
        >
          <Text>{userDetails.userName} 🎉</Text>
          <Pressable onPress={onPressProfile}>
            <FontAwesome name="user" size={50} color="black" />
          </Pressable>
        </View>

        <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <BottomSheetTextInput
            onChangeText={setMaxDistance}
            value={maxDistance}
            keyboardType="numeric"
            placeholder="Enter max distance"
          />
          <BottomSheetTextInput
            value={inputValue}
            multiline={true}
            style={styles.input}
            placeholder="Enter text here..."
            numberOfLines={10}
            onChangeText={onChangeText}
          />
          <Button disabled={!inputValue} title="Post" onPress={onPressPost} />
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    minHeight: 100,
    height: 200,
    width: 300,
    flexWrap: "wrap",
    borderColor: "#C0C0C0",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#FFFFFF",
    textAlignVertical: "top",
  },
});

export default BottomSheetRef;
