import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from 'hooks/reduxTypedHooks';

import { authService } from '../../api/authService';
import { resetSearch } from 'store/boardsSlice/boardsSlice';

import tryImg from '../../assets/img/welcome-try.png';
import dndimg from '../../assets/img/DnDtemp.jpg';

import TeamMemberCard from '../../components/TeamMemberCard/TeamMemberCard';
import Button from '../../components/Button/Button';

import styles from './Welcome.module.scss';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('translation', { keyPrefix: 'welcome' });

  const teamMembers = [
    {
      cardText: t('ivan'),
      photoLink: 'https://avatars.githubusercontent.com/u/86059997?v=4',
      githubLink: 'https://github.com/Aliseiko',
      name: t('ivan-name'),
      role: 'Frontend Developer',
    },
    {
      cardText: t('nataly'),
      photoLink: 'https://avatars.githubusercontent.com/u/96177099?v=4',
      githubLink: 'https://github.com/sarafashka',
      name: t('nataly-name'),
      role: 'Frontend Developer',
    },
    {
      cardText: t('evgeniia'),
      photoLink: 'https://avatars.githubusercontent.com/u/78043992?v=4',
      githubLink: 'https://github.com/zhadan93',
      name: t('evgeniia-name'),
      role: 'Frontend Developer',
    },
  ];
  const dispatch = useAppDispatch();

  return (
    <div className={styles.welcome}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          {t('hero-title')} <br /> {t('hero-title (2)')} <br /> {t('hero-title (3)')}
        </h1>
        <p className={styles.heroText}>{t('hero-text')}</p>
        <div className={styles.heroImg}></div>
      </section>
      <section className={styles.drag}>
        <div className={styles.dragTextBlock}>
          <h2 className={styles.dragTitle}>{t('drag-title')}</h2>
          <p className={styles.dragText}>{t('drag-text')}</p>
        </div>
        <img className={styles.dragImg} src={dndimg} alt="Drag and Drop image" />
      </section>
      <section className={styles.tryApp}>
        <div className={styles.try}>
          <img className={styles.tryImg} src={tryImg} alt="Try App image" />
          <div className={styles.tryTextBlock}>
            <h2 className={styles.tryTitle}>{t('try-title')}</h2>
            <ul className={styles.tryList}>
              <li className={styles.tryListItem}>{t('try-item1')}</li>
              <li className={styles.tryListItem}>{t('try-item2')}</li>
              <li className={styles.tryListItem}>{t('try-item3')}</li>
              <li className={styles.tryListItem}>{t('try-item4')}</li>
              <li className={styles.tryListItem}>{t('try-item5')}</li>
            </ul>
            <div className={styles.tryButtons}>
              {!authService.isUserLogged() ? (
                <>
                  <Button
                    className={styles.tryButton}
                    onClick={() => {
                      navigate('/auth');
                    }}
                  >
                    {t('button.signIn')}
                  </Button>
                  <Button
                    className={styles.tryButton}
                    onClick={() => {
                      navigate('/auth', { state: 'reg' });
                    }}
                  >
                    {t('button.signUp')}
                  </Button>
                </>
              ) : (
                <Button
                  className={styles.tryButton}
                  onClick={() => {
                    navigate('/boards');
                    dispatch(resetSearch());
                  }}
                >
                  {t('button.main-page')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.team}>
        <h2 className={styles.teamTitle}>{t('team')}</h2>
        <div className={styles.teamMembers}>
          {teamMembers.map((member) => (
            <TeamMemberCard {...member} key={member.name} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Welcome;
