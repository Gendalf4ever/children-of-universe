document.addEventListener('DOMContentLoaded', function() {
    // Инициализация модальных окон
    const donationModal = document.getElementById('donationModal');
    const successModal = document.getElementById('successModal');
    const closeButtons = document.querySelectorAll('.close');
    const donateButtons = document.querySelectorAll('.donate-btn');
    
    // Элементы для перевода по карте
    const showCardBtn = document.querySelector('.btn-show-card');
    const cardNumberFull = document.querySelector('.card-number-full');
    const cardNumberMasked = document.querySelector('.card-number-masked');
    const copyCardBtn = document.querySelector('.copy-btn');

    // Управление модальными окнами
    function toggleModal(modal, show) {
        if (modal) {
            modal.style.display = show ? 'block' : 'none';
            document.body.style.overflow = show ? 'hidden' : 'auto';
        }
    }

    // Открытие модального окна пожертвований
    donateButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleModal(donationModal, true);
        });
    });

    // Закрытие модальных окон
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            toggleModal(modal, false);
        });
    });

    // Закрытие при клике вне окна
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            toggleModal(e.target, false);
        }
    });

    // Переключение методов оплаты
    const methodRadios = document.querySelectorAll('input[name="donation-method"]');
    methodRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            document.querySelectorAll('.donation-method').forEach(method => {
                method.style.display = 'none';
            });
            const selectedMethod = document.getElementById(`${this.value}-method`);
            if (selectedMethod) selectedMethod.style.display = 'block';
        });
    });

    // Показать полный номер карты
    if (showCardBtn) {
        showCardBtn.addEventListener('click', function() {
            cardNumberMasked.style.display = 'none';
            cardNumberFull.style.display = 'flex';
        });
    }

    // Копирование номера карты
    if (copyCardBtn) {
        copyCardBtn.addEventListener('click', function() {
            const cardNumber = document.getElementById('cardNumber');
            cardNumber.select();
            document.execCommand('copy');
            
            // Визуальная обратная связь
            const originalText = copyCardBtn.textContent;
            copyCardBtn.textContent = 'Скопировано!';
            setTimeout(() => {
                copyCardBtn.textContent = originalText;
            }, 2000);
        });
    }

    // Обработка формы идеи
    const ideaForm = document.getElementById('idea-form');
    if (ideaForm) {
        ideaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            toggleModal(successModal, true);
            this.reset();
        });
    }

    // Инициализация - показываем QR-код по умолчанию
    document.getElementById('qr-method').style.display = 'block';
});

// Функция для копирования текста (для использования в других местах)
function copyToClipboard(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}