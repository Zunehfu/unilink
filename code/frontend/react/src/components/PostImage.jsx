import PostDetails from "./PostDetails";
import PostPicture from "./PostPicture";
import PostStats from "./PostStats";
import PostDescription from "./PostDescription";

export default function PostImage() {
    return (
        <div className="border-2 w-96 m-2 border-green-200 rounded">
            <PostPicture />
            <hr />
            <PostDetails />
            <PostDescription />
            <PostStats />
        </div>
    );
}
