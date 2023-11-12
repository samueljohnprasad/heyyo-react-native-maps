/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function Plus(props) {
  return (
    <Svg
      width={16}
      height={17}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 .5a.889.889 0 00-.889.889V7.61H.89a.889.889 0 000 1.778H7.11v6.222a.889.889 0 001.778 0V9.39h6.222a.889.889 0 000-1.778H8.89V1.39A.889.889 0 008 .5z"
        fill="#0C79FE"
      />
    </Svg>
  );
}

export default Plus;
