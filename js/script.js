document.addEventListener('DOMContentLoaded', function() {
    // Элементы модальных окон
    const donationModal = document.getElementById('donationModal');
    const successModal = document.getElementById('successModal');
    const closeButtons = document.querySelectorAll('.close');
    const donateButtons = document.querySelectorAll('.donate-btn');
    
    // Методы оплаты
    const methodRadios = document.querySelectorAll('input[name="donation-method"]');
    const donationMethods = document.querySelectorAll('.donation-method');
    
    // Форма идеи
    const ideaForm = document.getElementById('idea-form');

    // Показать модальное окно
    function showModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Скрыть модальное окно
    function hideModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Обработчики для кнопок пожертвования
    donateButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showModal(donationModal);
        });
    });

    // Обработчики для закрытия модальных окон
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            hideModal(modal);
        });
    });

    // Закрытие при клике вне модального окна
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            hideModal(e.target);
        }
    });

    // Переключение методов оплаты
    methodRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Скрываем все методы
            donationMethods.forEach(method => {
                method.style.display = 'none';
            });
            
            // Показываем выбранный метод
            const selectedMethod = document.getElementById(`${this.value}-method`);
            if (selectedMethod) {
                selectedMethod.style.display = 'block';
            }
        });
    });

    // Обработка формы идеи
    if (ideaForm) {
        ideaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь можно добавить AJAX-запрос для отправки формы
            showModal(successModal);
            this.reset();
        });
    }

    // Инициализация - показываем QR-код по умолчанию
    document.getElementById('qr-method').style.display = 'block';
});