import React from 'react';

import styles from './Welcome.module.scss';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.welcome}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>
          The first <br /> truly intelligent <br /> Project Management
        </h1>
        <p className={styles.heroText}>
          Monitoring your personal and all team task more easily with us. Collaborate, manage
          projects, and reach new productivity peaks.
        </p>
        <div className={styles.heroImg}>
          For the convenience of verification, it is necessary to record and post on YouTube a short
          (5-7 min) video for reviewers with an explanation of how each of the items listed in the
          evaluation criteria is implemented.{' '}
        </div>
      </div>
      <div className="drag">
        <div className="drag__text-block">
          <h2 className="drag__title">Drag and Drop catalog management</h2>
          <p className="drag__text">
            Use the Drag and Drop function to sort your products in the most intuitive, quickest
            way.
          </p>
        </div>
        <img className="drag__img" src="/" alt="Drag and Drop image" />
      </div>
      <div className="team">
        <h2 className="team__title">Our team</h2>
        <div className="team__members"></div>
      </div>
      <div className="try">
        <div className="try__text-block">
          <h2 className="try_title">Try Project Management App Now!</h2>
          <Button
            onClick={() => {
              navigate('/auth');
            }}
          >
            Sign In / Register
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
        <img className="try__img" src="/" alt="Try App image" />
      </div>
    </div>
  );
};

export default Welcome;
