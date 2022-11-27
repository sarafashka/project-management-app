import React from 'react';
import classNames from 'classnames';

import { Icon } from 'types/types';

import styles from './Icon.module.scss';

const { icon, signOut, plus, signUp } = styles;

export const DropDownIcon = ({ className }: Icon): JSX.Element => {
  return (
    <svg
      fill="none"
      className={classNames(icon, className)}
      width="320px"
      height="192px"
      viewBox="0 0 320 192"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.9 24.7L4.7 26.8L140.7 183.3C145.3 188.6 152.2 191.9 159.9 191.9C167.6 191.9 174.5 188.5 179.1 183.3L315 27.1L317.3 24.5C319 22 320 19 320 15.8C320 7.1 312.6 0 303.4 0H16.6C7.4 0 0 7.1 0 15.8C0 19.1 1.1 22.2 2.9 24.7Z" />
    </svg>
  );
};

export const SignOutIcon = ({ className, contentClassName }: Icon): JSX.Element => {
  return (
    <svg
      fill="none"
      className={classNames(icon, className)}
      width="16px"
      height="20px"
      viewBox="0 0 16 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path className={classNames(signOut, contentClassName)} d="M8 10H15M15 10L12 13M15 10L12 7" />
      <path
        className={classNames(signOut, contentClassName)}
        d="M15 4V3C15 1.89543 14.1046 1 13 1H3C1.89543 1 1 1.89543 1 3V17C1 18.1046 1.89543 19 3 19H13C14.1046 19 15 18.1046 15 17V16"
      />
    </svg>
  );
};

export const EditIcon = ({ className }: Icon): JSX.Element => {
  return (
    <svg
      fill="none"
      className={classNames(icon, className)}
      width="512px"
      height="512px"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M493.278,154.515l-22.625,22.641L334.871,41.39l22.625-22.641c25-25,65.531-25,90.531,0l45.25,45.266  C518.246,89,518.246,129.515,493.278,154.515z M176.465,426.031c-6.25,6.25-6.25,16.375,0,22.625c6.25,6.281,16.375,6.281,22.625,0  l248.938-248.875l-22.656-22.641L176.465,426.031z M63.309,312.906c-6.25,6.25-6.25,16.375,0,22.625s16.375,6.25,22.625,0  L334.871,86.64l-22.625-22.625L63.309,312.906z M357.465,109.25L108.559,358.156c-12.5,12.469-12.469,32.75,0,45.25  c12.5,12.5,32.75,12.563,45.281-0.031l248.906-248.859L357.465,109.25z M153.778,471.219c-7.656-7.656-11.344-17.375-12.719-27.375  c-3.25,0.5-6.531,0.969-9.875,0.969c-17.094,0-33.156-6.688-45.25-18.781c-12.094-12.125-18.75-28.156-18.75-45.25  c0-3.125,0.469-6.156,0.906-9.188c-10.344-1.406-19.906-5.938-27.406-13.438c-0.719-0.719-0.969-1.688-1.625-2.469L-0.004,512  l155.906-39.031C155.215,472.344,154.434,471.875,153.778,471.219z" />
    </svg>
  );
};

export const DeleteIcon = ({ className }: Icon): JSX.Element => {
  return (
    <svg
      fill="none"
      className={classNames(icon, className)}
      width="394px"
      height="457px"
      viewBox="0 0 394 457"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M373 68H277V44C277 33.3913 272.786 23.2172 265.284 15.7157C257.783 8.21427 247.609 4 237 4H157C146.391 4 136.217 8.21427 128.716 15.7157C121.214 23.2172 117 33.3913 117 44V68H21C16.7565 68 12.6869 69.6857 9.68629 72.6863C6.68571 75.6869 5 79.7565 5 84C5 88.2435 6.68571 92.3131 9.68629 95.3137C12.6869 98.3143 16.7565 100 21 100H38L57 404.92C58.42 431.77 79 452 105 452H289C315.13 452 335.3 432.22 337 405L356 100H373C377.243 100 381.313 98.3143 384.314 95.3137C387.314 92.3131 389 88.2435 389 84C389 79.7565 387.314 75.6869 384.314 72.6863C381.313 69.6857 377.243 68 373 68ZM133.57 388H133C128.853 388.003 124.868 386.395 121.883 383.517C118.898 380.639 117.148 376.714 117 372.57L109 148.57C108.849 144.327 110.39 140.197 113.283 137.089C116.177 133.982 120.187 132.151 124.43 132C128.673 131.849 132.803 133.39 135.911 136.283C139.018 139.177 140.849 143.187 141 147.43L149 371.43C149.076 373.531 148.737 375.627 148.003 377.598C147.269 379.568 146.153 381.375 144.72 382.914C143.287 384.452 141.564 385.694 139.651 386.567C137.738 387.439 135.672 387.926 133.57 388ZM213 372C213 376.243 211.314 380.313 208.314 383.314C205.313 386.314 201.243 388 197 388C192.757 388 188.687 386.314 185.686 383.314C182.686 380.313 181 376.243 181 372V148C181 143.757 182.686 139.687 185.686 136.686C188.687 133.686 192.757 132 197 132C201.243 132 205.313 133.686 208.314 136.686C211.314 139.687 213 143.757 213 148V372ZM245 68H149V44C148.988 42.9461 149.187 41.9004 149.584 40.9243C149.982 39.9483 150.571 39.0616 151.316 38.3163C152.062 37.571 152.948 36.9822 153.924 36.5844C154.9 36.1866 155.946 35.9879 157 36H237C238.054 35.9879 239.1 36.1866 240.076 36.5844C241.052 36.9822 241.938 37.571 242.684 38.3163C243.429 39.0616 244.018 39.9483 244.416 40.9243C244.813 41.9004 245.012 42.9461 245 44V68ZM277 372.57C276.852 376.714 275.102 380.639 272.117 383.517C269.132 386.395 265.147 388.003 261 388H260.42C258.319 387.925 256.254 387.437 254.342 386.564C252.43 385.69 250.709 384.449 249.277 382.91C247.845 381.371 246.73 379.565 245.996 377.596C245.262 375.626 244.924 373.531 245 371.43L253 147.43C253.075 145.329 253.563 143.263 254.436 141.35C255.309 139.438 256.551 137.716 258.089 136.283C259.628 134.85 261.434 133.735 263.404 133C265.374 132.265 267.469 131.925 269.57 132C271.671 132.075 273.737 132.563 275.65 133.436C277.562 134.309 279.284 135.551 280.717 137.089C282.15 138.628 283.265 140.434 284 142.404C284.735 144.374 285.075 146.469 285 148.57L277 372.57Z" />
    </svg>
  );
};

