import PostDetails from "./PostDetails";
import PostStats from "./PostStats";
import PostContent from "./PostContent";
import Replies from "./Replies";

export default function PostText({ postData }) {
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
                    replies={postData.replies.length}
                    postId={postData._id}
                />
            </div>
            <Replies replies={postData.replies} />
        </>
    );
}
