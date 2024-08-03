import { useProfile } from "../hooks/useProfile";

export default function SearchResultCard({ item, roundTop, roundBottom }) {
    const setProfile = useProfile();
    return (
        <>
            <div
                style={{
                    borderTopLeftRadius: roundTop ? "16px" : "0px",
                    borderTopRightRadius: roundTop ? "16px" : "0px",
                    borderBottomLeftRadius: roundBottom ? "16px" : "0px",
                    borderBottomRightRadius: roundBottom ? "16px" : "0px",
                }}
                onClick={() => setProfile(item.user_id)}
                className="bg-offwhite h-12 flex hover:bg-emerald-200 cursor-pointer"
            >
                <div className="ml-1 w-12 flex justify-center items-center">
                    <img
                        className="h-10 w-10 rounded-full"
                        src="/profile.jpg"
                        alt=""
                    />
                </div>
                <div className="ml-3 w-full leading-6">
                    <div className="mt-[1px]">
                        {item.name}
                        <span className="ml-1 text-xs">(@{item.username})</span>
                    </div>
                    <div className="text-xs">{item.university}</div>
                </div>
            </div>
            {!roundBottom && <hr />}
        </>
    );
}
