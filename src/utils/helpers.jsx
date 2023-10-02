/* eslint-disable import/extensions */
import Boy from '../ComponentsSvg/Boy.js';
import Girl from '../ComponentsSvg/Girl.js';
import Kid from '../ComponentsSvg/Kid.js';
import Man from '../ComponentsSvg/Man.js';
import StylishGirl from '../ComponentsSvg/StylishGirl.js';
import TraditionalGirl from '../ComponentsSvg/TraditionalGirl.js';

export const getImage = (index = 0) => {
  const Images = [
    <Boy />,
    <Girl />,
    <Kid />,
    <Man />,
    <StylishGirl />,
    <TraditionalGirl />,
    <Man />,
  ];
  return Images[index] || Images[0];
};
export const x = 10;
