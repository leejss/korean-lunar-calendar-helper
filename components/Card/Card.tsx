import type { FC } from "react";
import React from "react";
import styles from "./Card.module.css";

const Card: FC = ({ children }) => {
  return <div className={styles.Card}>{children}</div>;
};

export default Card;
