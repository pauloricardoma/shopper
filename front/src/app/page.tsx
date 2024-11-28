"use client"

import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/authContext";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Input from "@/components/Input";
import styles from "./page.module.css";

export default function Auth() {
  const { loading, onLogin } = useContext(AuthContext);

  const [name, setName] = useState("")

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <Input
          value={name}
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
        />
        <span className={styles.btnContainer}>
          <Button disabled={loading || !name} onClick={() => onLogin(name)}>
            Logar
          </Button>
        </span>
      </main>
    </div>
  );
}
