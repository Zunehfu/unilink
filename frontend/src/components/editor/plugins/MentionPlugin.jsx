import { useContext, useEffect, useRef } from "react";
import { MentionContext } from "../../../contexts/MentionContext";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $insertNodes, TextNode } from "lexical";
import { $createMentionNode } from "../nodes/MentionNode";

function findWordAtIndex(str, i) {
    if (i < 0 || i >= str.length) return { word: null, startingIndex: null };

    let s = i;
    let e = i;

    while (s >= 0 && !/\s/.test(str[s])) s--;
    while (e < str.length && !/\s/.test(str[e])) e++;

    let word = str.slice(s + 1, e);
    let startingIndex = s + 1;

    return { word, startingIndex };
}

export function MentionPlugin() {
    const { mentionStatus, setMentionStatus, setMention } =
        useContext(MentionContext);

    const [editor] = useLexicalComposerContext();
    const currentNode = useRef(null);
    const offsetRef = useRef(null);
    const mentionStatusRef = useRef(mentionStatus);
    const mentionTerm = useRef(null);

    useEffect(() => {
        mentionStatusRef.current = mentionStatus;
        if (mentionStatus && mentionStatus !== -1) {
            setMentionStatus(null);
            editor.update(() => {
                const targetNode = currentNode.current.splitText(
                    offsetRef.current,
                    offsetRef.current + mentionTerm.current.length + 1
                );
                const replacedNode = targetNode[1].replace(
                    $createMentionNode(
                        mentionStatus.user_id,
                        "@" + mentionStatus.username
                    )
                );
                replacedNode.select();
                $insertNodes([new TextNode(" ")]);
            });
        }
    }, [mentionStatus]);

    function onChange(editorState) {
        editorState.read(() => {
            const selection = $getSelection();

            if (
                selection &&
                selection.anchor.offset == selection.focus.offset
            ) {
                const [node] = selection.getNodes();
                currentNode.current = node;

                const offset = selection.anchor.offset;

                const content = node.getTextContent();
                if (!content) return;
                const wordObj = findWordAtIndex(content, offset - 1);

                const currentWord = wordObj.word;
                offsetRef.current = wordObj.startingIndex;

                if (currentWord?.startsWith("@")) {
                    if (mentionStatusRef.current != -1) {
                        setMentionStatus(-1);
                    }
                    mentionTerm.current = currentWord.substring(1);
                    setMention(mentionTerm.current);
                } else if (mentionStatusRef.current != null)
                    setMentionStatus(null);
            } else currentNode.current = null;
        });
    }

    useEffect(() => {
        const listener = editor.registerUpdateListener(({ editorState }) => {
            onChange(editorState);
        });

        return () => {
            listener();
        };
    }, [editor]);
    return null;
}
