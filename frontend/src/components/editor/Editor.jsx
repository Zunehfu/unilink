import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

//for debugging purpose
import { TreeViewPlugin } from "./plugins/TreeViewPlugin";

//custom plugins and nodes
import { MentionPlugin } from "./plugins/MentionPlugin";
import { MentionNode } from "./nodes/MentionNode";

const theme = {
    // Define your theme here (optional).
};

const initialConfig = {
    theme,
    onError(error) {
        console.error("Editor Error:", error);
    },
    nodes: [MentionNode],
};

export default function Editor({ topLevelEditorStateAccess }) {
    return (
        <LexicalComposer initialConfig={initialConfig}>
            <RichTextPlugin
                contentEditable={<ContentEditable className="text-white" />}
                placeholder={<div>Enter some text...</div>}
                ErrorBoundary={LexicalErrorBoundary}
            />
            <AutoFocusPlugin />
            <TreeViewPlugin />
            <MentionPlugin />
            <OnChangePlugin onChange={topLevelEditorStateAccess} />
        </LexicalComposer>
    );
}
