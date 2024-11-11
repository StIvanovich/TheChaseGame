import React, { useState } from "react";
import Game from "./components/Game/Game";
import ResultTable from "./components/ResultTable/ResultTable";
import "./App.css";

function App() {
    const [results, setResults] = useState([]);

    const handleGameOver = (time) => {
        setResults([...results, time]);
    };

    return (
        <div className="App">
            <h1>Погоня</h1>
            <Game onGameOver={handleGameOver} />
            <ResultTable results={results} />
        </div>
    );
}

export default App;
