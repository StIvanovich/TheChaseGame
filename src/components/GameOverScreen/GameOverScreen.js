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
            <h2 style={{ fontSize: "min(5vw, 7vh)", margin: 0 }}>Игра окончена!</h2>
            <form onSubmit={handleSubmit} style={{ fontSize: "min(2vw, 3vh)", width: "min(30vw, 30vh)" }}>
                <label>
                    Введите ваше имя:
                    <input
                        style={{ fontSize: "min(2vw, 3vh)", width: "100%" }}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ваше имя"
                        required
                    />
                </label>
                <button
                    type="submit"
                    className="submit-button"
                    style={{ fontSize: "min(2vw, 3vh)", padding: "1vw", margin: 0 }}
                >
                    Сохранить результат
                </button>
            </form>
        </div>
    );
}

export default GameOverScreen;
