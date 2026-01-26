import { useEffect, useState, useRef } from "react";
import { getFunction } from "../../../api/Api";
import Images from "./Images";
import styles from "../Pandar.module.css";

const getBestCount = () => {
  const width = window.innerWidth;
  if (width < 768) return 1;
  if (width < 1280) return 2;
  return 4;
};

function BestItem() {
  const [allItems, setAllItems] = useState([]);
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  const resizeTimer = useRef(null);

  useEffect(() => {
    setVisibleCount(getBestCount());

    const handleResize = () => {
      clearTimeout(resizeTimer.current);

      resizeTimer.current = setTimeout(() => {
        setVisibleCount(getBestCount());
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchBestItems = async () => {
      let all = [];
      let page = 1;
      const limit = 10;

      const first = await getFunction({
        page,
        limit,
        sort: "createdAt",
        order: "desc",
      });

      all = [...first.list];
      const totalPage = Math.ceil(first.totalCount / limit);

      for (let p = 2; p <= totalPage; p++) {
        const data = await getFunction({
          page: p,
          limit,
          sort: "createdAt",
          order: "desc",
        });

        all.push(...data.list);
      }

      if (!isMounted) return;

      const sorted = all.sort(
        (a, b) => b.favoriteCount - a.favoriteCount
      );

      setAllItems(sorted);
      setItems(sorted.slice(0, visibleCount));
    };

    fetchBestItems();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (allItems.length === 0) return;

    setItems(allItems.slice(0, visibleCount));
  }, [visibleCount, allItems]);

  return (
    <div className={styles.bestContainer}>
      <h1 className={styles.bestTitle}>베스트 상품</h1>

      <div className={styles.bestItems}>
        {items.map((item) => (
          <Images item={item} key={`best-item-${item.id}`} />
        ))}
      </div>
    </div>
  );
}

export default BestItem;