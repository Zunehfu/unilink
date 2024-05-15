import Profile from "./Profile";
import MyProfile from "./MyProfile";

export default function TopLevelLayerProfile({
    userId_profile,
    toggleProfile,
}) {
    return (
        <>
            {userId_profile == "myprofile" ? (
                <MyProfile toggleProfile={toggleProfile} />
            ) : (
                <Profile
                    toggleProfile={toggleProfile}
                    userId_profile={userId_profile}
                />
            )}
        </>
    );
}
