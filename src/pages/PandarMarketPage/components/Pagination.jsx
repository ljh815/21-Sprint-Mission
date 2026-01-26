import leftArrow from "../../../assets/images/icons/arrow_left.svg";
import rightArrow from "../../../assets/images/icons/arrow_right.svg";
import styles from "./Pagination.module.css"

const Pagination = ({ totalPageNum, activePageNum, onPageChange }) => {
  const maxVisiblePages = 5;
  let startPage;

  if (totalPageNum <= maxVisiblePages) {
    startPage = 1;
  } else {
    startPage = Math.max(activePageNum - Math.floor(maxVisiblePages / 2), 1);
    startPage = Math.min(startPage, totalPageNum - maxVisiblePages + 1);
  }

  const pages = Array.from(
    { length: Math.min(maxVisiblePages, totalPageNum - startPage + 1) },
    (_, i) => startPage + i
  );
  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.pageBtn} ${styles.arrowBtn}`}
        onClick={() => onPageChange(activePageNum - 1)}
        disabled={activePageNum === 1}
      >
        <img src={leftArrow} alt="이전 페이지" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.pageBtn} ${activePageNum === page ? styles.activePage : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={`${styles.pageBtn} ${styles.arrowBtn}`}
        onClick={() => onPageChange(activePageNum + 1)}
        disabled={activePageNum === totalPageNum}
      >
        <img src={rightArrow} alt="다음 페이지" />
      </button>
    </div>
  );
}

export default Pagination;