export const PlusIcon = ({ className, contentClassName }: Icon): JSX.Element => {
  return (
    <svg
      fill="none"
      className={classNames(icon, className)}
      width="22px"
      height="20px"
      viewBox="0 0 22 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path className={classNames(plus, contentClassName)} d="M11 1V19" />
      <path className={classNames(plus, contentClassName)} d="M2 10H20" />
    </svg>
  );
};

export const SignInIcon = ({ className, contentClassName }: Icon): JSX.Element => {
  return (
    <svg
      fill="none"
      className={classNames(icon, className)}
      width="16px"
      height="20px"
      viewBox="0 0 16 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path className={classNames(signOut, contentClassName)} d="M15 10H8M8 10L11 13M8 10L11 7" />
      <path
        className={classNames(signOut, contentClassName)}
        d="M15 4V3C15 1.89543 14.1046 1 13 1H3C1.89543 1 1 1.89543 1 3V17C1 18.1046 1.89543 19 3 19H13C14.1046 19 15 18.1046 15 17V16"
      />
    </svg>
  );
};

export const SignUpIcon = ({ className, contentClassName }: Icon): JSX.Element => {
  return (
    <svg
      fill="none"
      className={classNames(icon, className)}
      width="24px"
      height="18px"
      viewBox="0 0 24 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={classNames(signOut, signUp, contentClassName)}
        d="M17 7H20M23 7H20M20 7V4M20 7V10"
      />
      <path
        className={classNames(signOut, signUp, contentClassName)}
        d="M1 17V16C1 12.134 4.13401 9 8 9C11.866 9 15 12.134 15 16V17"
      />
      <path
        className={classNames(signOut, signUp, contentClassName)}
        d="M8 9C10.2091 9 12 7.2091 12 5C12 2.79086 10.2091 1 8 1C5.79086 1 4 2.79086 4 5C4 7.2091 5.79086 9 8 9Z"
      />
    </svg>
  );
};

export const ArrowRightIcon = ({ className }: Icon): JSX.Element => {
  return (
    <svg
      fill="none"
      className={classNames(icon, className)}
      width="36px"
      height="27px"
      viewBox="0 0 36 27"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M35.1 12.2C31 8.39999 27 4.59999 22.9 0.799988C21 -1.00001 18.2 1.89999 20.1 3.59999C22.9 6.19999 25.7 8.79999 28.5 11.4C21 11.4 13.5 11.4 5.99999 11.4C4.69999 11.4 3.39999 11.4 2.09999 11.4C-0.500006 11.4 -0.500006 15.4 2.09999 15.4C11 15.4 19.9 15.4 28.8 15.4C25.9 18 23.1 20.6 20.2 23.2C18.3 24.9 21.1 27.8 23 26C27.1 22.3 31.1 18.6 35.2 14.9C35.8 14.3 35.8 12.9 35.1 12.2Z" />
    </svg>
  );
};

export const SearchIcon = ({ className }: Icon): JSX.Element => {
  return (
    <svg
      fill="none"
      className={classNames(icon, className)}
      width="30px"
      height="30px"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.85 11.15L9.16 8.46C9.9 7.56 10.36 6.43 10.36 5.18C10.37 2.33 8.04 0 5.18 0C2.32 0 0 2.33 0 5.18C0 8.03 2.33 10.36 5.18 10.36C6.43 10.36 7.56 9.9 8.46 9.16L11.15 11.85C11.25 11.95 11.38 12 11.5 12C11.62 12 11.76 11.95 11.85 11.85C12.05 11.66 12.05 11.34 11.85 11.15ZM1 5.18C1 2.88 2.88 1 5.18 1C7.48 1 9.36 2.88 9.36 5.18C9.36 7.48 7.48 9.36 5.18 9.36C2.88 9.36 1 7.49 1 5.18Z" />
    </svg>
  );
};
