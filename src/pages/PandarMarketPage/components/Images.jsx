import Heart from '../../../assets/images/icons/heart.svg';
import styles from "../Pandar.module.css"

function Images({ item }) {
  return (
    <div className={styles.imageItem}>
      <img src={item.images[0]} alt={item.name} className={styles.imagesCard} />
      <div className={styles.itemElement}>
        <h2 className={styles.itemName}>{item.name}</h2>
        <p className={styles.itemPrice}>{item.price.toLocaleString()}원</p>
        <div className={styles.favoriteItem}>
          <img src={Heart} alt="heart" />
          {item.favoriteCount}
        </div>
      </div>
    </div>
  );
}

export default Images;