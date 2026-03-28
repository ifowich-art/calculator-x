// Модуль для запросов к бэкенду (REST API)
const API = {
    baseUrl: 'https://tvoy-backend.ru/api',

    // Имитация задержки сети для MVP
    async mockRequest(data, delay = 800) {
        return new Promise(resolve => setTimeout(() => resolve(data), delay));
    },

    async joinMatchmaking(mode) {
        console.log(`[API] Ищем открытую комнату. Режим: ${mode}`);
        // В проде здесь будет: return fetch(`${this.baseUrl}/matchmaking/join`, {...})
        return this.mockRequest({ status: 'success', roomId: 'room_123' });
    },

    async createPrivateRoom(mode) {
        console.log(`[API] Создаем приватную комнату. Режим: ${mode}`);
        return this.mockRequest({ status: 'success', roomId: 'priv_456', inviteLink: 'https://max.ru/bot?start=priv_456' });
    }
};  