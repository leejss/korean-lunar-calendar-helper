import type { FC } from "react";
import React from "react";
import styles from "./Center.module.css";

const Center: FC = ({ children }) => {
  return <div className={styles.Center}>{children}</div>;
};

export default Center;
