export default function DropMenuItemForMyProfile({ item, setVal }) {
    return (
        <div
            onClick={() => setVal(item)}
            className="font-medium tracking-wide h-8 flex justify-center items-center hover:bg-gray-50 hover:text-green-500 cursor-pointer transition-all bg-green-50 text-sm"
        >
            {item}
        </div>
    );
}
