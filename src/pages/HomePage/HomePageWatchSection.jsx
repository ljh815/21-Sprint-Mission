import { Link } from "react-router-dom";
import topBanner from "./images/Img-home-top.png";

function WatchSection() {
  return (
    <section
          id="watch"
          className="banner"
          style={{ backgroundImage: `url(${topBanner})` }}
        >
          <div className="text">
            <h2>
              일상의 모든 물건을 <br />
              거래해 보세요
            </h2>
            <Link to="/items" className="button watch-button">
              구경하러 가기
            </Link>
          </div>
        </section>
  )
}

export default WatchSection;