export default function PostDetails({ postedBy, timestamp }) {
    return (
        <div className="h-6 flex justify-between">
            <div>{postedBy}</div>
            <div>
                <small>{timestamp}</small>
            </div>
        </div>
    );
}
