export default function HeaderItem({ item }) {
    return (
        <div className="inline-flex hover:underline items-end cursor-pointer">
            {item}
        </div>
    );
}
