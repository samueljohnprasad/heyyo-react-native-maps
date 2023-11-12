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
          <Use xlinkHref="#image0_8_22967" transform="scale(.01389)" />
        </Pattern>
        <Image
          id="image0_8_22967"
          width={72}
          height={72}
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
