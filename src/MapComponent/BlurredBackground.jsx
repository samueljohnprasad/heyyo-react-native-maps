import React, { useMemo } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
//import { BlurView } from '@react-native-community/blur';
import { useShowcaseTheme } from "@gorhom/showcase-template";
import { BlurView } from "expo-blur";

const BlurredBackground = () => {
  const { colors } = useShowcaseTheme();
  const containerStyle = useMemo(
    () => [
      styles.container,
      {
        backgroundColor: colors.background,
        opacity: 0.95,
      },
    ],
    [colors.background]
  );
  return Platform.OS === "ios" ? (
    <View style={styles.container}>
      <BlurView
        intensity={100}
        style={styles.blurView}
      ></BlurView>
    </View>
  ) : (
    <View style={containerStyle} />
  );
};

const styles = StyleSheet.create({
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    // backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default BlurredBackground;
