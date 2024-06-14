import { RotatingLines } from "react-loader-spinner";
import CommentCard from "./CommentCard";
import { useEffect, useState } from "react";
import { usePfetch } from "../hooks/usePfetch";
import Err from "../utils/errClass";
import { toast } from "sonner";

export default function Comments({
    comments,
    setComments,
    comment_count,
    post_id,
}) {
    const [loading, setLoading] = useState(false);
    const pfetch = usePfetch();

    async function fetchComments() {
        try {
            const data = await pfetch(
                "/posts/" + post_id + "/comments?from=" + comments.length,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setComments([...comments, ...data]);
            console.log(data);
        } catch (err) {
            if (!(err instanceof Err)) {
                console.error(err);
                toast.error("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (comments.length == 0) {
            setLoading(true);
            fetchComments();
        }
    }, []);

    return (
        <>
            <div className="flex rounded-[22px] relative mt-3.5 py-2.5 bg-dark">
                <div className=" absolute flex justify-center w-full -top-[43px]">
                    <span className="h-[22px] border-[22px] border-transparent border-b-dark"></span>
                </div>
                <div className="px-2.5 max-h-96 w-96 flex flex-col items-center justify-around gap-2.5 overflow-y-scroll transition-all">
                    {comments.map((item) => (
                        <CommentCard commentData={item} key={item.comment_id} />
                    ))}
                    <div className="flex items-center">
                        {loading && (
                            <div className=" ml-1 h-3 w-2">
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
                        )}
                        {!loading && comment_count - comments.length > 0 && (
                            <button
                                onClick={() => {
                                    setLoading(true);
                                    fetchComments();
                                }}
                                className="text-emerald-500 text-xs hover:underline underline-offset-2"
                            >
                                show {comment_count - comments.length} more
                                comments
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
