import React from "react";

export default function CommentCard({ commentData }) {
    return (
        <div className="leading-4 text-sm rounded-xl p-1 bg-green-50 mt-1 mb-1 w-[360px] h-fit break-words">
            <small className="text-blue-800">{commentData.user_id}</small>
            <br />
            {commentData.content}
        </div>
    );
}
