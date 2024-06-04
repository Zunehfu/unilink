import { Server } from "socket.io";
import jwt from "jsonwebtoken";

// Store currently connected users and posts in their feed
let users = {};

const findUserIdFromSocketId = (socketid) => {
    for (let userId in users) {
        if (users[userId].socketid === socketid) {
            return userId;
        }
    }
    return null;
};

const getUsersWithPostId = (postId) => {
    const socketIds = [];
    for (let userId in users) {
        if (users[userId].posts.includes(postId)) {
            socketIds.push(users[userId].socketid);
        }
    }
    return socketIds;
};

const initializeSocket = (httpServer) => {
    //prevent cross origin attacks
    const io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        // socket essentials
        console.log("socket connected", socket.id);
        socket.on("disconnect", () => {
            console.log("socket disconnected", socket.id);
            delete users[findUserIdFromSocketId(socket.id)];
        });

        // safely map userids into server stored #users object
        socket.on("userid-safe-map", (data) => {
            const decodedToken = jwt.verify(data.token, process.env.SECRET_STR);
            users[decodedToken.user_id] = { socketid: socket.id, posts: [] };
            console.log(users);
        });

        // like-comment management
        socket.on("on-add-like", (data) => {
            socket
                .to(getUsersWithPostId(data.post_id))
                .emit("on-user-add-like", {
                    post_id: data.post_id,
                });
        });
        socket.on("on-remove-like", (data) => {
            socket
                .to(getUsersWithPostId(data.post_id))
                .emit("on-user-remove-like", {
                    post_id: data.post_id,
                });
        });
        socket.on("on-add-comment", (data) => {
            socket
                .to(getUsersWithPostId(data.post_id))
                .emit("on-user-add-comment", {
                    post_id: data.post_id,
                });
        });
        socket.on("on-remove-comment", (data) => {
            socket
                .to(getUsersWithPostId(data.post_id))
                .emit("on-user-remove-comment", {
                    post_id: data.post_id,
                });
        });

        // Set currently loaded posts of a particular user inside the #users obj
        socket.on("on-posts-loaded", (data) => {
            console.log(data);
            const userid = findUserIdFromSocketId(socket.id);
            if (!users[userid]) return;
            const combinedPosts = [...users[userid].posts, ...data];

            users[userid] = {
                ...users[userid],
                posts: combinedPosts,
            };
        });

        // Pal related handling
        socket.on("handle-send-palproposal", (data) => {
            console.log(data);
            if (!users[data.user_id_to]) return;
            socket
                .to(users[data.user_id_to].socketid)
                .emit("on-palproposal-recieve", {
                    userData_from: data.userData,
                });
        });
        socket.on("handle-withdraw-palproposal", (data) => {
            console.log(data);
            if (!users[data.user_id_to]) return;
            socket
                .to(users[data.user_id_to].socketid)
                .emit("on-withdraw-recieved-palproposal", {
                    userData_from: data.userData,
                });
        });
        socket.on("handle-unpal", (data) => {
            console.log(data);
            if (!users[data.user_id_to]) return;
            socket
                .to(users[data.user_id_to].socketid)
                .emit("on-being-unpaled", {
                    userData_from: data.userData,
                });
        });
        socket.on("handle-accept-palproposal", (data) => {
            console.log(data);
            if (!users[data.user_id_to]) return;
            socket
                .to(users[data.user_id_to].socketid)
                .emit("on-accept-sent-palproposal", {
                    userData_from: data.userData,
                });
        });
        socket.on("handle-reject-palproposal", (data) => {
            console.log(data);
            if (!users[data.user_id_to]) return;
            socket
                .to(users[data.user_id_to].socketid)
                .emit("on-reject-sent-palproposal", {
                    userData_from: data.userData,
                });
        });
    });
};

export default initializeSocket;
