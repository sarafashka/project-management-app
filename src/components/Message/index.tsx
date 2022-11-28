import React from 'react';
import classNames from 'classnames';

import styles from './Message.module.scss';

const { message, header, content } = styles;

type MessageProps = {
  children: React.ReactNode;
  className?: string;
  title: string;
};

const Message: React.FC<MessageProps> = ({ children, className, title }) => {
  return (
    <div className={classNames(message, className)}>
      {title && <h3 className={header}>{title}</h3>}
      <p className={content}>{children}</p>
    </div>
  );
};

export default Message;
