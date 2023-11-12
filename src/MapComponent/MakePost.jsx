/* eslint-disable object-curly-newline */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Pressable, View, StyleSheet, Platform, Button } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import * as secureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { getImage } from '../utils/helpers';
import { TOKEN_KEY_USER_DETAILS, useAuth } from '../../AuthContext';
import { postNewPost } from '../store/sockets';
import SFProText from '../components/SFProText';
import styled from '@emotion/native';

export const styles = StyleSheet.create({
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
    // backgroundColor: '#FFFFFF',
    textAlignVertical: 'top',
  },
  logo: {
    width: 66,
    height: 58,
  },
  circle: {
    width: 42,
    height: 42,
    borderRadius: 100,
    backgroundColor: '#fff',
    padding: 2,
    overflow: 'visible',
    borderColor: 'blue',
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: 'blue',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 2.84,
      },
    }),
  },
});

const ImageWrapper = styled.View`
  width: 42px;
  height: 42px;
  border-radius: 100px;
  background-color: '#fff';
  padding: 3px;
  border-color: blue;
  border-width: 1px;
  overflow: 'visible';
  border-width: 1px;
  elevation: 5;
  /* box-shadow: 10px 5px 5px black; */
  shadow-opacity: 0.9;
  shadow-radius: 2.84px;
  shadow-color: blue;
  shadow-offset: 0px 0px;
`;
function MakePost() {
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

  const onPressProfile = () => {
    navigate('Home');
  };

  const onChangeText = (text) => {
    setInputValue(text);
  };

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
        <SFProText
          fontFamily="SFProTextMedium"
          style={{ fontSize: 16, fontWeight: 'bold' }}
        >
          {userDetails.userName}
        </SFProText>
        <Pressable onPress={onPressProfile}>
          <View
            style={[
              styles.circle,
              { borderColor: 'black', shadowColor: 'black' },
            ]}
          >
            {getImage(userDetails.imageId)}
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
            placeholder="Enter max distance to reach in meters"
          />
        </View>

        <BottomSheetTextInput
          value={inputValue}
          multiline
          style={styles.input}
          placeholder="ask or say something to nearby people"
          numberOfLines={10}
          onChangeText={onChangeText}
        />
        <Button disabled={!inputValue} title="Post" onPress={onPressPost} />
      </View>
    </View>
  );
}

export default MakePost;
