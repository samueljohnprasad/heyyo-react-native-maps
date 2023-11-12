/* eslint-disable import/extensions */
import Boy from '../ComponentsSvg/Boy.jsx';
import Girl from '../ComponentsSvg/Girl.jsx';
import Kid from '../ComponentsSvg/Kid.jsx';
import Man from '../ComponentsSvg/Man.jsx';
import StylishGirl from '../ComponentsSvg/StylishGirl.jsx';
import TraditionalGirl from '../ComponentsSvg/TraditionalGirl.jsx';

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
