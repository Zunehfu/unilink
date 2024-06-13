import ProfilePicture from "./ProfilePicture";
export default function ChatCard() {
    return (
        <div className="flex h-14 bg-dark my-1 rounded-2xl font-[Lexend]">
            <div className="ml-2 flex items-center">
                <ProfilePicture size="40px" />
            </div>
            <div className="ml-2.5">
                <div className="mt-1">
                    <span className="text-sm font-light">
                        Deneth Priyadarshana
                    </span>
                    <span className="text-xs ml-1 text-gray-300">
                        (@deneth.official)
                    </span>
                </div>
                <div className="text-xs ml-2">
                    dkmwlkanflanwongogawgagnoawngobaowgbaigwasnfoiwnafoq
                </div>
            </div>
        </div>
    );
}
