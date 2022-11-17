import React from 'react';

import styles from './Welcome.module.scss';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.welcome}>
      <div>RSS final task: Project management app</div>
      <Button
        onClick={() => {
          navigate('/auth');
        }}
      >
        Auth
      </Button>
      <Button
        onClick={() => {
          navigate('/profile');
        }}
      >
        Profile
      </Button>
      <Button
        onClick={() => {
          navigate('/boards');
        }}
      >
        Boards
      </Button>
    </div>
  );
};

export default Welcome;
