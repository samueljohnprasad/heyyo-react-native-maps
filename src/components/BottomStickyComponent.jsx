import React from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Text,
} from 'react-native';
import InputScreen from './InputScreen';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff', // Customize the background color
    paddingVertical: 10, // Customize the padding
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4, // Add elevation for a shadow effect (Android only)
    borderTopWidth: 1,
    borderTopColor: '#F2F4F7',
  },
});

function BottomStickyComponent() {
  return (
    // <KeyboardAvoidingView
    //   keyboardVerticalOffset={50}
    //   style={styles.container}
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on platform
    // >
    <View
      style={{
        padding: 20,
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 50,
        borderTopWidth: 1,
        borderTopColor: '#F2F4F7',
      }}
    >
      <InputScreen />
    </View>
    // </KeyboardAvoidingView>
  );
}

export default BottomStickyComponent;
