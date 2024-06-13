import { createContext, useState } from "react";
export const ProfileContext = createContext(-1);

export const ProfileProvider = ({ children }) => {
    const [userId_profile, setUserId_profile] = useState(-1);
    const [palStatus, setPalStatus] = useState(0);

    return (
        <ProfileContext.Provider
            value={{
                userId_profile,
                setUserId_profile,
                palStatus,
                setPalStatus,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
};
