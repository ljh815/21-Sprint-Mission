import hotImg from "./images/mains-hot-img.png";
import searchImg from "./images/mains-search-img.png";
import registerImg from "./images/mains-register-img.png";

function MainSection() {
  return (
    <section id="mains">
      <div className="container">
          <div className="main">
            <img src={hotImg} alt="핫 아이템" />
            <div className="content">
              <h2 className="label">Hot item</h2>
              <h2>
                인기 상품을 <br />
                확인해 보세요
              </h2>
              <p className="label-context">
                가장 HOT한 중고거래 물품을 <br />
                판다 마켓에서 확인해 보세요
              </p>
            </div>
          </div>

          <div className="main reverse">
            <div className="content">
              <h2 className="label">Search</h2>
              <h2>
                구매를 원하는 <br />
                상품을 검색하세요
              </h2>
              <p className="label-context">
                구매하고 싶은 물품은 검색해서 <br />
                쉽게 찾아보세요
              </p>
            </div>
            <img src={searchImg} alt="검색" />
          </div>

          <div className="main">
            <img src={registerImg} alt="판매" />
            <div className="content">
              <h2 className="label">Register</h2>
              <h2>
                판매를 원하는 <br />
                상품을 등록하세요
              </h2>
              <p className="label-context">
                어떤 물건이든 판매하고 싶은 상품을 <br />
                쉽게 등록하세요
              </p>
            </div>
          </div>
        </div>
        </section>
  )
}

export default MainSection;