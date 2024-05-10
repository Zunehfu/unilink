const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config({ path: "./config.env" }); //dotenv paths start from the root

const app = express();
const port = 8080;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

app.use("/", require("./routes/router"));

mongoose
    .connect(process.env.CONN_STRL, {
        // useNewUrlParser: true
    })
    .then((conn) => {
        console.log("Database connection established!");
    })
    .catch((err) => {
        console.log(err);
        console.log("There is an issue with database connection!");
    });

app.listen(port, () => console.log(`Server is running on ${port}!`));
