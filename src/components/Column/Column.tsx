import React from 'react';
import cn from 'classnames';
import styles from './Column.module.scss';

type Props = {
  id: string;
  title: string;
  order: number;
  tasks: {
    id: string;
    title: string;
    order: number;
    description: string;
    userId: string;
    files: {
      filename: string;
      fileSize: number;
    }[];
  };
};

const Column: React.FC<Props> = (column) => {
  const { id, title, order, tasks } = column;
  console.log('column', column);
  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <button className={cn(styles.button, 'btn')}>x</button>
      </div>

      <div className={styles.task}>
        <h4>1 task</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className={styles.task}>
        <h4>2 task</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
      </div>

      <button className={styles.newTask}>+ Add a task</button>
    </div>
  );
};

export default Column;
