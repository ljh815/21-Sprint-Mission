import "./HomePage.css";
import Header from "../../components/Header";
import WatchSection from "./HomePageWatchSection";
import MainSection from "./HomePageMainSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faYoutube, faInstagram } from "@fortawesome/free-brands-svg-icons";
import TrustSection from "./HomePageTrustSection";

function HomePage() {
  return (
    <>
      <Header />

      <main>
        <WatchSection />
        <MainSection />
        <TrustSection />
      </main>
      <footer>
        <div className="footer-copyright">
          <p>@codeit - 2024</p>
        <div className="privacy">
          <a href="policy.html">Privacy Policy</a>
          <a href="FAQ.html">FAQ</a>
        </div>
        <div className="footer-snslink">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div> 
      </footer>
    </>
  );
}

export default HomePage;
