/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import * as secureStore from 'expo-secure-store';
import dayjs from 'dayjs';
import Boy from '../ComponentsSvg/Boy.jsx';
import Girl from '../ComponentsSvg/Girl.jsx';
import Kid from '../ComponentsSvg/Kid.jsx';
import Man from '../ComponentsSvg/Man.jsx';
import StylishGirl from '../ComponentsSvg/StylishGirl.jsx';
import TraditionalGirl from '../ComponentsSvg/TraditionalGirl.jsx';
import { TOKEN_KEY_USER_DETAILS } from '../../AuthContext.jsx';

export const Images = [
  <Boy key="231" />,
  <Girl key="23d1" />,
  <Kid key="2ds31" />,
  <Man key="2df31" />,
  <StylishGirl key="sw231" />,
  <TraditionalGirl key="2e31" />,
  <Man key="2ee31" />,
];
export const getImage = (index = 0) => Images[index] || Images[0];
export const x = 10;

export const getUserDetailsFromLocalStorage = async () => {
  const localData = await secureStore.getItemAsync(TOKEN_KEY_USER_DETAILS);
  if (!localData) {
    throw new Error('User details not found in local storage');
  }
  return localData;
};

export const getTime = (time) => dayjs(time).format('HH:mm');
