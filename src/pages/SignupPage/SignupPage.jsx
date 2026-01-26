import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignupPage.module.css";
import Logo from "./images/logo.png";
import GoogleIcon from "./images/google-login.png";
import KakaoIcon from "./images/kakao-login.png";
import CloseEye from "./images/close-eye.png";
import OpenEye from "./images/open-eye.png";

export default function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [errors, setErrors] = useState({ email: "", nickname: "", password: "", passwordCheck: "" });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const togglePassword = () => setShowPassword(prev => !prev);
  const togglePasswordCheck = () => setShowPasswordCheck(prev => !prev);

  const validate = () => {
    const newErrors = { email: "", nickname: "", password: "", passwordCheck: "" };

    if (!email.trim()) newErrors.email = "이메일을 입력해주세요.";
    else if (!emailRegex.test(email)) newErrors.email = "잘못된 이메일 형식입니다.";

    if (!nickname.trim()) newErrors.nickname = "닉네임을 입력해주세요.";

    if (!password.trim()) newErrors.password = "비밀번호를 입력해주세요.";
    else if (password.length < 8) newErrors.password = "비밀번호는 8자 이상이어야 합니다.";

    if (!passwordCheck.trim()) newErrors.passwordCheck = "비밀번호 확인을 입력해주세요.";
    else if (passwordCheck !== password) newErrors.passwordCheck = "비밀번호가 일치하지 않습니다.";

    setErrors(newErrors);
    return !newErrors.email && !newErrors.nickname && !newErrors.password && !newErrors.passwordCheck;
  };

  const isButtonDisabled = !email || !nickname || !password || !passwordCheck || Object.values(errors).some(Boolean);

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
          />
          {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}

          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onBlur={validate}
            autoComplete="new-nickname" 
          />
          {errors.nickname && <span className={styles.errorMessage}>{errors.nickname}</span>}

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

          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <div className={styles.passwordWrapper}>
            <input
              type={showPasswordCheck ? "text" : "password"}
              id="passwordCheck"
              placeholder="비밀번호를 다시 입력해주세요"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              onBlur={validate}
              autoComplete="new-password" 
            />
            <img
              src={showPasswordCheck ? OpenEye : CloseEye}
              alt="비밀번호 확인 보기"
              className={styles.togglePassword}
              onClick={togglePasswordCheck}
            />
          </div>
          {errors.passwordCheck && <span className={styles.errorMessage}>{errors.passwordCheck}</span>}

          <button type="submit" className={styles.signupButton} disabled={isButtonDisabled}>
            회원가입
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

        <p className={styles.signupText}>
          이미 회원이신가요? <Link to="/login">로그인</Link>
        </p>
      </div>
    </div>
  );
}
