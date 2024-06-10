import React from "react";
import EditorReadOnly from "./editor_component/EditorReadOnly";

export default function PostContent({ content }) {
    return (
        <div className="border-y-[1px] border-gray-400 p-1 pb-2 font-light leading-5">
            <EditorReadOnly initialEditorState={content} />
        </div>
    );
}
