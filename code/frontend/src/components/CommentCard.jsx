import { useProfile } from "../hooks/useProfile";
import ProfilePicture from "./ProfilePicture";
import moment from "moment";
import EditorReadOnly from "./editor/EditorReadOnly";

export default function CommentCard({ commentData }) {
    const setProfile = useProfile();
    return (
        <div className="text-white text-sm rounded-xl p-2 bg-black w-full h-fit break-words">
            <div className="flex justify-between">
                <div
                    onClick={() => setProfile(commentData.user_id)}
                    className="flex cursor-pointer"
                >
                    <ProfilePicture size="30px" />
                    <div className="text-xs font-[Lexend] ml-1">
                        <div className="text-sm h-4">{commentData.name}</div>
                        <div className="text-xs underline text-gray-400">
                            (@{commentData.username})
                        </div>
                    </div>
                </div>
                <div className="text-xs">
                    {moment(commentData.created_at).format("D/M/YYYY")}
                </div>
            </div>
            <div className="mt-1 ">
                {console.log(commentData.content)}
                <EditorReadOnly initialEditorState={commentData.content} />
            </div>
        </div>
    );
}
