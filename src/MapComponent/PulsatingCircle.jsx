/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View } from 'react-native';
import { css } from '@emotion/native';

function PulsatingCircle() {
  return (
    <View
      css={css`
        position: absolute;
        left: 50%;
        top: 50%;
        width: 30px;
        height: 30px;

        &:before {
          content: '';
          position: relative;
          display: block;
          width: 300%;
          height: 300%;
          box-sizing: border-box;
          margin-left: -100%;
          margin-top: -100%;
          border-radius: 45px;
          background-color: #01a4e9;
          animation: pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1)
            infinite;
        }

        &:after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          width: 100%;
          height: 100%;
          background-color: white;
          border-radius: 15px;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
          animation: pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s
            infinite;
        }
      `}
    />
  );
}

export default PulsatingCircle;
