import { Option } from "@/interfaces/ride";
import styles from "./card.module.css";
import Button from "@/components/Button";

type CardProps = {
  driver: Option
  loading: boolean
  onConfirm: (driver: Option) => void
}

const Card = ({ driver, loading, onConfirm }: CardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <span className={styles.header}>
          <span className={styles.headerTitle}>
            <span className={styles.headerTitleText}>{driver.name}</span>
            <span className={styles.text}>{driver.review.rating} / 5</span>
          </span>
          <span className={styles.headerDescription}>{driver.description}</span>
          <span className={styles.headerVehicle}>{driver.vehicle}</span>

        </span>
        <div className={styles.footer}>
          <span className={styles.value}>R$ {driver.value.toFixed(2)}</span>
          <span className={styles.textComment}>{driver.review.comment}</span>
        </div>
      </div>
      <Button disabled={loading} onClick={() => onConfirm(driver)}>
        Escolher
      </Button>
    </div>
  );
}

export default Card;
