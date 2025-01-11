import React, { useState, useEffect } from "react";
import "./ResultTable.css";

function ResultTable() {
    const [results, setResults] = useState([]);

    // Загружаем результаты из localStorage при монтировании компонента
    useEffect(() => {
        const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
        setResults(leaderboard);
    }, []);

    return (
        <div className="result-table">
            <h2 style={{ fontSize: "min(2vw, 3vh)", margin: "1vw" }}>Результаты</h2>
            <table>
                <thead style={{ fontSize: "min(2vw, 3vh)" }}>
                    <tr>
                        <th>№</th>
                        <th>Имя</th>
                        <th>Время (сек)</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => (
                        <tr key={index} style={{ fontSize: "min(2vw, 3vh)", height: "min(6.5vh, 6.5vw)" }}>
                            <td>{index + 1}</td>
                            <td>{result.name}</td>
                            <td>{result.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ResultTable;
