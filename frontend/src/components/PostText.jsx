import PostDetails from "./PostDetails";
import PostStats from "./PostStats";
import PostContent from "./PostContent";
import Replies from "./Replies";
import { useState } from "react";

export default function PostText({ postData }) {
    const [replies, setReplies] = useState(postData.replies);
    const [replyVisibility, setReplyVisibility] = useState(false);

    function toggleReplyVisibility() {
        setReplyVisibility(!replyVisibility);
    }

    return (
        <>
            <div className="border-2 w-96 m-2 rounded">
                <PostContent content={postData.content} />
                <hr />
                <PostDetails
                    postedBy={postData.postedBy}
                    timestamp={postData.timestamp}
                />
                <PostStats
                    postId={postData._id}
                    replies={replies}
                    setReplies={setReplies}
                    toggleReplyVisibility={toggleReplyVisibility}
                />
            </div>
            <Replies
                replies={replies}
                replyVisibility={replyVisibility}
                toggleReplyVisibility={toggleReplyVisibility}
            />
        </>
    );
}
