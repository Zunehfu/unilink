import React from "react";

export default function ProfileItem({ field, value }) {
    function handleEdit(field) {}

    return (
        <>
            <small>{field}</small>
            <div className="relative">
                {value}
                <i
                    onClick={() => handleEdit(field)}
                    className="absolute right-0 bottom-1 scale-75 fa-regular fa-pen-to-square transition-all hover:scale-100 cursor-pointer"
                ></i>
            </div>
            <hr />
        </>
    );
}
