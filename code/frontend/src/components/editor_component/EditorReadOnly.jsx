import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { NodeEventPlugin } from "@lexical/react/LexicalNodeEventPlugin";
//custom plugins and nodes
import { MentionNode } from "./nodes/MentionNode";
import { $getNodeByKey } from "lexical";
import { useProfile } from "../../hooks/useProfile";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { theme } from "./theme/themeConfig";

export default function EditorReadOnly({ initialEditorState }) {
    const setProfile = useProfile();

    const initialConfig = {
        theme,
        onError(error) {
            console.error("Editor Error:", error);
        },
        nodes: [MentionNode, AutoLinkNode, LinkNode],
        editable: false,
        editorState: initialEditorState,
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <RichTextPlugin
                contentEditable={<ContentEditable className="text-white" />}
                ErrorBoundary={LexicalErrorBoundary}
            />
            <NodeEventPlugin
                nodeType={MentionNode}
                eventType={"click"}
                eventListener={(event, editor, nodeKey) => {
                    const node = $getNodeByKey(nodeKey);
                    setProfile(node.__user_id);
                }}
            />
        </LexicalComposer>
    );
}
