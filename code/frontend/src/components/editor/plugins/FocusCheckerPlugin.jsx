import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useLayoutEffect, useState } from "react";
import { mergeRegister } from "@lexical/utils";
import { FOCUS_COMMAND, BLUR_COMMAND, COMMAND_PRIORITY_EDITOR } from "lexical";

export function FocusCheckerPlugin({ focusTrigger }) {
    const [editor] = useLexicalComposerContext();
    const [isFocused, setIsFocused] = useState(() => {
        return editor.getRootElement() === document.activeElement;
    });

    useEffect(() => {
        focusTrigger(isFocused);
    }, [isFocused]);
    useLayoutEffect(() => {
        setIsFocused(editor.getRootElement() === document.activeElement);
        return mergeRegister(
            editor.registerCommand(
                FOCUS_COMMAND,
                () => {
                    setIsFocused(true);
                    return 0;
                },
                COMMAND_PRIORITY_EDITOR
            ),
            editor.registerCommand(
                BLUR_COMMAND,
                () => {
                    setIsFocused(false);
                    return 0;
                },
                COMMAND_PRIORITY_EDITOR
            )
        );
    }, [editor]);
}
