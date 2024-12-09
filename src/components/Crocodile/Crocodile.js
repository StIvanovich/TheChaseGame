import React from "react";
import "./Crocodile.css";

function Crocodile({ position, angle }) {
    const style = {
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `rotate(${angle}deg)`,
    };

    return (
        <div className="crocodile" style={style}>
            <img src={require("../../materials/video/croc.gif")} alt="Crocodile" className="crocodile-img" />
        </div>
    );
}

export default Crocodile;
