import { useContext } from "react";
import { ProfileContext } from "../contexts/ProfileContext";

export default function AdditionalInfo() {
    const { ativeUserData } = useContext(ProfileContext);
    console.log(ativeUserData);
    return (
        <div className="flex flex-col items-center">
            <div>{ativeUserData.member_since}</div>
            <div>{ativeUserData.university}</div>
            <div>{ativeUserData.age}</div>
            <div>{ativeUserData.major}</div>
            <div>{ativeUserData.batch}</div>
            <div>{ativeUserData.relationship_Status}</div>
            <div>{ativeUserData.gender}</div>
            <div>{ativeUserData.interested_in}</div>
            <div>{ativeUserData.contact}</div>
            <div>{ativeUserData.email}</div>
            <div>{ativeUserData.personal_email}</div>
            <div>{ativeUserData.website}</div>
            <div>{ativeUserData.birth_date}</div>
        </div>
    );
}
