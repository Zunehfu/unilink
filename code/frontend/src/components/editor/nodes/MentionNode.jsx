import { TextNode } from "lexical";

export class MentionNode extends TextNode {
    static getType() {
        return "mention";
    }

    static clone(node) {
        return new MentionNode(node.__user_id, node.__text, node.__key);
    }

    constructor(user_id, text, key) {
        super(text, key);
        this.__user_id = user_id;
    }

    createDOM(config) {
        const dom = super.createDOM(config);
        dom.className = "mention-node";
        dom.innerText = this.__text;
        return dom;
    }

    updateDOM() {
        return false;
    }

    static importJSON(serializedNode) {
        const node = $createMentionNode(
            serializedNode.user_id,
            serializedNode.text
        );
        node.setFormat(serializedNode.format);
        node.setDetail(serializedNode.detail);
        node.setMode(serializedNode.mode);
        node.setStyle(serializedNode.style);
        return node;
    }

    exportJSON() {
        return {
            ...super.exportJSON(),
            type: MentionNode.getType(),
            user_id: this.__user_id,
        };
    }
}

export function $createMentionNode(user_id, text) {
    return new MentionNode(user_id, text).setMode("token");
}

export function $isMentionNode(node) {
    return node instanceof MentionNode;
}
