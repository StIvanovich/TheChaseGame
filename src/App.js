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
            <h1>Погоня</h1>

            <BackgroundMusic isPlaying={isGameStarted && !isGameOver} />

            {!isGameStarted && !isGameOver && !showResults && (
                <button onClick={startGame} className="start-button">
                    Начать игру
                </button>
            )}
            {isGameStarted && <Game onGameOver={handleGameOver} />}
            {isGameOver && <GameOverScreen time={finalTime} onSubmitName={handleNameSubmit} />}
            {showResults && (
                <>
                    <ResultTable />
                    <button onClick={startGame} className="restart-button">
                        Начать заново
                    </button>
                </>
            )}
        </div>
    );
}

export default App;
