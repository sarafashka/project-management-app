import React from 'react';

import styles from './Welcome.module.scss';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import tryImg from '../../assets/img/welcome-try.png';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.welcome}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          The first <br /> truly intelligent <br /> Project Management
        </h1>
        <p className={styles.heroText}>
          Monitoring your personal and all team task more easily with us. Collaborate, manage
          projects, and reach new productivity peaks.
        </p>
        <div className={styles.heroImg}></div>
      </section>
      <section className={styles.drag}>
        <div className={styles.dragTextBlock}>
          <h2 className={styles.dragTitle}>Drag and Drop catalog management</h2>
          <p className={styles.dragText}>
            Use the Drag and Drop function to sort your projects and tasks in the most intuitive,
            quickest way.
          </p>
        </div>
        <img className={styles.dragImg} src="/" alt="Drag and Drop image" />
      </section>
      <section className={styles.try}>
        <img className={styles.tryImg} src={tryImg} alt="Try App image" />
        <div className={styles.tryTextBlock}>
          <h2 className={styles.tryTitle}>Try Project Management App Now!</h2>
          <ul className={styles.tryList}>
            <li className={styles.tryListItem}>
              Collaborate, manage projects, and reach new productivity peaks
            </li>
            <li className={styles.tryListItem}>Manage your boards using Drag-n-Drop</li>
            <li className={styles.tryListItem}>
              You can specify additional info in task description
            </li>
            <li className={styles.tryListItem}>
              Convenient search among the list of all your projects
            </li>
            <li className={styles.tryListItem}>
              Unlimited boards, columns and tasks for all registered users
            </li>
          </ul>
          <div className={styles.tryButtons}>
            <Button
              className={styles.tryButton}
              onClick={() => {
                navigate('/auth');
              }}
            >
              Sign In / Register
            </Button>
            <Button
              className={styles.tryButton}
              onClick={() => {
                navigate('/profile');
              }}
            >
              Profile
            </Button>
            <Button
              className={styles.tryButton}
              onClick={() => {
                navigate('/boards');
              }}
            >
              Boards
            </Button>
          </div>
        </div>
      </section>
      <section className={styles.team}>
        <h2 className={styles.teamTitle}>Our team</h2>
        <div className="team__members"></div>
      </section>
    </div>
  );
};

export default Welcome;
