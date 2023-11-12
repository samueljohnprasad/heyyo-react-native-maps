import React from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'SFProTextRegular',
  },
});
function SFProText({ children, style, fontFamily }) {
  return <Text style={[styles.text, style, { fontFamily }]}>{children}</Text>;
}

export default SFProText;
