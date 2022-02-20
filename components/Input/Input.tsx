import type { SetStateAction, Dispatch } from "react";
import React, { useState } from "react";
import { IMyDate } from "../../utils/lunarCalendarHelper";
import styles from "./Input.module.css";

interface InputProps {
  label: string;
  id: string;
  setInputDate: Dispatch<SetStateAction<IMyDate>>;
}

const Input = ({ id, label, setInputDate }: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDate((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className={styles.InputContainer}>
      <label htmlFor={id}>
        <input id={id} type="text" onChange={handleChange} name={id} />
        {label}
      </label>
    </div>
  );
};

export default Input;
