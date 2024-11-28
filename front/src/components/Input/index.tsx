import { InputHTMLAttributes } from "react";
import styles from "./input.module.css";

export default function Input({
  ...rest
}: Readonly<InputHTMLAttributes<HTMLInputElement>>) {
  return (
    <input {...rest} className={styles.input} />
  );
}
