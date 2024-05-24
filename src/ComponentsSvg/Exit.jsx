/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function Exit(props) {
  return (
    <Svg
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3.303 19.063h8.866c1.817 0 2.788-.98 2.788-2.814v-3.652h-1.85v3.494c0 .73-.366 1.12-1.13 1.12H3.494c-.764 0-1.129-.39-1.129-1.12V3.931c0-.723.365-1.12 1.13-1.12h8.482c.764 0 1.13.397 1.13 1.12v3.51h1.85V3.774c0-1.835-.97-2.806-2.789-2.806H3.303C1.477.967.514 1.938.514 3.773v12.476c0 1.835.963 2.814 2.79 2.814zm5.537-8.21h8.242l1.22-.066-.622.482-1.162 1.087a.788.788 0 00-.249.564c0 .407.299.748.722.748a.716.716 0 00.532-.233l2.664-2.772c.224-.225.299-.432.299-.656 0-.224-.075-.44-.299-.656L17.522 6.58a.695.695 0 00-.53-.241c-.424 0-.723.34-.723.747 0 .207.091.423.25.564l1.161 1.096.631.482-1.229-.075H8.84a.85.85 0 00-.839.855c0 .473.382.847.839.847z"
        fill="#0F77F0"
      />
    </Svg>
  );
}

export default Exit;