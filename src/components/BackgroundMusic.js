import React, { useEffect } from "react";
import musicFile from "../materials/music/KaifBack.mp3"; // Убедитесь, что у вас есть файл музыки

function BackgroundMusic({ isPlaying }) {
    useEffect(() => {
        const audio = document.getElementById("background-music");

        if (isPlaying) {
            audio.play();
        } else {
            audio.pause();
            audio.currentTime = 0; // Сбросить музыку в начало
        }

        return () => {
            audio.pause();
        };
    }, [isPlaying]);

    return (
        <audio id="background-music" loop>
            <source src={musicFile} type="audio/mp3" />
            Ваш браузер не поддерживает аудио.
        </audio>
    );
}

export default BackgroundMusic;
