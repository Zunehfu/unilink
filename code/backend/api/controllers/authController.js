import { pool } from "../utils/database.js";
import jwt from "jsonwebtoken";
import { response } from "../utils/response.js";
import { Err } from "../utils/error.js";
import { sendMail } from "../utils/email/email.js";
import {
    getUniIdByDomain,
    getUniNameByUniId,
} from "../utils/config/valuesRead.js";

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

const USERNAME_REGEX = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const UOM_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@uom\.lk$/;

const verifySignup = async (req, res, next) => {
    let conn;
    try {
        const username = req.body.username;
        const pass = req.body.pass;
        const token = req.body.token;

        if (!USERNAME_REGEX.test(username))
            throw new Err("USERNAME_CHECK_FAILED");
        if (!PASSWORD_REGEX.test(pass)) throw new Err("PASS_CHECK_FAILED");

        const decodedToken = jwt.verify(token, process.env.SECRET_STR);

        if (!decodedToken.email) throw new Err("MALFORMED_TOKEN");
        const email = decodedToken.email;

        if (!UOM_REGEX.test(email)) throw new Err("MALFORMED_TOKEN");

        conn = await pool.getConnection();
        await conn.beginTransaction();

        const [user_check] = await conn.query(
            `SELECT EXISTS(SELECT 1 FROM users WHERE username = ? LIMIT 1) AS is_valid`,
            [username]
        );
        if (user_check[0].is_valid) throw new Err("USERNAME_EXISTS");

        const timestamp = new Date();
        await conn.query(insert_user_prepared_stmt, [
            username,
            email,
            pass,
            getUniIdByDomain(email.split("@")[1]),
            timestamp,
            timestamp,
        ]);

        conn.commit();

        res.json(response(true, "VERIFY_SIGNUP", { email, username }));
    } catch (err) {
        if (conn) {
            await conn.rollback();
        }

        if (err instanceof Err) {
            res.json(response(true, err.message, {}));
        } else {
            res.json(
                response(false, "UNEXPECTED_ERROR_BACKEND", {
                    message: err.message,
                })
            );
        }
    } finally {
        if (conn) conn.release();
    }
};

const sendEmailVerificationToken = async (req, res, next) => {
    try {
        const email = req.body.email;

        const [user_check] = await pool.query(
            `SELECT EXISTS(SELECT 1 FROM users WHERE email = ? LIMIT 1) AS is_valid`,
            [email]
        );
        if (user_check[0].is_valid) throw new Err("EMAIL_EXISTS");

        const token = jwt.sign({ email }, process.env.SECRET_STR, {
            expiresIn: process.env.EMAIL_EXPIRES,
        });
        console.log(email, token);
        await sendMail(email, token);
        res.json(response(true, "EMAIL_SEND", {}));
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

const verifyEmailVerificationToken = async (req, res, next) => {
    try {
        const token = req.body.token;
        const decodedToken = jwt.verify(token, process.env.SECRET_STR);
        if (!decodedToken.email) throw new Err("MALFORMED_TOKEN");

        const email = decodedToken.email;
        const university = getUniNameByUniId(
            getUniIdByDomain(email.split("@")[1])
        );

        res.json(
            response(true, "TOKEN_VERIFICATION", {
                token,
                email,
                university,
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

export default {
    validate,
    protectRoute,
    verifySignin,
    verifySignup,
    sendEmailVerificationToken,
    verifyEmailVerificationToken,
};
