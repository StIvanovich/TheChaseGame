import React, { useState } from "react";
import "./Mouse.css";
import "../../materials/video/animVL.gif";
function Mouse({ position }) {
    let a = require("../../materials/video/animVL.gif");
    const style = {
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
    };
    switch (position.vector) {
        case "left":
            a = require("../../materials/video/animVL.gif");
            break;
        case "right":
            a = require("../../materials/video/animVP.gif");
            break;
        case "up":
            a = require("../../materials/video/animVV.gif");
            break;
        case "down":
            a = require("../../materials/video/animVN.gif");
            break;
    }
    console.log(a);
    return <img style={style} src={a}></img>;
}

export default Mouse;
