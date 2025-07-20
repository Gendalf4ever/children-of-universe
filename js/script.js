document.addEventListener('DOMContentLoaded', function() {
    // Элементы модальных окон
    const donationModal = document.getElementById('donationModal');
    const successModal = document.getElementById('successModal');
    const closeButtons = document.querySelectorAll('.close');
    
    // Кнопки пожертвования
    const donateButtons = document.querySelectorAll('.donate-btn');
    
    // Элементы табов в модальном окне
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Форма идеи
    const ideaForm = document.getElementById('idea-form');

    // Открытие модального окна пожертвований
    function openDonationModal() {
        donationModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        // Всегда показываем QR-код при открытии
        switchTab('qr-tab');
    }

    // Закрытие модального окна
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Переключение табов
    function switchTab(tabId) {
        // Скрыть все табы
        tabContents.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Убрать активность у всех кнопок
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Показать выбранный таб
        document.getElementById(tabId).classList.add('active');
        
        // Активировать соответствующую кнопку
        document.querySelector(`.tab-btn[data-tab="${tabId}"]`).classList.add('active');
    }

    // Обработчики для кнопок пожертвования
    donateButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openDonationModal();
        });
    });

    // Обработчики закрытия модальных окон
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // Закрытие при клике вне модального окна
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Переключение табов
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Обработка формы идеи
    if (ideaForm) {
        ideaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('success-message').textContent = 'Ваша идея успешно отправлена!';
            successModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            this.reset();
        });
    }

    // Сохранение QR-кода при клике
    const qrCode = document.querySelector('.qr-code');
    if (qrCode) {
        qrCode.addEventListener('click', function() {
            const link = document.createElement('a');
            link.href = this.src;
            link.download = 'qr-deti-vselennoi.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});