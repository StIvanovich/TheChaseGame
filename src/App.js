import React, { useState } from "react";
import Game from "./components/Game/Game";
import ResultTable from "./components/ResultTable/ResultTable";
import "./App.css";

function App() {
    const [results, setResults] = useState([]);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const handleGameOver = (time) => {
        setResults([...results, time]);
        setIsGameStarted(false);
        setShowResults(true);
    };

    const startGame = () => {
        setIsGameStarted(true);
        setShowResults(false);
    };

    return (
        <div className="App">
            <h1>Погоня</h1>
            {!isGameStarted && (
                <button onClick={startGame} className="start-button">
                    Начать игру
                </button>
            )}
            {isGameStarted && <Game onGameOver={handleGameOver} />}
            {showResults && <ResultTable results={results} />}
        </div>
    );
}

export default App;
