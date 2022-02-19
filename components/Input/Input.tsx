import React, { useState } from "react";
import styles from "./Input.module.css";

interface InputProps {
  label: string;
  id: string;
}

const Input = ({ id, label }: InputProps) => {
  const [text, setText] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return (
    <div className={styles.InputContainer}>
      <label htmlFor={id}>
        <input id={id} type="text" onChange={handleChange} />
        {label}
      </label>
    </div>
  );
};

export default Input;
