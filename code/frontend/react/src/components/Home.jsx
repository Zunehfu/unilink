import PostWall from "./PostWall";
export default function Home({ scrollref }) {
    return (
        <div>
            {/* .. other items in home */}
            <PostWall scrollref={scrollref} />
        </div>
    );
}
