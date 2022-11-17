import React from 'react';
import styles from './Profile.module.scss';
import ProfileForm from '../../components/Forms/ProfileForm';
import { useAppSelector } from '../../hooks/reduxTypedHooks';
import { selectUser } from '../../store/selectors/selectors';

const Profile: React.FC = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className={styles.page}>
      <h1>Hello, {user.name}!</h1>
      <div className={styles.frame}>
        <h2 className={styles.formTitle}>Edit your profile</h2>
        <div className={styles.form}>
          <ProfileForm />
        </div>
      </div>
    </div>
  );
};

export default Profile;
