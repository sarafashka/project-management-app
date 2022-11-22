import React from 'react';
import classNames from 'classnames';

import { Icon } from 'types/types';

import styles from './Icon.module.scss';

const { icon, signOut, editIcon } = styles;

export const DropDownIcon = ({ className }: Icon): JSX.Element => {
  return (
    <svg
      fill="none"
      className={classNames(icon, className)}
      width="12px"
      height="12px"
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
      height="20px"
      viewBox="0 0 16 20"
      width="20px"
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
      className={classNames(icon, editIcon, className)}
      height="20px"
      viewBox="0 0 512 512"
      width="20px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M493.278,154.515l-22.625,22.641L334.871,41.39l22.625-22.641c25-25,65.531-25,90.531,0l45.25,45.266  C518.246,89,518.246,129.515,493.278,154.515z M176.465,426.031c-6.25,6.25-6.25,16.375,0,22.625c6.25,6.281,16.375,6.281,22.625,0  l248.938-248.875l-22.656-22.641L176.465,426.031z M63.309,312.906c-6.25,6.25-6.25,16.375,0,22.625s16.375,6.25,22.625,0  L334.871,86.64l-22.625-22.625L63.309,312.906z M357.465,109.25L108.559,358.156c-12.5,12.469-12.469,32.75,0,45.25  c12.5,12.5,32.75,12.563,45.281-0.031l248.906-248.859L357.465,109.25z M153.778,471.219c-7.656-7.656-11.344-17.375-12.719-27.375  c-3.25,0.5-6.531,0.969-9.875,0.969c-17.094,0-33.156-6.688-45.25-18.781c-12.094-12.125-18.75-28.156-18.75-45.25  c0-3.125,0.469-6.156,0.906-9.188c-10.344-1.406-19.906-5.938-27.406-13.438c-0.719-0.719-0.969-1.688-1.625-2.469L-0.004,512  l155.906-39.031C155.215,472.344,154.434,471.875,153.778,471.219z" />
    </svg>
  );
};
