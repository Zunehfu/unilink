export default function HeaderItem({ item, toggleProfileVisibility }) {
    return (
        <div
            onClick={toggleProfileVisibility}
            className="inline-flex hover:underline items-end cursor-pointer"
        >
            {item}
        </div>
    );
}
