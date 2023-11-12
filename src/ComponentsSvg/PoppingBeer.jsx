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
          <Use xlinkHref="#image0_9_25000" transform="scale(.01389)" />
        </Pattern>
        <Image
          id="image0_9_25000"
          width={72}
          height={72}
          xlinkHref="data:image/png;base64,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"
        />
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
