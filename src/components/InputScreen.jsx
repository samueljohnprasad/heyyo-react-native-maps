/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avoidView: {
    flex: 1,
    paddingBottom: 40,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFF',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    justifyContent: 'flex-start',
    padding: 5,
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,
    // elevation: 2,
    width: '100%',
  },
  input: {
    maxHeight: 100,
    // borderColor: "gray",
    // borderWidth: 1,
    flex: 1,
    // padding: 10,
    fontSize: 18,
    // borderWidth: 1,
    // borderColor: "green",
    width: '100%',
    minHeight: 42, // starting height
    // borderWidth: 1,
    // borderColor: "red",
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#115dfb',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  buttonWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    minHeight: 40,
    maxHeight: 100,
    height: '100%',
  },
});

function InputScreen({ addCommentHandler }) {
  const [text, setText] = useState('');

  const sendComment = () => {
    addCommentHandler(text);
    setText('');
  };
  return (
    <View style={styles.content}>
      <TextInput
        multiline
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Type here"
      />
      <View style={styles.buttonWrapper}>
        {/* <TouchableOpacity onPress={sendComment} style={styles.button}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity> */}
        <Button onPress={sendComment} title="Post" />
      </View>
      {/* <InputWithButton /> */}
    </View>
  );
}

export default InputScreen;
