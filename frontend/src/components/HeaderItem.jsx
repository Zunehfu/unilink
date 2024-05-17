export default function HeaderItem({
    item,
    toggleProfile,
    toggleSearchVisibility,
}) {
    const handleClick = () => {
        if (item == "Profile") toggleProfile(true, "myprofile");
        else {
            toggleSearchVisibility();
        }
    };
    return (
        <div
            onClick={handleClick}
            className="inline-flex hover:underline items-end cursor-pointer"
        >
            {item}
        </div>
    );
}
