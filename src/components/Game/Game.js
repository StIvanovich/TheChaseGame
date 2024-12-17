import React, { useState, useEffect } from "react";
import Crocodile from "../Crocodile/Crocodile";
import Mouse from "../Mouse/Mouse";
import "./Game.css";

function Game({ onGameOver }) {
    const [crocodilePosition, setCrocodilePosition] = useState({ x: 500, y: 500 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, vector: "left" });
    const [isGameOver, setIsGameOver] = useState(false);
    const [timer, setTimer] = useState(0);
    const [crocodileAngle, setCrocodileAngle] = useState(0);
    const [speed, setSpeed] = useState(2);
    const [lustPosition, setLustPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        let interval;
        if (!isGameOver) {
            interval = setInterval(() => {
                setTimer((prev) => prev + 0.1);
                setSpeed((prevSpeed) => prevSpeed + 0.01);
            }, 100);
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
                if (Math.abs(e.clientX - lustPosition.x) > Math.abs(e.clientY - lustPosition.y)) {
                    if (e.clientX < lustPosition.x) setMousePosition({ x: e.clientX - gameArea.left, y: e.clientY - gameArea.top, vector: "left" });
                    else setMousePosition({ x: e.clientX - gameArea.left, y: e.clientY - gameArea.top, vector: "right" });
                } else {
                    if (e.clientY < lustPosition.y) setMousePosition({ x: e.clientX - gameArea.left, y: e.clientY - gameArea.top, vector: "up" });
                    else setMousePosition({ x: e.clientX - gameArea.left, y: e.clientY - gameArea.top, vector: "down" });
                }
            }
            setLustPosition({ x: e.clientX, y: e.clientY });
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
            const angle = Math.atan2(dy, dx) * (180 / Math.PI); // Новый угол в градусах

            // Рассчитываем плавный переход между текущим и новым углом
            let angleDifference = angle - crocodileAngle;

            // Применяем минимальный путь поворота
            if (angleDifference > 180) angleDifference -= 360;
            if (angleDifference < -180) angleDifference += 360;

            const newCrocodileAngle = crocodileAngle + angleDifference;

            setCrocodileAngle(newCrocodileAngle); // Обновляем угол

            // Используем состояние скорости (speed), которое изменяется со временем
            const newX = crocodilePosition.x + Math.cos(angle * (Math.PI / 180)) * speed;
            const newY = crocodilePosition.y + Math.sin(angle * (Math.PI / 180)) * speed;
            setCrocodilePosition({ x: newX, y: newY });

            if (Math.hypot(dx, dy) < 20) {
                setIsGameOver(true);
                onGameOver(timer.toFixed(1));
            }
        };

        if (!isGameOver) {
            const interval = setInterval(moveCrocodile, 5);
            return () => clearInterval(interval);
        }
    }, [mousePosition, crocodilePosition, isGameOver, timer, onGameOver, crocodileAngle, speed]);

    return (
        <div id="game-area" className="game-area">
            {!isGameOver && <Crocodile position={crocodilePosition} angle={crocodileAngle} />}
            {!isGameOver && <Mouse position={mousePosition} />}
            {!isGameOver && <div className="timer">Время: {timer.toFixed(1)} сек</div>}
            {isGameOver && <div className="game-over">Съеден заживо! Время: {timer.toFixed(1)} сек</div>}
        </div>
    );
}

export default Game;
