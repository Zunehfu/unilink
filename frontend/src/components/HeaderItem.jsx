export default function HeaderItem({ item, toggleProfile }) {
    return (
        <div
            onClick={() => toggleProfile(true, "myprofile")}
            className="inline-flex hover:underline items-end cursor-pointer"
        >
            {item}
        </div>
    );
}
