import React from "react";
import ProfilePicture from "./ProfilePicture";

export default function MutualItem() {
    return (
        <div className="justify-between p-1 flex hover:bg-dark2 rounded-md cursor-pointer">
            <div className="flex">
                <div className="flex">
                    <ProfilePicture size="40px" />
                </div>
                <div className="ml-2">
                    <div>Deneth Priydarshana</div>
                    <div className="text-xs font-[Lexend] text-gray-400 underline">
                        (@deneth.official)
                    </div>
                </div>
            </div>
            <div className="px-2 flex items-center bg-black rounded-md">
                University of Moratuwa
            </div>
        </div>
    );
}
