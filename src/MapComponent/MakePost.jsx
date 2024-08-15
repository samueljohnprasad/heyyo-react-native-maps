/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import * as secureStore from 'expo-secure-store';
import Slider from '@react-native-community/slider';
import { TOKEN_KEY_USER_DETAILS } from '../../AuthContext';
import { postNewPost } from '../store/sockets';
import SFProText from '../components/SFProText';
import useGetNearByMePost from '../hooks/useGetNearByMePost';

export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    display: 'flex',
    gap: 20,
  },
  input: {
    minHeight: 100,
    maxHeight: 200,
    width: 300,
    flexWrap: 'wrap',
    borderColor: '#C0C0C0',
    borderWidth: 1,
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
});

// 10 100// 10- 100 =-90 // 101-100= 1
function MakePost() {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const getNearByMePosts = useGetNearByMePost();

  const [sliderKm, setSliderKm] = useState(10);
  const [sliderMeters, setSliderMeters] = useState(0);

  // const [maxDistance, setMaxDistance] = React.useState('');
  const latitude = useSelector(
    (store) => store.map.userCurrentLocation.latitude,
  );
  const longitude = useSelector(
    (store) => store.map.userCurrentLocation.longitude,
  );

  const onChangeText = (text) => {
    setInputValue(text);
  };

  const onPressPost = async () => {
    const localData = await secureStore.getItemAsync(TOKEN_KEY_USER_DETAILS);
    const { userName, userId } = JSON.parse(localData);
    const callBackFunction = () => {
      setInputValue('');
      // setMaxDistance('');
    };

    const newPost = {
      callBackFunction,
      latitude,
      longitude,
      maxDistance: sliderKm * 1000 + sliderMeters,
      userName,
      message: inputValue.trim(),
      userId,
    };
    dispatch(postNewPost(newPost));
  };
  console.log('sliderKm', sliderKm);
  var x;

  return (
    <View style={styles.contentContainer}>
      <View style={{ width: '100%' }}>
        <SFProText fontFamily="SFProTextMedium">{`${sliderKm}-kms`}</SFProText>


        <Slider
          onSlidingComplete={() =>
            getNearByMePosts(sliderKm * 1000 + sliderMeters)
          }
          style={{ width: '100%', height: 40 }}
          value={sliderKm}
          minimumValue={0}
          maximumValue={100}
          step={1}
          tapToSeek
          onValueChange={(value) => setSliderKm(value)}
          minimumTrackTintColor="blue"
          maximumTrackTintColor="grey"
        />
        <SFProText fontFamily="SFProTextMedium">{`${sliderMeters}-meters`}</SFProText>
        <Slider
          value={sliderMeters}
          style={{ width: '100%', height: 40 }}
          minimumValue={0}
          maximumValue={999}
          step={10}
          tapToSeek
          onValueChange={(value) => setSliderMeters(value)}
          minimumTrackTintColor="blue"
          maximumTrackTintColor="grey"
          onSlidingComplete={() =>
            getNearByMePosts(sliderKm * 1000 + sliderMeters)
          }
        />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {/* <View>
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
        </View> */}

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
