import PostWall from "./PostWall";
import ChatPanel from "./ChatPanel";
export default function Home({ scrollref }) {
    return (
        <div>
            <ChatPanel />
            <PostWall scrollref={scrollref} />
        </div>
    );
}
