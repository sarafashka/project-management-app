import React from 'react';
import styles from './Profile.module.scss';
import ProfileForm from '../../components/Forms/ProfileForm';
import { useAppSelector } from '../../hooks/reduxTypedHooks';
import { selectUser } from '../../store/selectors/selectors';
import { useTranslation } from 'react-i18next';

const Profile: React.FC = () => {
  const user = useAppSelector(selectUser);
  const { t } = useTranslation('translation', { keyPrefix: 'profile' });

  return (
    <div className={styles.page}>
      <h1 className={styles.profileTitle}>
        {t('hello')}, {user.name}!
      </h1>
      <div className={styles.frame}>
        <h2 className={styles.formTitle}>{t('edit-profile')}</h2>
        <div className={styles.form}>
          <ProfileForm />
        </div>
      </div>
    </div>
  );
};

export default Profile;
