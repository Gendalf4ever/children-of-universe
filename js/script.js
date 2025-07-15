document.addEventListener('DOMContentLoaded', function() {
    // Элементы модального окна
    const modal = document.getElementById('donationModal');
    const closeBtn = document.querySelector('.close');
    
    // Кнопки для открытия модального окна
    const donateButtons = document.querySelectorAll('.donate-btn, [href="#donate"]');
    
    // Кнопки выбора метода оплаты
    const methodButtons = document.querySelectorAll('.method-btn');
    
    // Показ модального окна
    donateButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
        });
    });
    
    // Закрытие модального окна
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Закрытие при клике вне окна
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Переключение методов оплаты
    methodButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const method = this.getAttribute('data-method');
            showDonationMethod(method);
        });
    });
    
    // Показываем QR-код по умолчанию
    showDonationMethod('qr');
});

function showDonationMethod(method) {
    document.getElementById('qr-method').style.display = 
        method === 'qr' ? 'block' : 'none';
    document.getElementById('details-method').style.display = 
        method === 'details' ? 'block' : 'none';
}

function copyDetails() {
    const details = `Получатель: Благотворительный фонд "Созидание"
ИНН: 1234567890
КПП: 987654321
Банк: ПАО "Сбербанк"
БИК: 044525225
К/с: 30101810400000000225
Р/с: 40703810238000001234`;
    
    navigator.clipboard.writeText(details)
        .then(() => alert('Реквизиты скопированы!'))
        .catch(err => console.error('Ошибка копирования: ', err));
}