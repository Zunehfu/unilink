import { Server } from "socket.io";
import jwt from "jsonwebtoken";

let users = {};

const initializeSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("socket connected", socket.id);
        socket.on("disconnect", () => {
            console.log("socket disconnected", socket.id);
            for (const userId in users) {
                if (users[userId] === socket.id) {
                    delete users[userId];
                    break;
                }
            }
        });

        socket.on("userid-safe-map", (data) => {
            const decodedToken = jwt.verify(data.token, process.env.SECRET_STR);
            users[decodedToken.user_id] = socket.id;
            console.log(users);
        });
        socket.on("handle-send-palproposal", (data) => {
            console.log(data);
            if (!users[data.user_id_to]) return;
            socket.to(users[data.user_id_to]).emit("on-palproposal-recieve", {
                userData_from: data.userData,
            });
        });
        socket.on("handle-withdraw-palproposal", (data) => {
            console.log(data);
            if (!users[data.user_id_to]) return;
            socket
                .to(users[data.user_id_to])
                .emit("on-withdraw-recieved-palproposal", {
                    userData_from: data.userData,
                });
        });
        socket.on("handle-unpal", (data) => {
            console.log(data);
            if (!users[data.user_id_to]) return;
            socket.to(users[data.user_id_to]).emit("on-being-unpaled", {
                userData_from: data.userData,
            });
        });
        socket.on("handle-accept-palproposal", (data) => {
            console.log(data);
            if (!users[data.user_id_to]) return;
            socket
                .to(users[data.user_id_to])
                .emit("on-accept-sent-palproposal", {
                    userData_from: data.userData,
                });
        });
        socket.on("handle-reject-palproposal", (data) => {
            console.log(data);
            if (!users[data.user_id_to]) return;
            socket
                .to(users[data.user_id_to])
                .emit("on-reject-sent-palproposal", {
                    userData_from: data.userData,
                });
        });
    });
};

export default initializeSocket;
