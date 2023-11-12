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
          <Use xlinkHref="#image0_8_21000" transform="scale(.01389)" />
        </Pattern>
        <Image
          id="image0_8_21000"
          width={72}
          height={72}
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
