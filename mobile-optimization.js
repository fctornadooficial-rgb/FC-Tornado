/**
 * Оптимизация сайта ФК "ТОРНАДО" для мобильных устройств
 * Автоматически добавляется к сайту
 */

// Функция для определения мобильного устройства
function isMobileDevice() {
    return window.innerWidth <= 768;
}

// Функция для определения iOS устройства
function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

// Функция для добавления мобильных классов к элементам
function addMobileClasses() {
    const body = document.body;
    
    if (isMobileDevice()) {
        body.classList.add('mobile-device');
        
        // Добавляем тач-классы для интерактивных элементов
        const interactiveElements = document.querySelectorAll('.telegram-link, .friends-link, .info-card, .trophy-item');
        interactiveElements.forEach(el => {
            el.classList.add('touch-element');
        });
        
        // Улучшаем заголовок для мобильных
        const clubName = document.querySelector('.club-name');
        if (clubName && window.innerWidth <= 480) {
            clubName.style.fontSize = '2rem';
        }
    }
    
    // Добавляем iOS-специфичные классы
    if (isIOS()) {
        body.classList.add('ios-device');
    }
}

// Функция для улучшения тач-событий
function improveTouchEvents() {
    // Предотвращаем масштабирование при двойном тапе
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Улучшаем скролл на iOS
    if (isIOS()) {
        document.documentElement.style.cursor = 'pointer';
        document.documentElement.style.WebkitTapHighlightColor = 'transparent';
    }
    
    // Добавляем эффект нажатия для кнопок
    const buttons = document.querySelectorAll('.telegram-link, .friends-link');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('touchcancel', function() {
            this.style.transform = '';
        });
    });
    
    // Улучшаем тач-события для карточек
    const cards = document.querySelectorAll('.info-card, .trophy-item');
    cards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1)';
            this.style.transition = 'all 0.15s ease';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        card.addEventListener('touchcancel', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// Функция для создания плавающей кнопки навигации
function createFloatingMenu() {
    if (!isMobileDevice()) return;
    
    const floatingMenu = document.createElement('div');
    floatingMenu.id = 'floating-mobile-menu';
    floatingMenu.innerHTML = `
        <div class="floating-menu-content">
            <button class="floating-btn" id="back-to-top" title="Наверх">
                <i class="fas fa-arrow-up"></i>
            </button>
            <button class="floating-btn" id="scroll-to-telegram" title="Telegram">
                <i class="fab fa-telegram"></i>
            </button>
            <button class="floating-btn" id="scroll-to-trophies" title="Трофеи">
                <i class="fas fa-trophy"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(floatingMenu);
    
    // Стили для плавающего меню
    const style = document.createElement('style');
    style.textContent = `
        #floating-mobile-menu {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
        }
        
        .floating-menu-content {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .floating-btn {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white;
            border: none;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            transition: all 0.3s ease;
            opacity: 0.9;
        }
        
        .floating-btn:hover {
            transform: scale(1.1);
            opacity: 1;
        }
        
        .floating-btn i {
            pointer-events: none;
        }
        
        @media (max-width: 480px) {
            .floating-btn {
                width: 45px;
                height: 45px;
                font-size: 1.1rem;
            }
            
            #floating-mobile-menu {
                bottom: 15px;
                right: 15px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Добавляем функционал кнопкам
    document.getElementById('back-to-top').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.getElementById('scroll-to-telegram').addEventListener('click', () => {
        const telegramSection = document.querySelector('.telegram-section');
        if (telegramSection) {
            telegramSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    document.getElementById('scroll-to-trophies').addEventListener('click', () => {
        const trophiesSection = document.querySelector('.trophies-section');
        if (trophiesSection) {
            trophiesSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Функция для улучшения навигации по секциям
function improveSectionNavigation() {
    // Добавляем id ко всем секциям для удобной навигации
    const sections = document.querySelectorAll('.content-section, .telegram-section, .friends-section, .trophies-section');
    sections.forEach((section, index) => {
        if (!section.id) {
            section.id = `section-${index}`;
        }
    });
    
    // Добавляем плавную прокрутку для внутренних ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Функция для улучшения чтения текста на мобильных
function improveTextReadability() {
    if (!isMobileDevice()) return;
    
    // Увеличиваем размер текста для мобильных
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 480px) {
            body {
                font-size: 16px;
                line-height: 1.7;
            }
            
            h2 {
                font-size: 1.4rem;
            }
            
            h3 {
                font-size: 1.2rem;
            }
            
            .info-card, .trophy-item {
                padding: 1.2rem;
            }
            
            .telegram-link, .friends-link {
                padding: 1rem 1.5rem;
                font-size: 1rem;
            }
            
            .no-trophies-text {
                font-size: 2.5rem;
            }
        }
        
        /* Улучшаем отступы для мобильных */
        .content-section, .telegram-section, .friends-section, .trophies-section {
            padding: 1.5rem;
            margin: 1rem auto;
        }
        
        /* Улучшаем тач-цели */
        .touch-element {
            min-height: 44px;
            min-width: 44px;
        }
        
        .telegram-link, .friends-link {
            touch-action: manipulation;
        }
    `;
    document.head.appendChild(style);
}

// Функция для обработки изменения ориентации устройства
function handleOrientationChange() {
    let timeout;
    window.addEventListener('resize', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            location.reload();
        }, 150);
    });
}

// Функция для добавления индикатора загрузки на мобильных
function addMobileLoadingIndicator() {
    if (!isMobileDevice()) return;
    
    const loader = document.createElement('div');
    loader.id = 'mobile-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, #1e3c72, #2a5298);
        z-index: 9999;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
    `;
    document.body.appendChild(loader);
    
    // Анимация загрузки при скролле
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        loader.style.transform = `translateX(-${100 - scrollPercent}%)`;
        
        lastScrollTop = scrollTop;
    });
}

// Основная функция инициализации
function initMobileOptimization() {
    console.log('Инициализация оптимизации для мобильных устройств...');
    
    // Добавляем мобильные классы
    addMobileClasses();
    
    // Улучшаем тач-события
    improveTouchEvents();
    
    // Создаем плавающее меню
    createFloatingMenu();
    
    // Улучшаем навигацию по секциям
    improveSectionNavigation();
    
    // Улучшаем читаемость текста
    improveTextReadability();
    
    // Обрабатываем изменение ориентации
    handleOrientationChange();
    
    // Добавляем индикатор загрузки
    addMobileLoadingIndicator();
    
    console.log('Оптимизация для мобильных устройств завершена!');
}

// Запускаем оптимизацию после загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileOptimization);
} else {
    initMobileOptimization();
}

// Экспортируем функции для глобального использования
window.mobileOptimization = {
    init: initMobileOptimization,
    isMobile: isMobileDevice,
    isIOS: isIOS,
    refresh: () => location.reload()
};
