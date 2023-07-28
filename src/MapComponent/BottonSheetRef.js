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
import { TOKEN_KEY } from "../../AuthContext";
const BottomSheetRef = () => {
  // ref
  const bottomSheetRef = useRef(null);
  const snapPoints = ["10%", "50%", "90%"];
  const [inputValue, setInputValue] = useState("");
  const { logout, userDetails } = useAuth();
  const { navigate } = useNavigation();
  const [maxDistance, setMaxDistance] = React.useState("");
  const latitude = useSelector(
    (store) => store.map.userCurrentLocation.latitude
  );
  const longitude = useSelector(
    (store) => store.map.userCurrentLocation.longitude
  );

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const onChangeText = (text) => {
    setInputValue(text);
  };
  const onPressProfile = () => {
    navigate("Home");
    console.log("home>>>>>>>>>>");
  };
  // renders🥲
  const onPressPost = async () => {
    const localData = await secureStore.getItemAsync(TOKEN_KEY);
    const { userName, userId } = JSON.parse(localData);

    console.log({ latitude, longitude, maxDistance, userId, userName });
  };
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
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

        <Button onPress={logout} title="Logout" />
        <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <TextInput
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
