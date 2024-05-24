import React from 'react';
import { View, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { ProfileStyles } from '../MapComponent/modelScreens/Profile';
import { getImage } from '../utils/helpers';
import { useAuth } from '../../AuthContext';

function BottomTabs({ openBottomSheetToSnapPoint, selectedTab }) {
  const { userDetails } = useAuth();

  return (
    <BlurView
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        // backgroundColor: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.30)',
        justifyContent: 'space-around',
        borderWidth: 0.5,
        borderColor: 'rgba(0, 0, 0, 0.12)',
        height: '9%',
      }}
    >
      <Pressable
        style={{
          paddingTop: 22,
          paddingBottom: 22,
          flex: 1,
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        suppressHighlighting
        onPress={() => openBottomSheetToSnapPoint(0)}
      >
        <MaterialIcons
          name="post-add"
          size={30}
          color={selectedTab === 0 ? 'blue' : 'black'}
        />
      </Pressable>
      <Pressable
        suppressHighlighting
        onPress={() => openBottomSheetToSnapPoint(1)}
        style={{
          paddingTop: 22,
          paddingBottom: 22,
          flex: 1,
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MaterialIcons
          name="event-note"
          size={30}
          color={selectedTab === 1 ? 'blue' : 'black'}
        />
      </Pressable>
      <Pressable
        suppressHighlighting
        onPress={() => openBottomSheetToSnapPoint(2)}
        style={{
          paddingTop: 22,
          paddingBottom: 22,
          flex: 1,
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={[
            ProfileStyles.circle,
            selectedTab !== 2 && {
              borderColor: 'black',
              shadowColor: 'black',
            },
          ]}
        >
          {getImage(userDetails.imageId)}
        </View>
      </Pressable>
    </BlurView>
  );
}

export default BottomTabs;
