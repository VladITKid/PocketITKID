/*
— — — — — — — — — — — — — 
*                       Header
— — — — — — — — — — — — — 
*/
// Логотип
const headerLogo = document.querySelector('.header__logo');

// Вызываю кнопки из меню шапки и преобразую в массив
const headerMenuBtnsArray = Array.from(document.querySelectorAll('.header__menu-btn'));

// Вызываю кнопки из нижней навигации и преобразую в массив
const bottomNavBtnsArray = Array.from(document.querySelectorAll('.bottom-nav__btn'));