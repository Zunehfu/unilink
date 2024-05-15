const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:5173" }));

// const queryFunction = async () => {
//     console.log("queryFunction initialize...");
//     try {
//         const sql = `SELECT * FROM users `;

//         const [rows] = await pool.query(sql);
//         const user_ = rows;
//         console.log(user_);
//         if (user_) console.log("user_");
//         if (!user_) console.log("!user_");
//     } catch (err) {
//         console.log({ err });
//         if (err.code == "ER_DUP_ENTRY") {
//             console.log("There is a duplicate key error!");
//         }
//     }
// };

// queryFunction();

app.use("/", require("./routes/router"));

app.listen(port, () => console.log(`Server is running on ${port}!`));
