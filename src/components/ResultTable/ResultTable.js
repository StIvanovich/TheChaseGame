import React from "react";
import "./ResultTable.css";

function ResultTable({ results }) {
    return (
        <div className="result-table">
            <h2>Результаты</h2>
            <ul>
                {results.map((time, index) => (
                    <li key={index}>Время: {time} сек</li>
                ))}
            </ul>
        </div>
    );
}

export default ResultTable;
