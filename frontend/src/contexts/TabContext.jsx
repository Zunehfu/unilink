import { createContext, useState } from "react";

export const TabContext = createContext(0);

export const TabProvider = ({ children }) => {
    const [tab, setTab] = useState(0);

    return (
        <TabContext.Provider value={{ tab, setTab }}>
            {children}
        </TabContext.Provider>
    );
};
