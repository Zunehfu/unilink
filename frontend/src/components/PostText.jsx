import PostDetails from "./PostDetails";
import PostStats from "./PostStats";
import PostContent from "./PostContent";
import Replies from "./Replies";
import { useState } from "react";

export default function PostText({ postData, navigate }) {
    const [replies, setReplies] = useState(postData.replies);
    return (
        <>
            <div className="border-2 w-96 m-2 border-green-200 rounded">
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
                    navigate={navigate}
                />
            </div>
            <Replies replies={replies} />
        </>
    );
}
