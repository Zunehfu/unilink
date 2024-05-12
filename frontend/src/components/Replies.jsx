import React, { useEffect } from "react";
import ReplyCard from "./ReplyCard";

export default function Replies({ replies, replyVisibility }) {
    return (
        <div
            style={{
                transition: "max-height 0.5s",
                maxHeight: `${replyVisibility ? 384 : 0}px`,
            }}
            className="rounded-lg backdrop-blur-md bg-lime-100 w-96 overflow-y-scroll grid justify-center"
        >
            {replies.map((item) => (
                <ReplyCard item={item} key={item._id} />
            ))}
        </div>
    );
}
