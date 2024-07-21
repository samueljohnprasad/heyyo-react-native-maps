/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { useAtomValue } from 'jotai';
import React from 'react';
import { Button } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { createEventAtom } from '../../store/atoms';
import { useAuth } from '../../../AuthContext';
import { getBaseUrl } from '../../helpers';
import { getTime } from '../../utils/helpers';

function CreateEventHeaderRightComp({ navigation }) {
  const createEventValue = useAtomValue(createEventAtom);
  const { userDetails } = useAuth();
  return (
    <Button
      title="Create"
      onPress={async () => {
        try {
          const guestUrl = `${getBaseUrl()}/events/create`;
          await axios.post(guestUrl, {
            createEventValue: {
              ...createEventValue,
              startTime: getTime(createEventValue.startTime),
              endTime: getTime(createEventValue.endTime),
              radius: createEventValue.radius * 1000,
            },
            userDetails,
          });
          navigation.goBack();
        } catch (e) {
          Toast.show({
            type: 'error',
            text1: 'Error creating event',
          });
        }
      }}
    />
  );
}

export default CreateEventHeaderRightComp;
