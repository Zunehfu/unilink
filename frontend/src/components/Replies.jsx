import React from "react";
import ReplyCard from "./ReplyCard";

export default function Replies({ replies }) {
    console.log(replies);
    return (
        <div className="rounded-lg backdrop-blur-md bg-green-200 w-96 max-h-96 overflow-y-scroll grid justify-center">
            {replies.map((item) => (
                <ReplyCard item={item} key={item._id} />
            ))}
        </div>
    );
}
