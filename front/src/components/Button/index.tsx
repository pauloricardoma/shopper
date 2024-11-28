import { ButtonHTMLAttributes } from "react";
import styles from "./button.module.css";

export default function Button({
  children,
  ...rest
}: Readonly<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button {...rest} className={styles.button}>
      {children}
    </button>
  );
}
