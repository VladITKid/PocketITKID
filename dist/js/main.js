/*
— — — — — — — — — — — — — 
*                   Cosmetics
— — — — — — — — — — — — — 
*/
// todo: Задавать и удалять класс сияющим кнопкам каждые 1200ms
(() => {
    // Нахожу все кнопки с айдишником #btnShining и прохожусь по ним циклом
    document.querySelectorAll('#btnShining').forEach(btnShining => {
        setInterval(() => {
            btnShining.classList.toggle('btn--shining'); // Добавляю анимацию
        }, 500*4); // Пауза в 4 раза длиннее времени анимации
    });
})();
/*
— — — — — — — — — — — — — 
*                       Header
— — — — — — — — — — — — — 
*/
// todo: Смена страниц по клику
// Логотип
const headerLogo = document.querySelector('.header__logo');
// Вызываю кнопки из меню шапки и преобразую в массив
const headerMenuBtnsArray = Array.from(document.querySelectorAll('.header__menu-btn'));
// Вызываю кнопки из нижней навигации и преобразую в массив
const bottomNavBtnsArray = Array.from(document.querySelectorAll('.bottom-nav__btn'));
(() => {
    // * Функция смены страниц по клику

    function changeActivePage(btn) {
        btn.addEventListener('click', () => {
            if (
                // Главная
                btn === bottomNavBtnsArray[0] ||
                btn === headerLogo ||
                btn === headerMenuBtnsArray[0]
            ) {
                window.location.href = '/index.html';
            } else if (
                // Портфолио
                btn === bottomNavBtnsArray[1] ||
                btn === headerMenuBtnsArray[1]
            ) {
                window.location.href = '/dist/html/portfolio.html';
            } else if (
                // Обо мне
                btn === bottomNavBtnsArray[2] ||
                btn === headerMenuBtnsArray[2]
            ) {
                window.location.href = '/dist/html/about.html';
            }
        });
    };

    // * Применяю функцию к кнопкам
    // Главная
    changeActivePage(bottomNavBtnsArray[0]);
    changeActivePage(headerLogo);
    changeActivePage(headerMenuBtnsArray[0]);

    // Портфолио
    changeActivePage(bottomNavBtnsArray[1]);
    changeActivePage(headerMenuBtnsArray[1]);

    // Обо мне
    changeActivePage(bottomNavBtnsArray[2]);
    changeActivePage(headerMenuBtnsArray[2]);

    // * Функция подсветки кнопок

    (() => {
        // Проверяем, какая страница активна
        const currentPage = window.location.pathname;

        // пути к страницам и индексы их кнопок
        const pages = {
            '/index.html': 0,
            '/dist/html/portfolio.html': 1,
            '/dist/html/about.html': 2,
        };

        // Получаем индекс текущей страницы из объекта
        const currentPageIndex = pages[currentPage];

        // Устанавливаем активный класс на соответствующей кнопке
        if (currentPageIndex !== undefined) {
            bottomNavBtnsArray[currentPageIndex].classList.add('bottom-nav__btn--active');
            headerMenuBtnsArray[currentPageIndex].classList.add('header__menu-btn--active');
        }
    })();

    // * Функция перенаправления на index.html
    window.onload = () => {
        const currentPage = window.location.pathname;
        if (
            // Если пользователь не на этих страницах...
            currentPage !== '/index.html' &&
            currentPage !== '/dist/html/portfolio.html' &&
            currentPage !== '/dist/html/about.html'
        ) {
            // ...то перенаправляем на Главную.
            window.location.href = '/index.html';
        }
    };
})();

