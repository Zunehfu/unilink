export default function ProfilePicture({ size }) {
    return (
        <div
            style={{ height: size, width: size }}
            className="inline-block rounded-full overflow-hidden relative"
        >
            <img
                src="../../public/profile.jpg"
                alt=""
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-auto"
            />
        </div>
    );
}
