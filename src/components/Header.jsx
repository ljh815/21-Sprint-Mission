import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/images/logo/logo.svg";
import icon from "../assets/images/icons/profile_icon.png"
import styles from "./Header.module.css"

const linkStyle = ({ isActive }) => ({
  color: isActive ? "var(--blue)" : "inherit",
});

function Header() {
  return (
    <header className={styles.Header}>
      <div className={styles.HeaderMenu}>
        <Link to="/" aria-label="홈">
          <img src={Logo} alt="판다마켓 로고" className={styles.HeaderLogo} />
        </Link>
        <nav>
          <ul>
            <li>
              <NavLink to="/community" style={linkStyle}>
                자유게시판
              </NavLink>
            </li>
            <li>
              <NavLink to="items" style={linkStyle}>
                중고마켓
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <Link to="/login">
          <img src={icon} alt="프로필바" className={styles.Profile} />
        </Link>
      </div>
    </header>
  )
}

export default Header;