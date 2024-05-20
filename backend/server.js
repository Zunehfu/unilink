import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import router from "./routes/router.js";
// import socketController from "./controllers/socketController.js";

const port = 8080;

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("connected");
    console.log(socket.id);
    socket.on("disconnect", () => {
        console.log("disconnected");
        console.log(socket.id);
    });
});

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", router);

httpServer.listen(port, () => {
    console.log(`Server is running on ${port}!`);
});
