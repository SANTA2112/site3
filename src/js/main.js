const but = document.querySelector(".header__menu-but");
const menu = document.querySelector(".header__menu");

but.addEventListener("click", e => {
  e.preventDefault();
  menu.classList.toggle('active')
});


