import React, { useState, useEffect } from "react";
import Crocodile from "../Crocodile/Crocodile";
import Mouse from "../Mouse/Mouse";
import "./Game.css";

function Game({ onGameOver }) {
    const [crocodilePosition, setCrocodilePosition] = useState({ x: 50, y: 50 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isGameOver, setIsGameOver] = useState(false);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval;
        if (!isGameOver) {
            interval = setInterval(() => setTimer((prev) => prev + 0.1), 100);
        }
        return () => clearInterval(interval);
    }, [isGameOver]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const gameArea = document.getElementById("game-area").getBoundingClientRect();
            if (e.clientX < gameArea.left || e.clientX > gameArea.right || e.clientY < gameArea.top || e.clientY > gameArea.bottom) {
                setIsGameOver(true);
                onGameOver(timer.toFixed(1));
            } else {
                setMousePosition({ x: e.clientX - gameArea.left, y: e.clientY - gameArea.top });
            }
        };

        if (!isGameOver) {
            window.addEventListener("mousemove", handleMouseMove);
        }
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [isGameOver, timer, onGameOver]);

    useEffect(() => {
        const moveCrocodile = () => {
            const dx = mousePosition.x - crocodilePosition.x;
            const dy = mousePosition.y - crocodilePosition.y;
            const angle = Math.atan2(dy, dx);
            const speed = 2;
            const newX = crocodilePosition.x + Math.cos(angle) * speed;
            const newY = crocodilePosition.y + Math.sin(angle) * speed;
            setCrocodilePosition({ x: newX, y: newY });

            if (Math.hypot(dx, dy) < 20) {
                setIsGameOver(true);
                onGameOver(timer.toFixed(1));
            }
        };

        if (!isGameOver) {
            const interval = setInterval(moveCrocodile, 20);
            return () => clearInterval(interval);
        }
    }, [mousePosition, crocodilePosition, isGameOver, timer, onGameOver]);

    return (
        <div id="game-area" className="game-area">
            {!isGameOver && <Crocodile position={crocodilePosition} />}
            {!isGameOver && <Mouse position={mousePosition} />}
            {isGameOver && <div className="game-over">Съел! Время: {timer.toFixed(1)} сек</div>}
        </div>
    );
}

export default Game;
