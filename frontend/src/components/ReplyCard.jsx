import React from "react";

export default function ReplyCard({ item }) {
    return (
        <div className="rounded-xl p-1 bg-gray-700 mt-1 mb-1 w-[360px] h-fit">
            <small className="text-white">{item.postedBy}</small>
            <br />
            {item.content}
        </div>
    );
}
