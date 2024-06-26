/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.8 61.8" {...props}>
      <G data-name="Layer 2">
        <G data-name="\u2014\xCE\xD3\xC8 1">
          <Circle cx={30.9} cy={30.9} r={30.9} fill="#485a69" />
          <Path
            fill="#f9dca4"
            fillRule="evenodd"
            d="m23.242 38.592 15.92.209v12.918l-15.907-.121-.013-13.006z"
          />
          <Path
            fill="#d5e1ed"
            fillRule="evenodd"
            d="M53.478 51.993A30.814 30.814 0 0 1 30.9 61.8a31.225 31.225 0 0 1-3.837-.237A30.699 30.699 0 0 1 15.9 57.919a31.033 31.033 0 0 1-7.857-6.225l1.284-3.1 13.925-6.212c0 4.535 1.84 6.152 7.97 6.244 7.57.113 7.94-1.606 7.94-6.28l12.79 6.281z"
          />
          <Path
            fillRule="evenodd"
            d="M39.165 38.778v3.404c-2.75 4.914-14 4.998-15.923-3.59z"
            opacity={0.11}
          />
          <Path
            fill="#ffe8be"
            fillRule="evenodd"
            d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.267 0-21.281-35.266 0-35.266z"
          />
          <Path
            fill="#f9dca4"
            fillRule="evenodd"
            d="M18.365 24.045c-3.07 1.34-.46 7.687 1.472 7.658a31.973 31.973 0 0 1-1.472-7.658zm25.775 0c3.07 1.339.46 7.687-1.471 7.658a31.992 31.992 0 0 0 1.471-7.658z"
          />
          <Path
            fill="#ecbe6a"
            fillRule="evenodd"
            d="M43.409 29.584s1.066-8.716-2.015-11.752c-1.34 3.528-7.502 4.733-7.502 4.733a16.62 16.62 0 0 0 3.215-2.947c-1.652.715-6.876 2.858-11.61 1.161a23.715 23.715 0 0 0 3.617-2.679s-4.287 2.322-8.44 1.742c-2.991 2.232-1.66 9.162-1.66 9.162C15 18.417 18.697 6.296 31.39 6.226c12.358-.069 16.17 11.847 12.018 23.358z"
          />
          <Path
            fill="#fff"
            fillRule="evenodd"
            d="M23.255 42.179a17.39 17.39 0 0 0 7.958 6.446l-5.182 5.349L19.44 43.87z"
          />
          <Path
            fill="#fff"
            fillRule="evenodd"
            d="M39.16 42.179a17.391 17.391 0 0 1-7.958 6.446l5.181 5.349 6.592-10.103z"
          />
          <Path
            fill="#3dbc93"
            fillRule="evenodd"
            d="M33.366 61.7q-1.239.097-2.504.098-.954 0-1.895-.056l1.031-8.757h2.41z"
          />
          <Path
            fill="#3dbc93"
            fillRule="evenodd"
            d="m28.472 51.456 2.737-2.817 2.736 2.817-2.736 2.817-2.737-2.817z"
          />
        </G>
      </G>
    </Svg>
  );
}
export default SvgComponent;
