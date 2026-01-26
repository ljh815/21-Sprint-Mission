import { useEffect, useMemo, useState } from "react";
import { getFunction } from "../../../api/Api";
import Images from "./Images";
import searchIcon from "../../../assets/images/icons/search.svg";
import styles from "../Pandar.module.css";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import Pagination from "./Pagination";

const getItemsPerPage = () => {
  const width = window.innerWidth;
  if (width < 768) return 4;
  if (width < 1280) return 6;
  return 10;
};

function AllItem() {
  const [itemList, setItemList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortType, setSortType] = useState("latest");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
      setPage(1);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchAllItems = async () => {
      const first = await getFunction({
        page: 1,
        limit: itemsPerPage,
        sort: "createdAt",
        order: "desc",
        keyword: searchKeyword,
      });

      if (!isMounted) return;
      setItemList(first.list);
      setPage(1);

      const totalPage = Math.ceil(first.totalCount / itemsPerPage);

      for (let p = 2; p <= totalPage; p++) {
        const data = await getFunction({
          page: p,
          limit: itemsPerPage,
          sort: "createdAt",
          order: "desc",
          keyword: searchKeyword,
        });

        if (!isMounted) return;
        setItemList((prev) => [...prev, ...data.list]);
      }
    };

    fetchAllItems();

    return () => { isMounted = false; };
  }, [searchKeyword, itemsPerPage]);

  const sortedItems = useMemo(() => {
    const items = [...itemList];
    if (sortType === "favorite") {
      return items.sort((a, b) => b.favoriteCount - a.favoriteCount);
    }
    return items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [itemList, sortType]);

  const totalPage = Math.ceil(sortedItems.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = sortedItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={styles.allContainer}>
      <section className={styles.sectionWrapper}>
        <div className={styles.headerRow}>
          <h2 className={styles.sectionTitle}>전체 상품</h2>

          <div className={styles.rightTools}>
            <div className={styles.searchBox}>
              <img src={searchIcon} alt="검색" className={styles.searchIcon} />
              <input
                type="text"
                placeholder="검색할 상품을 입력해주세요"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setSearchKeyword(searchInput);
                }}
              />
            </div>

            <Link to="/additem" className={styles.button}>
              상품 등록하기
            </Link>

            <div className={styles.sortBox}>
              <Dropdown
                sortType={sortType}
                setSortType={(type) => {
                  setSortType(type);
                  setPage(1);
                }}
              />
            </div>
          </div>
        </div>

        <div
          className={styles.gridWrapper}>
          {currentItems.map((item) => (
            <Images key={`all-item-${item.id}`} item={item} />
          ))}
        </div>
      </section>

      {totalPage > 1 && (
        <Pagination
          totalPageNum={totalPage}
          activePageNum={page}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

export default AllItem;
