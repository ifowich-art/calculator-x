// Главный объект приложения
const App = {
    currentMode: null,
    maxInitData: null,

    init() {
        // Проверяем наличие API мессенджера MAX
        const maxApp = window.Telegram?.WebApp || window.MaxApp;
        
        if (maxApp) {
            this.maxInitData = maxApp.initData;
            maxApp.ready(); // Сообщаем, что UI готов
            if (maxApp.expand) maxApp.expand(); // Разворачиваем на весь экран
            console.log("MAX App успешно проинициализирован");
        } else {
            console.warn("API MAX не найдено. Запущено в браузере.");
        }

        // Имитируем проверку авторизации и убираем лоадер
        setTimeout(() => {
            this.showScreen('hub-screen');
        }, 800);
    },

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    },

    selectMode(mode) {
        this.currentMode = mode;
        const modeText = mode === '1v1' ? '1 на 1' : 'До 6 игроков';
        document.getElementById('lobby-title').innerText = `Лобби (${modeText})`;
        
        this.showScreen('lobby-screen');
    },

    async startQuickMatch() {
        const btn = document.getElementById('btn-quick-match');
        btn.innerText = 'Ищем соперника...';
        btn.disabled = true;

        try {
            const response = await API.joinMatchmaking(this.currentMode);
            WS.connect(response.roomId); // Подключаемся к комнате по вебсокету
        } catch (e) {
            alert('Ошибка поиска игры');
        } finally {
            btn.innerText = '🚀 Быстрый матч';
            btn.disabled = false;
        }
    },

    async createPrivateRoom() {
        try {
            const response = await API.createPrivateRoom(this.currentMode);
            alert(`Комната создана!\nСсылка для друга: ${response.inviteLink}\nВ MAX здесь будет вызов нативного окна "Поделиться".`);
            WS.connect(response.roomId);
        } catch (e) {
            alert('Ошибка создания комнаты');
        }
    }
};

// Запускаем приложение после загрузки DOM
window.addEventListener('DOMContentLoaded', () => {
    App.init();
});