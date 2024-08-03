import { createContext, useState } from "react";

export const SettingsContext = createContext(false);

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(false);

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};
