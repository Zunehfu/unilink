import { createContext, useState } from "react";

export const UserDataContext = createContext(0);

export const UserDataProvider = ({ children }) => {
    const [userData, setUserData] = useState({});

    return (
        <UserDataContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserDataContext.Provider>
    );
};
