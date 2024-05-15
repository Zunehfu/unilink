const pool = require("../database");
const jwt = require("jsonwebtoken");

const get_user_prepared_stmt__user_id = `SELECT * FROM users WHERE user_id = ?`;

exports.validate = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token)
            return res.json({
                status: "ERROR",
                code: "JWT_NOT_FOUND",
                data: {
                    auth_fail: true,
                },
            });

        const decodedToken = jwt.verify(token, process.env.SECRET_STR);

        const [rows] = await pool.query(get_user_prepared_stmt__user_id, [
            decodedToken.user_id,
        ]);

        const user_ = rows[0];

        if (!user_)
            return res.json({
                status: "ERROR",
                code: "JWT_MALFORMED",
                data: {
                    auth_fail: true,
                },
            });

        res.json({
            status: "SUCCESS",
            code: "NONE",
            data: {
                auth_fail: false,
            },
        });
    } catch (error) {
        res.json({
            status: "ERROR",
            code: "CATCH_ERROR",
            data: {
                auth_fail: false,
            },
        });
    }
};

exports.protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token)
            return res.json({
                status: "ERROR",
                code: "JWT_NOT_FOUND",
                data: {
                    auth_fail: true,
                },
            });

        const decodedToken = jwt.verify(token, process.env.SECRET_STR);

        const [rows] = await pool.query(get_user_prepared_stmt__user_id, [
            decodedToken.user_id,
        ]);

        const user_ = rows[0];

        if (!user_)
            return res.json({
                status: "ERROR",
                code: "JWT_MALFORMED",
                data: {
                    auth_fail: true,
                },
            });

        req.user = user_;
        next();
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

const get_user_prepared_stmt__username = `SELECT * FROM users WHERE username = ?`;

exports.verifySignin = async (req, res, next) => {
    try {
        const [rows] = await pool.query(get_user_prepared_stmt__username, [
            req.body.username,
        ]);

        if (rows.length == 0)
            return res.json({
                status: "ERROR",
                code: "AUTH_INVALID_USERNAME",
                data: {
                    message: "There's no account associated with this username",
                },
            });

        const user_ = rows[0];

        if (user_.pass != req.body.pass)
            return res.json({
                status: "ERROR",
                code: "AUTH_INVALID_PASS",
                data: {
                    message: "Incorrect password!",
                },
            });

        const token = jwt.sign(
            { user_id: user_.user_id },
            process.env.SECRET_STR,
            { expiresIn: process.env.LOGIN_EXPIRES }
        );

        res.json({
            status: "SUCCESS",
            code: "NONE",
            data: {
                token,
                expires:
                    parseInt(process.env.LOGIN_EXPIRES) / (1000 * 60 * 60 * 24),
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

const insert_user_prepared_stmt = `INSERT INTO users (
    username, 
    email, 
    pass, 
    university, 
    created_at, 
    last_online
) VALUES (?, ?, ?, ?, ?, ?)`;

exports.verifySignup = async (req, res, next) => {
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
