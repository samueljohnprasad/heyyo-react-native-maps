import { View, Text, StyleSheet, Pressable } from "react-native";
import { getImage } from "../utils/helpers";

export const UserProfileTag = () => {
  return (
    <View style={styles.contentContainer}>
      <Pressable>
        <View style={{ width: 20, height: 20 }}>{getImage(0)}</View>
      </Pressable>
      <Text style={{ color: "#404040", fontWeight: 600 }}>hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#e9e9e9",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 6,
    borderRadius: 10,
    padding: 5,
    alignSelf: "flex-start", // Important part
    paddingRight: 10,
  },
});
