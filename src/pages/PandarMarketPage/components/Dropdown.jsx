import { useState } from "react";
import sortIcon from "../../../assets/images/icons/sort.svg";
import arrowDown from "../../../assets/images/icons/arrow_down.png";
import styles from "./Dropdown.module.css"

function SortDropdown({ sortType, setSortType }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (type) => {
    setSortType(type);
    setOpen(false);
  };

  return (
    <div className={styles.sortDropdown}>
      <button
        className={styles.sortTrigger}
        onClick={() => setOpen(!open)}
      >
      <span className={styles.sortText}>
        {sortType === "latest" ? "최신순" : "좋아요순"}
      </span>
        <img
          src={open ? arrowDown : sortIcon}
          alt="화살표 아이콘"
          className={styles.sortIcon}
        />
      </button>

      {open && (
        <div className={styles.dropdownMenu}>
          <div
            className={styles.dropdownItem}
            onClick={() => handleSelect("latest")}
          >
            최신순
          </div>
          <div
            className={styles.dropdownItem}
            onClick={() => handleSelect("favorite")}
          >
            좋아요순
          </div>
        </div>
      )}
    </div>
  );
}

export default SortDropdown;
