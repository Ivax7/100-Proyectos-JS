const lightMode = document.getElementById('light-mode');
const body = document.querySelector('body');
const main = document.querySelector('main'); 

lightMode.addEventListener('click', () => {
  body.classList.add('light-mode');
  main.classList.add('light-mode');
});
