import { useContext, useState } from "react";
import { TabContext } from "../contexts/TabContext";
import { usePfetch } from "../hooks/usePfetch";
import SmallSpinner from "./laoders/SmallSpinner";
import Editor from "./editor/Editor";

import Err from "../utils/errClass";
import { toast } from "sonner";

export default function AddPostPage() {
    const { setTab } = useContext(TabContext);
    const pfetch = usePfetch();

    const [editorState, setEditorState] = useState();
    const [hideme, setHideme] = useState(false);
    const [visibility, setVisibility] = useState(0);
    const [loading, setLoading] = useState(false);

    async function handleSubmission() {
        try {
            await pfetch("/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: JSON.stringify(editorState),
                    hideme,
                    visibility,
                }),
            });
        } catch (err) {
            if (!(err instanceof Err)) {
                console.error(err.message);
                toast.error("Unexpected error occured");
            }
        } finally {
            setHideme(false);
            setVisibility(0);
            setLoading(false);
        }
    }

    function handleClick() {
        if (!loading) {
            setLoading(true);
            handleSubmission();
        }
    }

    function onEditorStateChanged(editorState) {
        setEditorState(editorState);
    }

    return (
        <div className="text-white fixed top-0 left-0 w-full h-full flex items-center justify-center ">
            <div className=" rounded-xl w-[400px] bg-dark p-4 ">
                <label htmlFor="yo">What do you have in your mind?</label>
                <i
                    onClick={() => setTab(0)}
                    className="fa-solid fa-xmark relative left-[130px] top-[-10px] cursor-pointer hover:text-emerald-500"
                ></i>
                <br />
                <br />
                <div>Wanna express freely?</div>
                <label htmlFor="hideme">Hide me </label>
                {/* <input
                    type="checkbox"
                    id="hideme"
                    checked={hideme}
                    onChange={() => !loading && setHideme(!hideme)}
                /> */}
                <Editor topLevelEditorStateAccess={onEditorStateChanged} />
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
                {/* <button
                    className="mt-2 rounded-xl bg-sky-500 w-20 h-8 flex justify-center items-center"
                    onClick={() => {
                        if (!loading) {
                            setLoading(true);
                            handleSubmission();
                        }
                    }}
                >
                    {loading ? <SmallSpinner /> : <span>Share</span>}
                </button> */}
                <button
                    className="mt-2 rounded-xl bg-sky-500 w-20 h-8 flex justify-center items-center"
                    onClick={handleClick}
                >
                    {loading ? <SmallSpinner /> : <span>Share</span>}
                </button>
            </div>
        </div>
    );
}
