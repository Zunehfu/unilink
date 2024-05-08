import PostDetails from "./PostDetails";
import PostStats from "./PostStats";
import PostContent from "./PostContent";

export default function PostText() {
    return (
        <div className="border-2 w-96 m-2 border-green-200 rounded">
            <PostContent />
            <hr />
            <PostDetails />
            <PostStats />
        </div>
    );
}
