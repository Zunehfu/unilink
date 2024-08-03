import { useContext } from "react";
import { ProfileContext } from "../contexts/ProfileContext";

export default function AdditionalInfo() {
    const { activeProfileData } = useContext(ProfileContext);
    return (
        <div className="flex flex-col items-center">
            <div>{activeProfileData.member_since}</div>
            <div>{activeProfileData.university}</div>
            <div>{activeProfileData.age}</div>
            <div>{activeProfileData.major}</div>
            <div>{activeProfileData.batch}</div>
            <div>{activeProfileData.relationship_Status}</div>
            <div>{activeProfileData.gender}</div>
            <div>{activeProfileData.interested_in}</div>
            <div>{activeProfileData.contact}</div>
            <div>{activeProfileData.email}</div>
            <div>{activeProfileData.personal_email}</div>
            <div>{activeProfileData.website}</div>
            <div>{activeProfileData.birth_date}</div>
        </div>
    );
}
