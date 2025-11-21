const formInputs = document.querySelectorAll('.login-form input');
const loginButton = document.querySelector('.login-button');
const signupButton = document.querySelector('.singup-button');

//이메일 정규식
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 비밀번호 토글
const passWord = document.getElementById("password");
const toggle = document.querySelector('.toggle-password');

toggle.addEventListener('click', () => {
  const hidden = passWord.type === 'password';

  passWord.type = hidden ? 'text' : 'password';

  toggle.src = hidden ? './images/open-eye.png' : './images/close-eye.png';
});

// toggle 위치 맞추기
function TogglePosition() {
  const input = document.getElementById('password');
  const toggle = document.querySelector('.toggle-password');

  const top = input.offsetTop + (input.offsetHeight / 2) - (toggle.offsetHeight / 2);
  toggle.style.top = `${top}px`;
}
window.addEventListener('load', TogglePosition);
window.addEventListener('resize', TogglePosition);

// 에러메세지
formInputs.forEach(input => {
  if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
    const span = document.createElement('span');
    span.className = 'error-message';
    span.style.color = 'red';
    span.style.fontSize = '0.8rem';
    span.style.display = 'flex';
    span.style.justifyContent = 'flex-start';
    span.style.marginTop = '-0.5rem';
    span.style.marginBottom = '1rem';
    span.style.marginInline = '1rem';
    input.insertAdjacentElement('afterend', span);
  }
});

// 에러메세지 함수
function ErrorInput(input) {
  const value = input.value.trim();
  const errorSpan = input.nextElementSibling;

 switch(input.id) {
    case 'email':
      if (value === '') return setError(errorSpan, input, '이메일을 입력해주세요.');
      if (!emailRegex.test(value)) return setError(errorSpan, input, '잘못된 이메일 형식입니다.');
      break;
    case 'password':
      if (value === '') return setError(errorSpan, input, '비밀번호를 입력해주세요.');
      if (value.length < 8) return setError(errorSpan, input, '비밀번호를 8자 이상 입력해주세요.');
      break;
    case 'name':
      if (value === '') return setError(errorSpan, input, '닉네임을 입력해주세요.');
      break;
    case 'password-check':
      const passwordInput = document.querySelector('#password');
      if (value !== passwordInput.value.trim()) return setError(errorSpan, input, '비밀번호가 일치하지 않습니다.');
      break;
    default:
      return clearError(errorSpan, input);
  }

  clearError(errorSpan, input);
}

// 메시지 표시 함수
function setError(span, input, message) {
  input.style.border = '1px solid red';
  span.textContent = message;
  span.classList.add('active');
}

// 메시지 제거 함수
function clearError(span, input) {
  input.style.border = '';
  span.textContent = '';
  span.classList.remove('active');
}

// 로그인 버튼
function  disableButton() {
  if(loginButton) {
    const inputs = [document.querySelector('#email'), document.querySelector('#password')];
    const errorMessage = inputs.some(i => i.value.trim() === '' || i.nextElementSibling.classList.contains('active'));
    loginButton.disabled = errorMessage;
    loginButton.style.backgroundColor = errorMessage ? '#9CA3AF' : '#3692FF'
    loginButton.style.cursor = errorMessage ? 'not-allowed' : 'pointer';
  }

// 회원가입 버튼
  if (signupButton) {
    const inputs = [
      document.querySelector('#email'),
      document.querySelector('#name'),
      document.querySelector('#password'),
      document.querySelector('#password-check')
    ];
    const errorMessage = inputs.some(i => i.value.trim() === '' || i.nextElementSibling.classList.contains('active'));
    signupButton.disabled =errorMessage;
    signupButton.style.backgroundColor = errorMessage ? '#9CA3AF' : '#3692FF'
    signupButton.style.cursor = errorMessage ? 'not-allowed' : 'pointer';
  }
}


// 이벤트 활성화
formInputs.forEach(input => {
  input.addEventListener('focusout', () => {
    ErrorInput(input);
    disableButton();
  });
});

// 페이지 이동
if (loginButton) {
  loginButton.addEventListener('click', e => {
    e.preventDefault();
    if (!loginButton.disabled) window.location.href = 'index.html';
  })
}

if (signupButton) {
  signupButton.addEventListener('click', e => {
    e.preventDefault();
    if (!signupButton.disabled) window.location.href = 'login.html';
  });
}

disableButton();