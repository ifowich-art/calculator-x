// Модуль управления игровым столом
const Game = {
    handContainer: document.getElementById('player-hand'),
    tableContainer: document.getElementById('game-table'),

    // Имитация старта игры
    initMockGame() {
        this.handContainer.innerHTML = '';
        this.tableContainer.innerHTML = '';
        
        // Раздаем 6 случайных карт визуально
        const mockCards = ['♠️ 6', '♥️ 8', '♣️ Д', '♦️ Т', '♠️ 10', '♥️ К'];
        
        mockCards.forEach((cardData, index) => {
            const cardEl = document.createElement('div');
            cardEl.className = `card ${cardData.includes('♥️') || cardData.includes('♦️') ? 'red' : ''}`;
            cardEl.innerText = cardData;
            
            // Обработчик клика по карте (попытка сходить)
            cardEl.onclick = () => this.playCard(cardEl, cardData);
            
            this.handContainer.appendChild(cardEl);
        });
    },

    // Логика бросания карты на стол
    playCard(cardElement, cardData) {
        // Отправляем ход на сервер
        WS.sendAction('attack_card', { card: cardData });

        // Визуально переносим карту из руки на стол
        this.tableContainer.appendChild(cardElement);
        
        // Сбрасываем стили руки и задаем позицию на столе
        cardElement.style.position = 'absolute';
        cardElement.style.margin = '0';
        cardElement.style.left = `${Math.random() * 40 + 30}%`; // Чуть-чуть вразброс
        cardElement.style.top = `${Math.random() * 40 + 30}%`;
        cardElement.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
        
        cardElement.onclick = null; // На столе карту кликать нельзя
    },

    takeCards() {
        WS.sendAction('take_cards', {});
        alert('Вы забрали карты (отправлено на сервер)');
    },

    passTurn() {
        WS.sendAction('done', {});
        alert('Бито / Передача хода (отправлено на сервер)');
    }
};