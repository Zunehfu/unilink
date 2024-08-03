import { createServer } from "http";
import expressApp from "./express.js";
import initializeSocket from "./socket.js";

const port = 8080;

const httpServer = createServer(expressApp);
initializeSocket(httpServer);

httpServer.listen(port, () => {
    console.log(`Backend is running on port ${port}!`);
});
