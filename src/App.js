import React, { useState } from "react";
import Game from "./components/Game/Game";
import ResultTable from "./components/ResultTable/ResultTable";
import GameOverScreen from "./components/GameOverScreen/GameOverScreen";
import BackgroundMusic from "./components/BackgroundMusic";
import "./App.css";

function App() {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [finalTime, setFinalTime] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const handleGameOver = (time) => {
        setFinalTime(time);
        setIsGameOver(true);
        setIsGameStarted(false);
    };

    const handleNameSubmit = (name) => {
        setIsGameOver(false);
        setShowResults(true);
    };

    const startGame = () => {
        setIsGameStarted(true);
        setShowResults(false);
        setIsGameOver(false);
    };

    return (
        <div className="App">
            <BackgroundMusic isPlaying={isGameStarted && !isGameOver} />
            <div className="jungle">
                <video className="jungle-video" src={require("../src/materials/video/jungle.mp4")} autoPlay loop muted></video>
            </div>
            {!isGameStarted && !isGameOver && !showResults && (
                <div>
                    <div class="rules">
                        <h2>Правила игры</h2>
                        <p>Вы управляете мышкой, а крокодил пытается вас поймать. Задача: не попадаться!</p>
                        <ul>
                            <li>Перемещайте курсор внутри игрового поля.</li>
                            <li>Игра завершится, если курсор покинет поле или крокодил вас догонит.</li>
                            <li>Чем дольше вы держитесь, тем выше ваш результат.</li>
                        </ul>
                    </div>
                    <button onClick={startGame} className="start-button">
                        Начать игру
                    </button>
                </div>
            )}
            {isGameStarted && <Game onGameOver={handleGameOver} />}
            {isGameOver && <GameOverScreen time={finalTime} onSubmitName={handleNameSubmit} />}
            {showResults && (
                <div style={{ display: "flex" }}>
                    <ResultTable />
                    <button onClick={startGame} className="restart-button">
                        Начать заново
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
