import DropMenuItemForMyProfile from "./DropMenuItemForMyProfile";

export default function DropMenuForMyProfile({ items, setVal }) {
    return (
        <div className="z-10 absolute max-h-32 rounded-md shadow-lg w-full overflow-y-scroll">
            {items.map((item, index) => (
                <DropMenuItemForMyProfile
                    key={index}
                    item={item}
                    setVal={setVal}
                />
            ))}
        </div>
    );
}
