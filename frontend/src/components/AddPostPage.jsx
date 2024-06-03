import { useContext, useEffect, useState, useRef } from "react";
import { TabContext } from "../contexts/TabContext";
import { usePfetch } from "../hooks/usePfetch";
import SmallSpinner from "./SmallSpinner";
import Err from "../utils/errClass";
import { toast } from "sonner";
import { MentionContext } from "../contexts/MentionContext";
import { Editor, EditorState, ContentState, convertFromHTML } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

function findWordAtIndex(str, i) {
    if (i < 0 || i >= str.length) return null;

    let s = i;
    let e = i;

    while (s >= 0 && !/\s/.test(str[s])) s--;
    while (e < str.length && !/\s/.test(str[e])) e++;

    return str.slice(s + 1, e);
}
function wrapAndReplaceWordAtIndex(text1, text2, index, replacementWord) {
    // Find the word and its positions at the specified index in text1
    const { word, startPos, endPos } = findWordAtIndex(text1, index);
    if (!word) return text2;

    // Create the replacement word wrapped in <u> tags
    const wrappedWord = `<u>${replacementWord}</u>`;

    // Escape special characters in the word to replace for use in regex
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // Create a regex to match the exact word in text2
    const regex = new RegExp(`(${escapedWord})`);

    // Replace the exact occurrence in text2 with the wrapped replacement word
    return text2.replace(regex, wrappedWord);
}
export default function AddPostPage() {
    const { mentionStatus, setMentionStatus, setMention, mention } =
        useContext(MentionContext);
    const { setTab } = useContext(TabContext);
    const pfetch = usePfetch();

    const latestContent = useRef(null);
    const latestMentionStatus = useRef(mentionStatus);
    const latestCaretPos = useRef(null);

    const [content, setContent] = useState("");
    const [hideme, setHideme] = useState(false);
    const [visibility, setVisibility] = useState(0);
    const [loading, setLoading] = useState(false);

    const [editorState, setEditorState] = useState(() => {
        const html = "@ d <u>@bold</u>";
        const blocksFromHTML = convertFromHTML(html);
        const contentState = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        );
        return EditorState.createWithContent(contentState);
    });

    const handleEditorChange = (newState) => {
        setEditorState(newState);
        latestContent.current = newState.getCurrentContent();
        const content = latestContent.current.getPlainText();
        if (!content) return;
        const offset = newState.getSelection().getStartOffset();
        const currentWord = findWordAtIndex(content, offset - 1) || "";

        if (currentWord.startsWith("@")) {
            if (latestMentionStatus.current != -1) {
                setMentionStatus(-1);
                latestCaretPos.current = offset;
            }
            const search = currentWord.substring(1);
            setMention(search);
        } else if (latestMentionStatus.current != null) setMentionStatus(null);
    };

    async function handleSubmission() {
        try {
            await pfetch("/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content, hideme, visibility }),
            });
        } catch (err) {
            if (!(err instanceof Err)) {
                console.error(err.message);
                toast.error("Unexpected error occured");
            }
        } finally {
            setContent("");
            setHideme(false);
            setVisibility(0);
            setLoading(false);
        }
    }

    useEffect(() => {
        latestMentionStatus.current = mentionStatus;
        console.log({ mentionStatus });
        if (mentionStatus && mentionStatus != -1) {
            const newhtml = wrapAndReplaceWordAtIndex(
                latestContent.current.getPlainText(),
                stateToHTML(latestContent.current),
                latestCaretPos.current - 1,
                mentionStatus.username
            );
            console.log(newhtml);
            setMentionStatus(null);
        }
    }, [mentionStatus]);

    useEffect(() => {
        return () => {
            setMentionStatus(null);
        };
    }, []);

    return (
        <div className="text-white fixed top-0 left-0 w-full h-full flex items-center justify-center ">
            <div className=" rounded-xl w-[400px] bg-dark p-4 ">
                <label htmlFor="yo">What do you have in your mind?</label>
                <i
                    onClick={() => setTab(0)}
                    className="fa-solid fa-xmark relative left-[130px] top-[-10px] cursor-pointer hover:text-emerald-500"
                ></i>
                <br />
                <div className="text-black bg-white max-h-48 overflow-scroll rounded-lg">
                    <Editor
                        editorState={editorState}
                        onChange={handleEditorChange}
                    />
                </div>
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
                    className="mt-2 rounded-xl bg-sky-500 w-20 h-8 flex justify-center items-center"
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
