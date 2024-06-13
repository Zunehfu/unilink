import PostWall from "./PostWall";
import ChatPanel from "./ChatPanel";
export default function Home({ posts, setPosts, scrollref }) {
    return (
        <div>
            <ChatPanel />
            <PostWall posts={posts} setPosts={setPosts} scrollref={scrollref} />
        </div>
    );
}
