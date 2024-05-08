import React, { useState } from "react";

export default function PostDescription() {
    const [height, setHeight] = useState(36); // Initial height value
    const [toggle, setToggle] = useState(false); // Initial toggle state

    const handleClick = () => {
        // Toggle between two height values based on the toggle state
        if (toggle) {
            setHeight(36); // Revert back to the original height
        } else {
            setHeight(200); // Increase the height
        }
        // Toggle the boolean state
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
