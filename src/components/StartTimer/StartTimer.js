import React, { useState, useEffect, memo } from "react";
import "./StartTimer.css";

const StartTimer = memo(({ onTimerEnd }) => {
    const [count, setCount] = useState(3);
    const [text, setText] = useState("3");
    const [fade, setFade] = useState(false);

    useEffect(() => {
        if (count <= 0) {
            setText("Go");
            setFade(true);
            setTimeout(() => {
                onTimerEnd();
            }, 800);
            return;
        } else {
            setText(String(count));
            setFade(false);
        }

        const timer = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount <= 0) {
                    return -1;
                }
                return prevCount - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [count, onTimerEnd]);

    return (
        <div className={`timer-container ${fade ? "fade-out" : ""}`}>
            <span className="timer-text">{text}</span>
        </div>
    );
});

export default StartTimer;
