import React from "react";
import moment from "moment";
import EditorReadOnly from "./editor_component/EditorReadOnly";

export default function ShoutItem({ shout }) {
    return (
        <div className="flex justify-between rounded-md bg-dark2 hover:bg-dark">
            <div className="flex items-center w-full">
                <div className="leading-5 p-2 text-white">
                    <EditorReadOnly initialEditorState={shout.content} />
                </div>
            </div>
            <div className="font-semibold w-40 flex items-center justify-center text-emerald-500">
                {moment(shout.created_at).format("D/M/YYYY")}
            </div>
        </div>
    );
}
