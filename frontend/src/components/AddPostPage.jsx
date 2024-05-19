import { useState } from "react";
import SmallSpinner from "./SmallSpinner";
import pfetch from "../utils/pfetch";
import { useNavigate } from "react-router-dom";

export default function AddPostPage({
    toggleAddPostVisibility,
    setPosts,
    posts,
}) {
    const [content, setContent] = useState("");
    const [hideme, setHideme] = useState(false);
    const [visibility, setVisibility] = useState(0);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmission() {
        try {
            const res = await pfetch("/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content, hideme, visibility }),
            });

            if (!res.ok) {
                throw new Error("Request failed");
            }

            const response = await res.json();
            console.log("Response data:", response);

            if (response.data.hasOwnProperty("auth"))
                return navigate("/signin");
            setPosts([...posts, response.data]);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setContent("");
            setHideme(false);
            setVisibility(0);
            setLoading(false);
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm">
            <div className="rounded-lg w-[400px] bg-gray-300 p-4 ">
                <label htmlFor="yo">What do you have in your mind?</label>
                <i
                    onClick={toggleAddPostVisibility}
                    className="fa-solid fa-xmark relative left-[130px] top-[-10px] cursor-pointer hover:text-green-500"
                ></i>
                <br />
                <textarea
                    className="rounded-lg  resize-none w-full h-60 p-2"
                    value={content}
                    onChange={(e) => !loading && setContent(e.target.value)}
                ></textarea>
                <br />
                <div>Wanna express freely?</div>
                <label htmlFor="hideme">Hide me </label>
                <input
                    type="checkbox"
                    id="hideme"
                    checked={hideme}
                    onChange={() => !loading && setHideme(!hideme)}
                />
                <br />
                <br />
                <div>Choose people that you wanna share with...</div>
                <input
                    type="radio"
                    id="option1"
                    name="options"
                    value="0"
                    checked={visibility === 0}
                    onChange={() => !loading && setVisibility(0)}
                />
                <label htmlFor="option1">Share with everyone</label> <br />
                <input
                    type="radio"
                    id="option2"
                    name="options"
                    checked={visibility === 1}
                    onChange={() => !loading && setVisibility(1)}
                />
                <label htmlFor="option2">
                    Share with others from your university
                </label>
                <br />
                <input
                    type="radio"
                    id="option3"
                    name="options"
                    checked={visibility === 2}
                    onChange={() => !loading && setVisibility(2)}
                />
                <label htmlFor="option3">Share with friends</label> <br />
                <input
                    type="radio"
                    id="option4"
                    name="options"
                    checked={visibility === 3}
                    onChange={() => !loading && setVisibility(3)}
                />
                <label htmlFor="option4">
                    Share with friends from your university
                </label>
                <br />
                <button
                    className="rounded-xl bg-green-300 w-20 h-8 flex justify-center items-center"
                    onClick={() => {
                        if (!loading) {
                            setLoading(true);
                            handleSubmission();
                        }
                    }}
                >
                    {loading ? <SmallSpinner /> : <span>Share</span>}
                </button>
            </div>
        </div>
    );
}
