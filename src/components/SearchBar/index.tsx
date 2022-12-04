import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import { SearchData } from 'types/types';

import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import { SearchIcon } from 'components/Icons/Icons';

import styles from './SearchBar.module.scss';

const { form, btn, iconContainer, icon, inputWrapper, clear, input } = styles;

type SearchBarProps = {
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  onSubmit: (data: string) => void;
  value: string;
  saveSearchValue: (value: string) => void;
  resetSearch: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  className,
  placeholder = 'Search...',
  onSubmit,
  value,
  saveSearchValue,
  resetSearch,
  inputClassName,
}) => {
  const { register, handleSubmit, watch, setValue, setFocus, getValues } = useForm<SearchData>({
    defaultValues: { search: value },
  });
  const watchSearch = watch('search');

  const searchInputParams = {
    ...register('search'),
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClear = () => {
    setFocus('search', { shouldSelect: true });
    isSubmitted ? resetSearch() : setValue('search', '');
    setIsSubmitted(false);
  };

  const submit = ({ search }: SearchData) => {
    setIsSubmitted(true);
    onSubmit(search);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      onSubmit(getValues('search'));
      setIsSubmitted(true);
    }
  };

  useEffect(() => {
    !value && setValue('search', value);
  }, [setValue, value]);

  useEffect(() => {
    return () => {
      saveSearchValue(getValues('search'));
    };
  }, [getValues, saveSearchValue]);

  return (
    <form className={classNames(form, className)} onSubmit={handleSubmit(submit)}>
      <Input
        className={inputWrapper}
        inputClassName={classNames(input, inputClassName)}
        placeholder={placeholder}
        reactHookFormProps={searchInputParams}
        onKeyDown={handleKeyDown}
      />
      {watchSearch && <Button className={clear} type="button" kind="close" onClick={handleClear} />}
      <Button
        className={classNames(btn)}
        iconClassName={iconContainer}
        type="submit"
        icon={<SearchIcon className={icon} />}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
      />
    </form>
  );
};

export default SearchBar;
