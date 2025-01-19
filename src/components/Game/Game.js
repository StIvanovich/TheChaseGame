import React, { useState, useEffect, useCallback } from "react";
import Crocodile from "../Crocodile/Crocodile";
import Mouse from "../Mouse/Mouse";
import "./Game.css";
import StartTimer from "../StartTimer/StartTimer";

function Game({ onGameOver }) {
    const [crocodilePosition, setCrocodilePosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 3 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, vector: "left" });
    const [isGameOver, setIsGameOver] = useState(false);
    const [timer, setTimer] = useState(0);
    const [crocodileAngle, setCrocodileAngle] = useState(0);
    const [speed, setSpeed] = useState(Math.min(window.innerWidth / 1000, window.innerHeight / 100));
    const [lustPosition, setLustPosition] = useState({ x: 0, y: 0 });

    const [isGameStarted, setIsGameStarted] = useState(false);

    useEffect(() => {
        let interval;
        if (!isGameOver) {
            interval = setInterval(() => {
                if (!isGameStarted) return;

                setTimer((prev) => prev + 0.1);
                setSpeed((prevSpeed) => prevSpeed + Math.min(prevSpeed * 0.005, window.innerWidth / 1000));
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isGameOver, isGameStarted]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const gameArea = document.getElementById("game-area").getBoundingClientRect();
            if (
                (e.clientX < gameArea.left ||
                    e.clientX > gameArea.right ||
                    e.clientY < gameArea.top ||
                    e.clientY > gameArea.bottom) &&
                isGameStarted
            ) {
                setIsGameOver(true);
                onGameOver(timer.toFixed(1));
            } else {
                if (Math.abs(e.clientX - lustPosition.x) > Math.abs(e.clientY - lustPosition.y)) {
                    if (e.clientX < lustPosition.x)
                        setMousePosition({ x: e.clientX - gameArea.left, y: e.clientY - gameArea.top, vector: "left" });
                    else
                        setMousePosition({
                            x: e.clientX - gameArea.left,
                            y: e.clientY - gameArea.top,
                            vector: "right",
                        });
                } else {
                    if (e.clientY < lustPosition.y)
                        setMousePosition({ x: e.clientX - gameArea.left, y: e.clientY - gameArea.top, vector: "up" });
                    else
                        setMousePosition({ x: e.clientX - gameArea.left, y: e.clientY - gameArea.top, vector: "down" });
                }
            }
            setLustPosition({ x: e.clientX, y: e.clientY });
        };

        // Слушатель для mousemove (для ПК)
        if (!isGameOver) {
            window.addEventListener("mousemove", handleMouseMove);
        }

        // Слушатель для touchmove (для мобильных устройств)
        const handleTouchMove = (e) => {
            if (!isGameStarted) return;

            const touch = e.touches[0]; // Получаем первый палец
            const gameArea = document.getElementById("game-area").getBoundingClientRect();
            if (
                touch.pageX < gameArea.left ||
                touch.pageX > gameArea.right ||
                touch.pageY < gameArea.top ||
                touch.pageY > gameArea.bottom
            ) {
                setIsGameOver(true);
                onGameOver(timer.toFixed(1));
            } else {
                if (Math.abs(touch.pageX - lustPosition.x) > Math.abs(touch.pageY - lustPosition.y)) {
                    if (touch.pageX < lustPosition.x)
                        setMousePosition({
                            x: touch.pageX - gameArea.left,
                            y: touch.pageY - gameArea.top,
                            vector: "left",
                        });
                    else
                        setMousePosition({
                            x: touch.pageX - gameArea.left,
                            y: touch.pageY - gameArea.top,
                            vector: "right",
                        });
                } else {
                    if (touch.pageY < lustPosition.y)
                        setMousePosition({
                            x: touch.pageX - gameArea.left,
                            y: touch.pageY - gameArea.top,
                            vector: "up",
                        });
                    else
                        setMousePosition({
                            x: touch.pageX - gameArea.left,
                            y: touch.pageY - gameArea.top,
                            vector: "down",
                        });
                }
            }
            setLustPosition({ x: touch.pageX, y: touch.pageY });
        };

        if (!isGameOver) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("touchmove", handleTouchMove);
        }

        // Очистка после размонтирования компонента
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, [isGameOver, timer, onGameOver, lustPosition, isGameStarted]);

    useEffect(() => {
        if (!isGameStarted) return;

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
            // const newX = crocodilePosition.x * speed;
            // const newY = crocodilePosition.y * speed;
            setCrocodilePosition({ x: newX, y: newY });

            const distance = Math.hypot(dx, dy);
            const threshold = Math.min(window.innerWidth, window.innerHeight) * 0.02; // 2% of the smaller dimension
            if (distance < threshold) {
                setIsGameOver(true);
                onGameOver(timer.toFixed(1));
            }
        };

        if (!isGameOver) {
            const interval = setInterval(moveCrocodile, 5);
            return () => clearInterval(interval);
        }
    }, [mousePosition, crocodilePosition, isGameOver, timer, onGameOver, crocodileAngle, speed, isGameStarted]);

    const handleTimerEnd = useCallback(() => {
        setIsGameStarted(true);
    }, []);

    return (
        <div id="game-area" className="game-area">
            {!isGameOver && <Crocodile position={crocodilePosition} angle={crocodileAngle} />}
            {!isGameOver && <Mouse position={mousePosition} />}
            {!isGameOver && <div className="timer">Время: {timer.toFixed(1)} сек</div>}
            {isGameOver && <div className="game-over">Съеден заживо! Время: {timer.toFixed(1)} сек</div>}
            <StartTimer onTimerEnd={handleTimerEnd} />
        </div>
    );
}

export default Game;