// todo: Пререключение меню по клику
(() => {
    // Фиксированное меню
    const headerMenu = document.querySelector('.header__menu');
    // Кнопка вызова меню
    const headerBodyMenuBtn = document.querySelector('.header__body-menu-btn');
    let menuActive = false; // Флаг состояния
    
    // Обработчик события клика на кнопке вызова меню
    headerBodyMenuBtn.addEventListener('click', () => {
        // Если меню активно, переключаем его в неактивное состояние
        if (menuActive) {
            headerMenu.classList.remove('header__menu--active');
            headerMenu.classList.add('header__menu--inactive');
        } 
        // Если меню неактивно, переключаем его в активное состояние
        else {
            headerMenu.classList.remove('header__menu--inactive');
            headerMenu.classList.add('header__menu--active');
        }
        // Инвертируем флаг состояния меню
        menuActive = !menuActive;
    });
})();
/*
— — — — — — — — — — — — — 
*                   Bottom nav
— — — — — — — — — — — — — 
*/
// todo: Отображение окошка с настройками по клику
(() => {
    // Кнопка настроек и окошко с настройками
    const settingsBtn = document.querySelector('.bottom-nav__btn-settings');
    const settingsPopup = document.querySelector('.settings-popup');
    let settingsPopupActive = false; // Флаг состояния

    // Обработчик события клика на кнопке вызова окошка настроек
    settingsBtn.addEventListener('click', () => {
        toggleSettingsPopup();
    });

    // Функция переключения состояния окошка настроек
    function toggleSettingsPopup() {
        if (settingsPopupActive) {
            hideSettingsPopup();
        } else {
            showSettingsPopup();
        }
    }

    // Функция показа окошка настроек
    function showSettingsPopup() {
        settingsPopup.classList.remove('settings-popup--inactive');
        settingsPopup.classList.add('settings-popup--active');
        settingsPopupActive = true;
    }

    // Функция скрытия окошка настроек
    function hideSettingsPopup() {
        settingsPopup.classList.remove('settings-popup--active');
        settingsPopup.classList.add('settings-popup--inactive');
        settingsPopupActive = false;
    }

    document.addEventListener('click', (event) => {
        // Скрытие кликом на всё, кроме самого окошка
        if (!settingsPopup.contains(event.target) && event.target !== settingsBtn) {
            hideSettingsPopup();
        }
    });
})();
/*
— — — — — — — — — — — — — 
*                   Settings
— — — — — — — — — — — — — 
*/
// todo: Переключение тем в настройках
(() => {
    // Чекбокс смены темы
    const themeCheckbox = document.querySelector('.settings-popup__checkbox-input-theme');
    // Загрузка из localStorage текущих состояния чекбокса и цветов
    const themeCheckboxState = JSON.parse(localStorage.getItem('themeCheckboxState'));
    if (themeCheckboxState) {
        themeCheckbox.checked = true;
        applyDarkTheme();
    } else {
        themeCheckbox.checked = false;
        applyLightTheme();
    };

    // Функция для упрощения изменения значения переменных
    function changeThemeVarValue(varName, varValue) {
        document.documentElement.style.setProperty(varName, `var(${varValue})`);
    };

    // Смена цветов по переключению
    themeCheckbox.addEventListener('change', function() {
        if (this.checked) {
            applyDarkTheme();
        } else {
            applyLightTheme();
        }
        // Сохраняем состояние чекбокса и цвета
        localStorage.setItem('themeCheckboxState', themeCheckbox.checked);
        localStorage.setItem('bodyBg', getComputedStyle(document.documentElement).getPropertyValue('--body-bg'));
        localStorage.setItem('bodyColor', getComputedStyle(document.documentElement).getPropertyValue('--body-color'));
        localStorage.setItem('navBg', getComputedStyle(document.documentElement).getPropertyValue('--nav-bg'));
    });

    // Функции изменения цветов для каждой темы
    function applyLightTheme() {
        changeThemeVarValue('--body-bg', '--body-bg__light-theme');
        changeThemeVarValue('--body-color', '--body-color__light-theme');
        changeThemeVarValue('--nav-bg', '--nav-bg__light-theme');
    };
    function applyDarkTheme() {
        changeThemeVarValue('--body-bg', '--body-bg__dark-theme');
        changeThemeVarValue('--body-color', '--body-color__dark-theme');
        changeThemeVarValue('--nav-bg', '--nav-bg__dark-theme');
    }
})();
// ! Внимание: здесь хранится всё текстовое содержимое, требующее перевода
// todo: Переключение языков в настройках
(() => {
    // Флаг для отслеживания первого посещения
    let isFirstVisit = true;
    // Если это первое посещение, применяется язык по умолчанию и инвертируется флаг
    if (isFirstVisit) {
        applyRuLang();
        isFirstVisit = false;
    };

    // Чекбокс смены языка
    const langCheckbox = document.querySelector('.settings-popup__checkbox-input-lang');

    // Загрузка из localStorage текущих состояния чекбокса и языка
    const langCheckboxState = JSON.parse(localStorage.getItem('langCheckboxState'));
    const currentLanguage = localStorage.getItem('currentLanguage');

    if (langCheckboxState !== null) {
        langCheckbox.checked = langCheckboxState;
        if (currentLanguage === 'en') {
            applyEnLang();
        } else {
            applyRuLang();
        }
    } else {
        // Устанавливаем значения по умолчанию
        langCheckbox.checked = false;
        applyRuLang();
    };

    // Смена языков по переключению
    langCheckbox.addEventListener('change', function() {
        if (this.checked) {
            applyEnLang();
        } else {
            applyRuLang();
        }
        // Сохраняем состояние чекбокса и языка
        localStorage.setItem('langCheckboxState', langCheckbox.checked);
        localStorage.setItem('currentLanguage', this.checked ? 'en' : 'ru');
    });

    // Функция для упрощения изменения текстового содержимого элементов
    function changeTextContent(textElementContent, textElements) {
        // Прохожусь по всем элементам массива
        textElements.forEach(function(element) {
            element.innerHTML = textElementContent;
        });
    };
    /*
    — — — — — — — — — — — — —  — — — — — — — — —
    *   Функции изменения текста для каждого языка
    — — — — — — — — — — — — — — — — — — — — — —
    */
    function applyRuLang() {
        // * Навигация
        // По страницам
        changeTextContent("Главная", [headerMenuBtnsArray[0], bottomNavBtnsArray[0]]);
        changeTextContent("Портфолио", [headerMenuBtnsArray[1], bottomNavBtnsArray[1]]);
        changeTextContent("Обо мне", [headerMenuBtnsArray[2], bottomNavBtnsArray[2]]);
        changeTextContent("Настройки", [bottomNavBtnsArray[3], bottomNavBtnsArray[3]]);
        // Подвал
        changeTextContent("Давайте оставаться на связи!", [document.querySelector('.footer__title--l')]);
        changeTextContent("Написать мне", [Array.from(document.querySelectorAll('.footer__title--m'))[0]]);
        changeTextContent( "Заказчику", [Array.from(document.querySelectorAll('.footer__title--m'))[1]]);
        // Настройки
        changeTextContent("Язык:", [Array.from(document.querySelectorAll('.settings-popup__checkbox-name'))[0]]);
        changeTextContent("Тема:", [Array.from(document.querySelectorAll('.settings-popup__checkbox-name'))[1]]);

        // * Контент
        changeTextContent(
            'Сэкономьте <b class="bold">40%</b> почасовой оплаты в первые <b class="bold">2 недели</b>!', 
            [document.querySelector('.home-sect-2__text-bubble'), document.querySelector('.header__ad-text')]
        );
    };

    function applyEnLang() {
        // * Навигация
        // По страницам
        changeTextContent("Home", [headerMenuBtnsArray[0], bottomNavBtnsArray[0]]);
        changeTextContent("Portfolio", [headerMenuBtnsArray[1], bottomNavBtnsArray[1]]);
        changeTextContent("About me", [headerMenuBtnsArray[2], bottomNavBtnsArray[2]]);
        changeTextContent("Settings", [bottomNavBtnsArray[3], bottomNavBtnsArray[3]]);
        // Подвал
        changeTextContent("Let's stay connected!", [document.querySelector(".footer__title--l")]);
        changeTextContent("Write me", [Array.from(document.querySelectorAll('.footer__title--m'))[0]]);
        changeTextContent("Write me", [Array.from(document.querySelectorAll('.footer__title--m'))[1]]);
        // Настройки
        changeTextContent("Language:", [Array.from(document.querySelectorAll('.settings-popup__checkbox-name'))[0]]);
        changeTextContent("Theme:", [Array.from(document.querySelectorAll('.settings-popup__checkbox-name'))[1]]);

        // * Контент
        changeTextContent(
            'Сэкономьте <b class="bold">40%</b> почасовой оплаты в первые <b class="bold">2 недели</b>!', 
            [document.querySelector('.home-sect-2__text-bubble'), document.querySelector('.header__ad-text')]
        );
    };
})();