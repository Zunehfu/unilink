import { createContext, useState } from "react";
export const ProfileContext = createContext(-1);
export const ProfileProvider = ({ children }) => {
    const [activeProfile, setActiveProfile] = useState(-1);

    //-- activeProfile
    //-1 = hide profile if a certain profile is in display
    //id > 0 =  show profile with given given id

    //-- setActiveProfile
    //This should never be used inside business logic code
    //Should only used inside useProfile hook

    const [activeProfileData, setActiveProfileData] = useState({});

    //-- activeProfileData.pal_satus
    //0 - not pals
    //1 - pals
    //2 - incoming request
    //3 - outgoing request

    return (
        <ProfileContext.Provider
            value={{
                activeProfile,
                setActiveProfile,
                activeProfileData,
                setActiveProfileData,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
};
