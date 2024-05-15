export default function ProfileItemForMyProfile({ field, value }) {
    return (
        <>
            <small>{field}</small>
            <div className="relative">{value}</div>
            <hr />
        </>
    );
}
