import { createContext, useState } from "react";
export const MentionContext = createContext(-1);

export const MentionProvider = ({ children }) => {
    const [mentionStatus, setMentionStatus] = useState(null);
    // null => hide pallette safely
    // -1 => show palette for selection
    // obj => user has selected and contains data of related to the selected user
    const [mention, setMention] = useState("");

    return (
        <MentionContext.Provider
            value={{
                mentionStatus,
                setMentionStatus,
                mention,
                setMention,
            }}
        >
            {children}
        </MentionContext.Provider>
    );
};
