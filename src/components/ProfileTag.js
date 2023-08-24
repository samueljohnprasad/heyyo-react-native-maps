import React from "react";
import { View, Text, StyleSheet } from "react-native-web";
import { getImage } from "../utils/helpers";

export default function ProfileTag() {
  return (
    <View styles={styles.container}>
      <View>
        <Text>Samuel</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 66,
    height: 58,
  },
  container: {
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: "white",
  },
});
