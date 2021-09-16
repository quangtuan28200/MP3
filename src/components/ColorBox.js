import React from 'react'
import { useState } from 'react/cjs/react.development';
import "../scss/colorbox.scss"

function getColorRandom() {
    const COLORS = ['deeppink', 'green', 'black', 'yellow', 'blue'];
    const COLOR_INDEX = Math.trunc(Math.random() * COLORS.length);
    return COLORS[COLOR_INDEX];
}

export default function ColorBox() {
    const [changeColor, setChangeColor] = useState(() => {
        const color = localStorage.getItem("color-box") || "deeppink";
        return color;
    });

    const onChangeColor = () => {
        const colorNew = getColorRandom();
        setChangeColor(colorNew)
        localStorage.setItem("color-box", colorNew);
    }
    console.log(changeColor);

    return (
        <button
            className="color_box"
            onClick={onChangeColor}
            style={{ backgroundColor: changeColor }}>
            Click to change color
        </button>
    )
}
