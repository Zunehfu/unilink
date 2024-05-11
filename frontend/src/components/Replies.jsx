import React from "react";

export default function Replies({ replies }) {
    console.log(replies);
    return (
        <div className="rounded-lg backdrop-blur-md bg-green-200 w-96 max-h-96 overflow-y-scroll grid justify-center">
            {replies.map((item) => (
                <div className="rounded-xl p-1 bg-gray-700 mt-1 mb-1 w-[360px] h-fit">
                    <small className="text-white">{item.postedBy}</small>
                    <br />
                    {item.content}
                </div>
            ))}
        </div>
    );
}
