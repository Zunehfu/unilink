import pool from "../utils/database.js";
import jwt from "jsonwebtoken";
import response from "../utils/response.js";
import Err from "../utils/customErr.js";

const get_user_prepared_stmt__user_id = `SELECT * FROM users WHERE user_id = ?`;

const validate = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) throw new Err("JWT_NOT_FOUND");

        const decodedToken = jwt.verify(token, process.env.SECRET_STR);
        const [rows] = await pool.query(get_user_prepared_stmt__user_id, [
            decodedToken.user_id,
        ]);
        const user_ = rows[0];

        if (!user_) throw new Err("JWT_MALFORMED");

        res.json(
            response(true, "VALIDATE", {
                auth_fail: false,
                user_id: user_.user_id,
                name: user_.name,
                username: user_.username,
            })
        );
    } catch (err) {
        if (err instanceof Err) {
            res.json(
                response(false, err.message, {
                    auth_fail: true,
                })
            );
        } else {
            res.json(
                response(false, "UNEXPECTED_ERROR_BACKEND", {
                    auth_fail: true,
                    message: err.message,
                })
            );
        }
    }
};

const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const client_uid = parseInt(req.headers["client-uid"]);

        if (!token) throw new Err("JWT_NOT_FOUND");

        const decodedToken = jwt.verify(token, process.env.SECRET_STR);
        const [rows] = await pool.query(get_user_prepared_stmt__user_id, [
            decodedToken.user_id,
        ]);
        const user_ = rows[0];

        if (!user_) throw new Err("JWT_MALFORMED");
        if (!(user_.user_id === client_uid))
            throw new Err("CLIENT_ID_MISMATCH");

        req.user = user_;
        next();
    } catch (err) {
        if (err instanceof Err) {
            res.json(
                response(false, err.message, {
                    auth_fail: true,
                })
            );
        } else {
            res.json(
                response(false, "UNEXPECTED_ERROR_BACKEND", {
                    auth_fail: true,
                    message: err.message,
                })
            );
        }
    }
};

const get_user_prepared_stmt__username = `SELECT * FROM users WHERE username = ?`;

const verifySignin = async (req, res, next) => {
    try {
        const [rows] = await pool.query(get_user_prepared_stmt__username, [
            req.body.username,
        ]);

        if (rows.length == 0) throw new Err("AUTH_INVALID_USERNAME");

        const user_ = rows[0];

        if (user_.pass != req.body.pass) throw new Err("AUTH_INVALID_PASS");

        const token = jwt.sign(
            { user_id: user_.user_id },
            process.env.SECRET_STR,
            { expiresIn: process.env.LOGIN_EXPIRES }
        );

        res.json(
            response(true, "VERIFY_SIGNIN", {
                token,
                expires:
                    parseInt(process.env.LOGIN_EXPIRES) / (1000 * 60 * 60 * 24),
            })
        );
    } catch (err) {
        if (err instanceof Err) {
            res.json(response(false, err.message, {}));
        } else {
            res.json(
                response(false, "UNEXPECTED_ERROR_BACKEND", {
                    message: err.message,
                })
            );
        }
    }
};

const insert_user_prepared_stmt = `INSERT INTO users (
    username, 
    email, 
    pass, 
    university, 
    created_at, 
    last_online
) VALUES (?, ?, ?, ?, ?, ?)`;

const verifySignup = async (req, res, next) => {
    try {
        const timestamp = new Date();

        const [rows] = await pool.query(insert_user_prepared_stmt, [
            req.body.username,
            req.body.email,
            req.body.pass,
            req.body.university,
            timestamp,
            timestamp,
        ]);

        console.log({ rows });
        res.json({
            status: "SUCCESS",
            code: "NONE",
            data: {
                token: "token",
            },
        });
    } catch (err) {
        res.json({
            status: "ERROR",
            code: "CATCH_ERROR",
            data: {
                message: err.message,
            },
        });
    }
};

export default {
    validate,
    protectRoute,
    verifySignin,
    verifySignup,
};
