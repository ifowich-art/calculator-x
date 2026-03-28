// Модуль для работы с WebSocket
const WS = {
    socket: null,

    connect(roomId) {
        console.log(`[WS] Подключение к комнате ${roomId}...`);
        // В проде: this.socket = new WebSocket(`wss://tvoy-backend.ru/ws?room=${roomId}`);
        
        // Имитируем, что через секунду пришло состояние игры
        setTimeout(() => {
            console.log('[WS] Соединение установлено. Игра начинается!');
            App.showScreen('game-screen');
            Game.initMockGame(); // Рисуем карты
        }, 1500);
    },

    sendAction(action, payload) {
        console.log(`[WS] Отправка действия: ${action}`, payload);
        // В проде: this.socket.send(JSON.stringify({ action, payload }));
    }
};