import React from 'react';

import styles from './style.css';

 const DangerText = ({ text }) => (
  <p className={styles.title}>{text}</p>
);

export default DangerText;