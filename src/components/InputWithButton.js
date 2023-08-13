import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const InputWithButton = () => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    console.log(text);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingRight: 5,
          paddingLeft: 5,
          //   borderWidth: 1,
          //   borderColor: "green",
        }}
      >
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Enter text..."
          placeholderTextColor="#888"
          multiline
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    textAlign: "justify",
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

export default InputWithButton;
