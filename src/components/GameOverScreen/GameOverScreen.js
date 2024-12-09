import React, { useState } from "react";
import { saveToLeaderboard } from "../../leaderboard"; // Импортируем функцию сохранения
import "./GameOverScreen.css";

function GameOverScreen({ onSubmitName, time }) {
    const [name, setName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Сохраняем результат в localStorage
        saveToLeaderboard(time, name);
        onSubmitName(name);
    };

    return (
        <div className="game-over-screen">
            <h2>Игра окончена!</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Введите ваше имя:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ваше имя" required />
                </label>
                <button type="submit" className="submit-button">
                    Сохранить результат
                </button>
            </form>
        </div>
    );
}

export default GameOverScreen;
