import { RotatingLines } from "react-loader-spinner";
import CommentCard from "./CommentCard";

export default function Comments({ comments, commentsVisibility }) {
    return (
        <>
            <div
                style={{
                    display: `${commentsVisibility ? "flex" : "none"}`,
                }}
                className="rounded-[22px] relative mt-3.5 py-2.5 bg-dark"
            >
                <div className=" absolute flex justify-center w-full -top-[43px]">
                    <span className="h-[22px] border-[22px] border-transparent border-b-dark"></span>
                </div>
                <div className="px-2.5 max-h-96 w-96 flex flex-col items-center justify-around gap-2.5 overflow-y-scroll">
                    {comments.map((item) => (
                        <CommentCard commentData={item} key={item.comment_id} />
                    ))}
                    <div className="flex items-center">
                        <button className="text-green-200 text-xs hover:underline">
                            show $ more comments
                        </button>
                        <div className=" ml-1 h-2 w-2">
                            <RotatingLines
                                visible={true}
                                height="10"
                                width="10"
                                strokeColor="#fff"
                                strokeWidth="3"
                                animationDuration="0.75"
                                ariaLabel="rotating-lines-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
