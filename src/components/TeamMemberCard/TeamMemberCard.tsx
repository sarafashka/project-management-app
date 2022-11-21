import React from 'react';
import styles from './TeamMemberCard.module.scss';

interface TeamMemberCardProps {
  cardText: string;
  photoLink: string;
  githubLink: string;
  name: string;
  role: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  cardText,
  photoLink,
  githubLink,
  name,
  role,
}) => {
  return (
    <div className={styles.teamMemberCard} onClick={() => window.open(githubLink, '_blank')}>
      <p className={styles.teamMemberCardText}>{cardText}</p>
      <div className={styles.teamMemberCardLine}></div>
      <div className={styles.teamMemberCardBlock}>
        <img className={styles.teamMemberCardPhoto} src={photoLink} alt={name} />
        <div>
          <h3 className={styles.teamMemberCardName}>{name}</h3>
          <p className={styles.teamMemberCardRole}>{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
