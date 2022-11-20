import React from 'react';
import styles from './TeamMemberCard.module.scss';

const TeamMemberCard = () => {
  return (
    <div className={styles.teamMemberCard}>
      <p className={styles.teamMemberCardText}>
        “Chainlist is amazing stuff. I use it everyday and it helps me to maintain my sanity.”
      </p>
      <div className={styles.teamMemberCardLine}></div>
      <div className={styles.teamMemberCardBlock}>
        <img
          className={styles.teamMemberCardPhoto}
          src="https://avatars.githubusercontent.com/u/86059997?v=4"
          alt="Name"
        />
        <div>
          <h3 className={styles.teamMemberCardName}>Ivan Aliseiko</h3>
          <p className={styles.teamMemberCardRole}>Developer</p>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
