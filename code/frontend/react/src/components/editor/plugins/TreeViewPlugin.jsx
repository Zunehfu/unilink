import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TreeView } from "@lexical/react/LexicalTreeView";

export function TreeViewPlugin() {
    const [editor] = useLexicalComposerContext();
    return (
        <div className="bg-black text-white">
            <TreeView
                viewClassName="tree-view-output"
                timeTravelPanelClassName="debug-timetravel-panel"
                timeTravelButtonClassName="debug-timetravel-button"
                timeTravelPanelSliderClassName="debug-timetravel-panel-slider"
                timeTravelPanelButtonClassName="debug-timetravel-panel-button"
                editor={editor}
            />
        </div>
    );
}
