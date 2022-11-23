import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './Switcher.module.scss';

const { switcher, checkbox, wrapper, content, tumbler } = styles;

export interface SwitcherProps extends InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  optionLabels?: string[];
  error?: JSX.Element;
}

const Switcher: React.FC<SwitcherProps> = ({
  className,
  optionLabels = [],
  children,
  onValueChange,
  error,
  ...otherAttrs
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange && onValueChange(e);
  };

  const [firstOptionLabel, secondOptionLabel] = optionLabels;

  return (
    <label className={classNames(switcher, className)}>
      <input
        className={classNames(checkbox)}
        onChange={handleChange}
        type="checkbox"
        {...otherAttrs}
      />
      <div className={wrapper}>
        <span
          className={classNames(content, {
            selected: !firstOptionLabel,
          })}
          data-firstoptionlabel={firstOptionLabel}
          data-secondoptionlabel={secondOptionLabel}
        />
        <span className={tumbler} />
      </div>
      {children}
      {error}
    </label>
  );
};

export default Switcher;
