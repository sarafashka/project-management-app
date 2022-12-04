import React from 'react';
import classNames from 'classnames';

import styles from './Avatar.module.scss';

const { avatar, img } = styles;

type AvatarProps = {
  className?: string;
  name: string;
};

const Avatar: React.FC<AvatarProps> = ({ className, name }) => {
  return (
    <div className={classNames(avatar, className)}>
      <img className={img} src={require(`../../../assets/img/1.jpg`)} alt={`${name} avatar`} />
    </div>
  );
};

export default Avatar;
