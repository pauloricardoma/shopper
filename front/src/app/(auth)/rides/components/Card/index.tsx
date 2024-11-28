import { Ride } from "@/interfaces/ride";
import styles from "./card.module.css";

type CardProps = {
  ride: Ride
}

const Card = ({ ride }: CardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <span className={styles.header}>
          <span className={styles.headerTitle}>
            <span className={styles.headerTitleText}>{ride.origin}</span>
            <span className={styles.headerTitleText}>{ride.destination}</span>
          </span>
          <span className={styles.headerDescription}>{ride.distance/1000}km</span>
          <span className={styles.headerVehicle}>{ride.duration}</span>

        </span>
        <div className={styles.footer}>
          <span className={styles.value}>{new Date(ride.date).toLocaleString()}</span>
          <span className={styles.value}>R$ {ride.value.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
