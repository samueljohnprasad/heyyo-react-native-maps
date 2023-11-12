/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Svg, { Path, Defs, Pattern, Use, Image } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <Path fill="url(#pattern0)" d="M0 0H72V72H0z" />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use xlinkHref="#image0_8_23396" transform="scale(.01389)" />
        </Pattern>
        <Image
          id="image0_8_23396"
          width={72}
          height={72}
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
