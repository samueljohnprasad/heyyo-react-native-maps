/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import { Button, View } from 'react-native';
import React from 'react';
import { useAtomValue } from 'jotai';
import axios from 'axios';
import * as secureStore from 'expo-secure-store';
import { countAtom } from '../../store/atoms';
import { TOKEN_KEY_USER_DETAILS, useAuth } from '../../../AuthContext';
import { getBaseUrl } from '../../helpers';

function HeaderRightComp({ navigation }) {
  const { userDetails, setUserDetails } = useAuth();
  const selectedImage = useAtomValue(countAtom);

  return (
    <View>
      <Button
        onPress={async () => {
          try {
            const guestUrl = `${getBaseUrl()}/users/change-image`;
            await axios.post(guestUrl, {
              imageId: selectedImage,
              userId: userDetails.userId,
            });

            const localData = await secureStore.getItemAsync(
              TOKEN_KEY_USER_DETAILS,
            );
            const parseLocalData = JSON.parse(localData);
            const localStorageDetails = {
              ...parseLocalData,
              imageId: selectedImage,
            };
            await secureStore.setItemAsync(
              TOKEN_KEY_USER_DETAILS,
              JSON.stringify(localStorageDetails),
            );
            setUserDetails((prev) => ({ ...prev, imageId: selectedImage }));
            navigation.goBack();
          } catch (e) {
            console.log(e);
          }
        }}
        title="Set"
        color="#000"
        raised
      />
    </View>
  );
}

export default HeaderRightComp;
