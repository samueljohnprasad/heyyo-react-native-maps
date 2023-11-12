/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function Compass(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M17.35 2.5L2.5 10.278h7.071v7.071L17.35 2.5z"
        stroke="#6C6C6C"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Compass;
