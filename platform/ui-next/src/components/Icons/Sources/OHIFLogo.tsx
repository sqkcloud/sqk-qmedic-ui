import React from 'react';
import type { IconProps } from '../types';


export const OHIFLogo = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <img
      src="sqk-logo-light.svg"
      alt="SQK"
      style={{ height: 28, width: 'auto' }}
      {...props}
    />
  );
};

export default OHIFLogo;
