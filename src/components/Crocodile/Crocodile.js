import React from "react";
import "./Crocodile.css";

function Crocodile({ position }) {
    const style = {
        left: `${position.x}px`,
        top: `${position.y}px`,
    };

    return <div className="crocodile" style={style}></div>;
}

export default Crocodile;
