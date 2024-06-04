import React, { useState } from "react";

export default function PostDescription() {
    const [height, setHeight] = useState(36);
    const [toggle, setToggle] = useState(false); // Initial toggle state

    const handleClick = () => {
        if (toggle) {
            setHeight(36);
        } else {
            setHeight(200);
        }
        setToggle(!toggle);
    };

    return (
        <div
            className="leading-4 size"
            style={{
                transition: "height 0.5s",
                height: `${height}px`,
                backgroundColor: "lightblue",
            }}
        >
            <small>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                minima <button onClick={handleClick}>lol</button>
            </small>
        </div>
    );
}
