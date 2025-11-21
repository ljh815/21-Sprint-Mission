// 비밀번호 확인 토글
const passWordSecond = document.getElementById('password-check');
const toggleSecond = document.querySelector('.toggle-password-second');

toggleSecond.addEventListener('click', () => {
  const hiddenSecond = passWordSecond.type === 'password';

  passWordSecond.type = hiddenSecond ? 'text' : 'password';

  toggleSecond.src =hiddenSecond ? './images/open-eye.png' : './images/close-eye.png';
});

function TogglePositionSecond() {
  const secondInput = document.getElementById('password-check');
  const secondToggle = document.querySelector('.toggle-password-second');

  const secondTop = secondInput.offsetTop + (secondInput.offsetHeight / 2) - (secondToggle.offsetHeight / 2);
  secondToggle.style.top = `${secondTop}px`;
}
window.addEventListener('load', TogglePositionSecond);
window.addEventListener('resize', TogglePositionSecond);
