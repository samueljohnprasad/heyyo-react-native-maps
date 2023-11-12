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
          <Use xlinkHref="#image0_8_19996" transform="scale(.01389)" />
        </Pattern>
        <Image
          id="image0_8_19996"
          width={72}
          height={72}
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
