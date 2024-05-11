export default function AddPostButton({ toggleAddPostVisibility }) {
    return (
        <div
            onClick={toggleAddPostVisibility}
            className="right-0 rounded-tl-lg rounded-bl-lg grid fixed top-1/2 w-16 p-2 pt-1 bg-green-200 text-3xl text-left font-bold text-white cursor-pointer"
        >
            +
        </div>
    );
}
