import EditorReadOnly from "./editor/EditorReadOnly";

export default function PostContent({ content }) {
    /* linespace = golden ratio * fontsize */
    return (
        <div className="font-light text-[15px] leading-[26px] border-y-[1px] border-gray-400 p-1 pb-2">
            <EditorReadOnly initialEditorState={content} />
        </div>
    );
}
