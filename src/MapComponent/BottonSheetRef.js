import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useAuth } from "../../AuthContext";
const BottomSheetRef = () => {
  // ref
  const bottomSheetRef = useRef(null);
  const snapPoints = ["10%", "50%", "90%"];
  const [inputValue, setInputValue] = useState("");
  const { logout, userDetails } = useAuth();
  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const onChangeText = (text) => {
    setInputValue(text);
  };

  // renders🥲
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <View style={styles.contentContainer}>
        <Text>{userDetails.userName} 🎉</Text>
        <Button onPress={logout} title="Logout" />
        <View style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <TextInput
            value={inputValue}
            multiline={true}
            style={styles.input}
            placeholder="Enter text here..."
            numberOfLines={10}
          />
          <Button disabled={!inputValue} title="Post" />
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
