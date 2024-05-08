import React from "react";

export default function AddPost({ toggleAddPostVisibility }) {
    return (
        <div
            onClick={toggleAddPostVisibility}
            className="left-full rounded-tl-lg rounded-bl-lg grid sticky top-1/2 w-16 p-2 pt-1 bg-green-200 text-3xl text-left font-bold text-white cursor-pointer"
        >
            +
        </div>
    );
}
