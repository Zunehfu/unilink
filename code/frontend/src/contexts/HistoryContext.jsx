import { createContext, useState } from "react";
export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
    const history = useRef([{}]);

    return (
        <HistoryContext.Provider value={history}>
            {children}
        </HistoryContext.Provider>
    );
};
