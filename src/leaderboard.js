// src/leaderboard.js

export const getLeaderboard = () => {
    const data = localStorage.getItem("leaderboard");
    return data ? JSON.parse(data) : [];
};

export const saveToLeaderboard = (time, name) => {
    const newEntry = { name: name || "Безымянный", time };

    // Получаем текущие данные из localStorage
    const leaderboard = getLeaderboard();

    // Добавляем новый результат в таблицу лидеров
    leaderboard.push(newEntry);

    // Сортируем по времени (по убыванию)
    leaderboard.sort((a, b) => b.time - a.time);

    // Ограничиваем таблицу 10 лучшими результатами
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard.slice(0, 10)));
};
