import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
//plugins and nodes
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { LexicalAutoLinkPlugin } from "./plugins/AutoLinkPlugin";
import { MentionPlugin } from "./plugins/MentionPlugin";
// import { FocusCheckerPlugin } from "./plugins/FocusCheckerPlugin";

import { AutoLinkNode, LinkNode } from "@lexical/link";
import { MentionNode } from "./nodes/MentionNode";
//config
import { theme } from "./theme/themeConfig";

// import { CodeNode } from "@lexical/code";
// import { ListNode, ListItemNode } from "@lexical/list";
// import { HeadingNode, QuoteNode } from "@lexical/rich-text";
// import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";

export default function Editor({
    topLevelEditorStateAccess,
    placeholder,
    placeholderClassName,
    className,
}) {
    const initialConfig = {
        theme,
        onError(error) {
            console.error("Editor Error:", error);
        },
        nodes: [MentionNode, AutoLinkNode, LinkNode],
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
                <LinkPlugin />
            </LexicalComposer>
        </div>
    );
}
