document.addEventListener('DOMContentLoaded', function() {
    // Элементы модальных окон
    const donationModal = document.getElementById('donationModal');
    const successModal = document.getElementById('successModal');
    const closeButtons = document.querySelectorAll('.close');
    
    // Кнопки для открытия модального окна
    const showPaymentBtn = document.getElementById('showPaymentMethod');
    const donateButtons = document.querySelectorAll('.donate-btn');
    
    // Радиокнопки выбора метода оплаты
    const prePaymentMethods = document.querySelectorAll('input[name="pre-payment-method"]');
    const modalPaymentMethods = document.querySelectorAll('input[name="donation-method"]');
    
    // Методы оплаты в модальном окне
    const donationMethods = document.querySelectorAll('.donation-method');
    
    // Форма идеи
    const ideaForm = document.getElementById('idea-form');

    // Показать модальное окно с выбранным методом
    function showDonationModal() {
        // Определяем выбранный метод на главной странице
        let selectedMethod = 'qr';
        prePaymentMethods.forEach(radio => {
            if (radio.checked) {
                selectedMethod = radio.value;
            }
        });
        
        // Показываем модальное окно
        donationModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Активируем соответствующий метод в модальном окне
        document.getElementById(`${selectedMethod}-method-radio`).checked = true;
        donationMethods.forEach(method => method.style.display = 'none');
        document.getElementById(`${selectedMethod}-method`).style.display = 'block';
    }

    // Закрытие модального окна
    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Обработчики для кнопок пожертвования
    donateButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showDonationModal();
        });
    });

    // Обработчик для кнопки "Выбрать способ оплаты"
    if (showPaymentBtn) {
        showPaymentBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showDonationModal();
        });
    }

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

    // Переключение методов оплаты в модальном окне
    modalPaymentMethods.forEach(radio => {
        radio.addEventListener('change', function() {
            donationMethods.forEach(method => {
                method.style.display = 'none';
            });
            document.getElementById(`${this.value}-method`).style.display = 'block';
        });
    });

    // Обработка формы идеи
    if (ideaForm) {
        ideaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            successModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            this.reset();
        });
    }
});