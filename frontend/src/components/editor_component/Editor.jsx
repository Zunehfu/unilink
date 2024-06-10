import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
//custom plugins and nodes
import { MentionPlugin } from "./plugins/MentionPlugin";
import { MentionNode } from "./nodes/MentionNode";
import LexicalAutoLinkPlugin from "./plugins/AutoLinkPlugin";

// import { CodeNode } from "@lexical/code";
// import { LinkNode } from "@lexical/link";
import { AutoLinkNode } from "@lexical/link";
// import { ListNode, ListItemNode } from "@lexical/list";
// import { HeadingNode, QuoteNode } from "@lexical/rich-text";
// import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";

export default function Editor({
    topLevelEditorStateAccess,
    placeholder,
    placeholderClassName,
    className,
}) {
    const theme = {
        // Define theme
    };

    const initialConfig = {
        theme,
        onError(error) {
            console.error("Editor Error:", error);
        },
        nodes: [MentionNode, AutoLinkNode],
    };

    return (
        <div className="relative">
            <LexicalComposer initialConfig={initialConfig}>
                <RichTextPlugin
                    contentEditable={<ContentEditable className={className} />}
                    placeholder={
                        <div className={placeholderClassName}>
                            {placeholder}
                        </div>
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <MentionPlugin />
                <OnChangePlugin onChange={topLevelEditorStateAccess} />
                <LexicalAutoLinkPlugin />
            </LexicalComposer>
        </div>
    );
}
