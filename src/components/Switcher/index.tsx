import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import classNames from 'classnames';

import styles from './Switcher.module.scss';
import { useTranslation } from 'react-i18next';

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
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language.slice(0, 2));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange && onValueChange(e);
    i18n.changeLanguage(getNextLang()).then(() => {
      setLang(getNextLang());
    });
  };

  const [firstOptionLabel, secondOptionLabel] = optionLabels;

  const getNextLang = () => {
    return lang === firstOptionLabel ? secondOptionLabel : firstOptionLabel;
  };

  return (
    <label className={classNames(switcher, className)}>
      <input
        className={classNames(checkbox)}
        onChange={handleChange}
        type="checkbox"
        checked={lang === firstOptionLabel}
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
