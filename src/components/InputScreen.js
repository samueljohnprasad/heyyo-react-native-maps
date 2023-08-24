import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { UserProfileTag } from "./UserProfileTag";
import InputWithButton from "./InputWithButton";
import { Text } from "react-native";

const YourScreenComponent = () => {
  const [text, setText] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={100}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.avoidView}
      >
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Type here"
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
          {/* <InputWithButton /> */}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avoidView: {
    flex: 1,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    justifyContent: "flex-start",
    padding: 5,
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: "100%",
  },
  input: {
    height: 40,
    // borderColor: "gray",
    // borderWidth: 1,
    flex: 1,
    // padding: 10,
    fontSize: 18,
    // borderWidth: 1,
    // borderColor: "green",
    flex: 1,
    width: "100%",
    minHeight: 30, // starting height
    // borderWidth: 1,
    // borderColor: "red",
  },
  button: {
    backgroundColor: "#115dfb",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
});

export default YourScreenComponent;
