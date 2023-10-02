/* eslint-disable object-curly-newline */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Platform,
} from 'react-native';
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import * as secureStore from 'expo-secure-store';
import { TOKEN_KEY_USER_DETAILS, useAuth } from '../../AuthContext';
import { getImage } from '../utils/helpers';
import { postNewPost, realTimeNewPostUpdates } from '../store/sockets';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  input: {
    minHeight: 100,
    height: 200,
    width: 300,
    flexWrap: 'wrap',
    // borderColor: "#C0C0C0",
    // borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FFFFFF',
    textAlignVertical: 'top',
  },
  logo: {
    width: 66,
    height: 58,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#f0f0f0',
    overflow: 'visible',
    borderColor: 'black',
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 2.84,
      },
    }),
  },
});

function BottomSheetRef() {
  const bottomSheetRef = useRef(null);
  const snapPoints = ['10%', '50%', '90%'];
  const [inputValue, setInputValue] = useState('');
  const { userDetails } = useAuth();
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const [maxDistance, setMaxDistance] = React.useState('');
  const latitude = useSelector(
    (store) => store.map.userCurrentLocation.latitude,
  );
  const longitude = useSelector(
    (store) => store.map.userCurrentLocation.longitude,
  );

  const handleSheetChanges = useCallback(() => {}, []);

  const onChangeText = (text) => {
    setInputValue(text);
  };
  const onPressProfile = () => {
    navigate('Home');
  };

  useEffect(() => {
    dispatch(realTimeNewPostUpdates());
  }, []);

  const onPressPost = async () => {
    const localData = await secureStore.getItemAsync(TOKEN_KEY_USER_DETAILS);
    const { userName, userId } = JSON.parse(localData);
    const callBackFunction = () => {
      setInputValue('');
      setMaxDistance('');
    };

    const newPost = {
      callBackFunction,
      latitude,
      longitude,
      maxDistance,
      userName,
      message: inputValue.trim(),
      userId,
    };
    dispatch(postNewPost(newPost));
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      keyboardBehavior="extend"
      style={{
        backgroundColor: '#fff',
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 2.84,
          },
        }),
      }}
    >
      <View style={styles.contentContainer}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            // borderColor: "red",
            // borderWidth: 1,
            width: '80%',
          }}
        >
          <Text>{userDetails.userName}</Text>
          <Pressable onPress={onPressProfile}>
            <View style={styles.circle}>
              {/* <SvgComponent /> */}
              {getImage(userDetails.imageId)}
              {/* <SvgComponent /> */}
            </View>
          </Pressable>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <View>
            <BottomSheetTextInput
              onChangeText={(value) => {
                if (/^\d*\.?\d{0,2}$/.test(value)) {
                  if (parseFloat(value) <= 6000 || value === '') {
                    setMaxDistance(value);
                  }
                }
              }}
              value={maxDistance}
              keyboardType="numeric"
              placeholder="Enter max distance"
            />
          </View>

          <BottomSheetTextInput
            value={inputValue}
            multiline
            style={styles.input}
            placeholder="Enter text here..."
            numberOfLines={10}
            onChangeText={onChangeText}
          />
          <Button disabled={!inputValue} title="Post" onPress={onPressPost} />
        </View>
      </View>
    </BottomSheet>
  );
}

export default BottomSheetRef;
