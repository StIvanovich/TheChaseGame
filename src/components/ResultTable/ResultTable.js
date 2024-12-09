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
            <h2>Результаты</h2>
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Имя</th>
                        <th>Время (сек)</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result, index) => (
                        <tr key={index}>
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
