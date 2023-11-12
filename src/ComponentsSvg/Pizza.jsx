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
          <Use xlinkHref="#image0_8_22625" transform="scale(.01389)" />
        </Pattern>
        <Image
          id="image0_8_22625"
          width={72}
          height={72}
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
