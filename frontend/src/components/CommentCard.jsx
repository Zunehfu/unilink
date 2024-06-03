import ProfilePicture from "./ProfilePicture";

export default function CommentCard({ commentData }) {
    console.log({ commentData });
    return (
        <div className="text-white text-sm rounded-xl p-2 bg-black w-full h-fit break-words">
            <div className="flex justify-between">
                <div className="flex">
                    <ProfilePicture size="30px" />
                    <div className="text-xs font-[Lexend] ml-1">
                        <div className="text-sm h-4">Deneth Priyadarshana</div>
                        <div className="text-xs underline text-gray-400">
                            (@deneth.official)
                        </div>
                    </div>
                </div>
                <div className="text-xs">15/5/2024</div>
            </div>
            <div className="mt-1 ">{commentData.content}</div>
        </div>
    );
}
