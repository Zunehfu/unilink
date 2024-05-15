export default function PostDetails({ user_id, created_at, toggleProfile }) {
    return (
        <div className="h-6 flex justify-between">
            <div onClick={() => toggleProfile(true, user_id)}>{user_id}</div>
            <div>
                <small>{created_at}</small>
            </div>
        </div>
    );
}
