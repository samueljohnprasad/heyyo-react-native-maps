import React from 'react';
import { View } from 'react-native';
import InputScreen from './InputScreen';

function BottomStickyComponent() {
  return (
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
  );
}

export default BottomStickyComponent;
