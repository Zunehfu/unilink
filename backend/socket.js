import { Server } from "socket.io";

const initializeSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("socket connected");
        console.log(socket.id);

        socket.on("disconnect", () => {
            console.log("socket disconnected");
            console.log(socket.id);
        });

        socket.on("send_message", (data) => {
            console.log(data);
            socket.broadcast.emit("receive_message", data);
        });
    });
};

export default initializeSocket;
