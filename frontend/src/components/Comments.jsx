import CommentCard from "./CommentCard";

export default function Comments({ comments, commentsVisibility }) {
    return (
        <div
            style={{
                transition: "max-height 0.5s",
                maxHeight: `${commentsVisibility ? 384 : 0}px`,
            }}
            className="rounded-lg backdrop-blur-md bg-lime-100 w-96 overflow-y-scroll grid justify-center"
        >
            {comments.map((item) => (
                <CommentCard commentData={item} key={item.comment_id} />
            ))}
        </div>
    );
}
