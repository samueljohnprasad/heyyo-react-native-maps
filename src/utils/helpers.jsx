/* eslint-disable import/extensions */
import Boy from '../ComponentsSvg/Boy.jsx';
import Girl from '../ComponentsSvg/Girl.jsx';
import Kid from '../ComponentsSvg/Kid.jsx';
import Man from '../ComponentsSvg/Man.jsx';
import StylishGirl from '../ComponentsSvg/StylishGirl.jsx';
import TraditionalGirl from '../ComponentsSvg/TraditionalGirl.jsx';

export const getImage = (index = 0) => {
  const Images = [
    <Boy key="231" />,
    <Girl key="23d1" />,
    <Kid key="2ds31" />,
    <Man key="2df31" />,
    <StylishGirl key="sw231" />,
    <TraditionalGirl key="2e31" />,
    <Man key="2ee31" />,
  ];
  return Images[index] || Images[0];
};
export const x = 10;
