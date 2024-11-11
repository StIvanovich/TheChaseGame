import React from "react";
import "./Mouse.css";

function Mouse({ position }) {
    const style = {
        left: `${position.x}px`,
        top: `${position.y}px`,
    };

    return <div className="mouse" style={style}></div>;
}

export default Mouse;
