export default function PostStats() {
    return (
        <div className="h-9 flex justify-around items-center">
            <div>
                <small>991</small> <i class="fa-regular fa-heart"></i> |{" "}
                <small>700</small> <i class="fa-regular fa-comment"></i>
            </div>
            <div>
                <input className="border-2 rounded" type="text" />
            </div>
            <div>
                <button className="bg-red-400 rounded p-0.5">comment</button>
            </div>
        </div>
    );
}
