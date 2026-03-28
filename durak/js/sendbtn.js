// Вставь сюда свой ID пользователя в MAX (обычно это цифры)
const CHAT_ID = "ТВОЙ_ID_В_МАКСЕ"; 
// Ссылка, которую тебе выдал Netlify (или другой хостинг)
const APP_URL = "https://tvoya-ssilka.netlify.app"; 
// Твой токен, который ты скидывал выше
const BOT_TOKEN = "f9LHodD0cOI7WKBnjevJYagMxLX3dzGXBGdSmMMKvaaV6nFk62oMdFKNM9ObrLhvIl5-s0GCNtTh8G4gwhA8";

async function sendMenu() {
    const url = `https://platform-api.max.ru/bot${BOT_TOKEN}/sendMessage`; // Уточни базовый URL API в документации MAX, обычно он такой

    const payload = {
        chat_id: CHAT_ID,
        text: "Привет! Жми кнопку ниже, чтобы начать игру 🃏",
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "🎮 Играть",
                        type: "open_app", 
                        url: APP_URL
                    }
                ]
            ]
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        console.log("Ответ от MAX:", result);
    } catch (error) {
        console.error("Ошибка отправки:", error);
    }
}

sendMenu();