import React from 'react';
import classNames from 'classnames';

import { Icon } from 'types/types';

import styles from './Icon.module.scss';

const { icon, logo } = styles;

const LogoIcon = ({ className, contentClassName }: Icon): JSX.Element => {
  return (
    <svg
      className={classNames(icon, className)}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 611 604"
      fill="none"
    >
      <path
        className={classNames(logo, contentClassName)}
        d="M346.53 588.06H580.66C588.36 588.06 594.66 582.55 594.66 575.82V268.92C594.66 262.18 588.36 256.67 580.66 256.67H346.53C338.83 256.67 332.53 262.18 332.53 268.92V524.76"
      />
      <path
        className={classNames(logo, contentClassName)}
        d="M267.47 396.84H29.34C22.7126 396.84 17.34 402.213 17.34 408.84V576.07C17.34 582.697 22.7126 588.07 29.34 588.07H267.47C274.097 588.07 279.47 582.697 279.47 576.07V408.84C279.47 402.213 274.097 396.84 267.47 396.84Z"
      />
      <path
        className={classNames(logo, contentClassName)}
        d="M265.47 349.33H31.34C23.64 349.33 17.34 343.82 17.34 337.08V30.18C17.34 23.45 23.64 17.94 31.34 17.94H265.47C273.17 17.94 279.47 23.45 279.47 30.18V286"
      />
      <path
        className={classNames(logo, contentClassName)}
        d="M344.53 209.16L582.66 209.16C589.287 209.16 594.66 203.787 594.66 197.16V29.93C594.66 23.3026 589.287 17.93 582.66 17.93L344.53 17.93C337.903 17.93 332.53 23.3026 332.53 29.93V197.16C332.53 203.787 337.903 209.16 344.53 209.16Z"
      />
    </svg>
  );
};

export default LogoIcon;
