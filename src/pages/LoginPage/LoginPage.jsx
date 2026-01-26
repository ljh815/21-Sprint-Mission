import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import Logo from "./images/logo.png";
import GoogleIcon from "./images/google-login.png";
import KakaoIcon from "./images/kakao-login.png";
import CloseEye from "./images/close-eye.png";
import OpenEye from "./images/open-eye.png";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 비밀번호 토글
  const togglePassword = () => setShowPassword(prev => !prev);

  // 유효성 검사
  const validate = () => {
    const newErrors = { email: "", password: "" };

    if (!email.trim()) newErrors.email = "이메일을 입력해주세요.";
    else if (!emailRegex.test(email)) newErrors.email = "잘못된 이메일 형식입니다.";

    if (!password.trim()) newErrors.password = "비밀번호를 입력해주세요.";
    else if (password.length < 8) newErrors.password = "비밀번호를 8자 이상 입력해주세요.";

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  // 버튼 활성화
  const isButtonDisabled = !email || !password || errors.email || errors.password;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) navigate("/");
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.loginContainer}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={Logo} alt="판다마켓 로고" />
          </Link>
        </div>

        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validate}
            autoComplete="new-email" 
          />
          {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}

          <label htmlFor="password">비밀번호</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validate}
              autoComplete="new-password" 
            />
            <img
              src={showPassword ? OpenEye : CloseEye}
              alt="비밀번호 보기"
              className={styles.togglePassword}
              onClick={togglePassword}
            />
          </div>
          {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}

          <button type="submit" className={styles.loginButton} disabled={isButtonDisabled}>
            로그인
          </button>
        </form>

        <div className={styles.socialLogin}>
          <p>간편 로그인하기</p>
          <div className={styles.socialButton}>
            <button className={`${styles.socialBtn} ${styles.googleBtn}`}>
              <img src={GoogleIcon} alt="Google" />
            </button>
            <button className={`${styles.socialBtn} ${styles.kakaoBtn}`}>
              <img src={KakaoIcon} alt="Kakao" />
            </button>
          </div>
        </div>
      </div>

      <p className={styles.signupText}>
        판다마켓이 처음이신가요? <Link to="/signup">회원가입</Link>
      </p>
    </div>
  );
}
