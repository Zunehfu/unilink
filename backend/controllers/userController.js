import pool from "../utils/database.js";
import moment from "moment";
import response from "../utils/response.js";
import Err from "../utils/customErr.js";
import svalues from "../utils/currentlySupportedValues.js";

const getUserWithId = async (req, res, next) => {
    let conn;
    try {
        // await new Promise((resolve) => setTimeout(resolve, 5000));
        let pal_status = 0;
        conn = await pool.getConnection();
        const user_id =
            req.query.id == "myprofile" ? req.user.user_id : req.query.user_id;
        const [rows_q1] = await conn.query(
            `SELECT * FROM users WHERE user_id = ? LIMIT 1`,
            [user_id]
        );
        const user_ = rows_q1[0];
        if (!user_)
            throw new Err("INVALID_USER_ID", "This person doesn't exist!");
        const [rows_q3] = await conn.query(
            `SELECT EXISTS(SELECT 1 FROM pals WHERE (user_id_from = ? AND user_id_to = ?) OR (user_id_from = ? AND user_id_to = ?) LIMIT 1) AS pals_`,
            [req.user.user_id, user_id, user_id, req.user.user_id]
        );
        if (rows_q3[0].pals_) pal_status = 1;
        if (!pal_status) {
            const [rows_q2] = await conn.query(
                `SELECT user_id_from, user_id_to FROM pal_proposals WHERE (user_id_from = ? AND user_id_to = ?) OR (user_id_from = ? AND user_id_to = ?) LIMIT 1;`,
                [req.user.user_id, user_id, user_id, req.user.user_id]
            );
            if (0 < rows_q2.length) {
                if (rows_q2[0].user_id_from == req.user.user_id) pal_status = 3;
                else pal_status = 2;
            }
        }

        res.json(
            response(true, "NONE", {
                name: user_.name,
                created_at: moment(user_.created_at).format("YYYY-MM-DD"),
                age: user_.age,
                major: user_.major,
                batch: user_.batch,
                relationship_status: user_.relationship_status,
                gender: user_.gender,
                username: user_.username,
                university: user_.university,
                contact: user_.contact,
                email: user_.email,
                personal_email: user_.personal_email,
                website: user_.website,
                interested_in: user_.interested_in,
                birth_date: user_.birth_date,
                pal_status,
            })
        );
    } catch (err) {
        res.json(
            response(
                false,
                err.code ? err.code : "UNEXPECTED_ERROR",
                err.message
            )
        );
    } finally {
        if (conn) conn.release();
    }
};

const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol (optional)
        "((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|" + // domain name and extension
        "localhost|" + // localhost
        "\\d{1,3}\\.?\\d{1,3}\\.?\\d{1,3}\\.?\\d{1,3}|" + // OR IP (v4) address
        "\\[?[a-fA-F0-9:]+\\]?)" + // OR IP (v6) address
        "(\\:\\d+)?(\\/[-a-zA-Z0-9@:%._\\+~#=]*)*" + // port and path (optional)
        "(\\?[;&a-zA-Z0-9%_\\+=\\-]*)?" + // query string (optional)
        "(\\#[-a-zA-Z0-9_]*)?$", // fragment locator (optional)
    "i" // case-insensitive
);

const betaresponse = async (req, res, next) => {
    try {
        console.log("betaresponse req recieved!");
        console.log(req.body);

        let sql = "";
        let age_;
        const field = req.body.field;
        let value = req.body.value;
        value = value.trim();
        const lvalue = value.toLowerCase();

        if (field === "Username") {
            const [user_check] = await pool.query(
                `SELECT EXISTS(SELECT 1 FROM users WHERE username = ? LIMIT 1) AS is_valid`,
                [value]
            );

            if (user_check[0].is_valid) {
                throw new Err(
                    "INVALID_VALUE",
                    "This username is not available"
                );
            }

            sql = "UPDATE users SET username = ? WHERE user_id = ? LIMIT 1";
        } else if (field === "Name") {
            if (value.length < 3 || value.length > 64) {
                throw new Err(
                    "INVALID_VALUE",
                    "Please enter a name in between 3 - 64 characters"
                );
            }
            sql = "UPDATE users SET name = ? WHERE user_id = ? LIMIT 1";
        } else if (field === "Major") {
            value = svalues.major_l.find((val) => val.toLowerCase() === lvalue);
            if (!value) {
                throw new Err("INVALID_VALUE", "This major is not acceptable");
            }
            sql = "UPDATE users SET major = ? WHERE user_id = ? LIMIT 1";
        } else if (field === "Batch") {
            if (!/^(201[5-9]|202[0-4])$/.test(value)) {
                throw new Err("INVALID_VALUE", "This batch is not acceptable");
            }

            sql = "UPDATE users SET batch = ? WHERE user_id = ? LIMIT 1";
        } else if (field === "Relationship status") {
            value = svalues.relationship_status_l.find(
                (val) => val.toLowerCase() === lvalue
            );
            if (!value) value = null;
            sql =
                "UPDATE users SET relationship_status = ? WHERE user_id = ? LIMIT 1";
        } else if (field === "Gender") {
            value = svalues.gender_l.find(
                (val) => val.toLowerCase() === lvalue
            );
            if (!value) value = null;
            sql = "UPDATE users SET gender = ? WHERE user_id = ? LIMIT 1";
        } else if (field === "Contact No") {
            if (!/^\+?[0-9]{10,15}$/.test(value)) {
                throw new Err(
                    "INVALID_VALUE",
                    "This contact number seems a bit off"
                );
            }
            sql = "UPDATE users SET contact = ? WHERE user_id = ? LIMIT 1";
        } else if (field === "Personal email") {
            if (
                !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
            ) {
                throw new Err("INVALID_VALUE", "This email seems a bit off");
            }
            sql =
                "UPDATE users SET personal_email = ? WHERE user_id = ? LIMIT 1";
        } else if (field === "Personal website") {
            if (!urlPattern.test(value)) {
                throw new Err("INVALID_VALUE", "This is not a valid url");
            }
            sql = "UPDATE users SET website = ? WHERE user_id = ? LIMIT 1";
        } else if (field === "Interested in") {
            value = svalues.interested_in_l.find(
                (val) => val.toLowerCase() === lvalue
            );
            if (!value) value = null;
            sql =
                "UPDATE users SET interested_in = ? WHERE user_id = ? LIMIT 1";
        } else if (field === "Date of birth") {
            if (
                !/^(?:(?!0000)\d{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/.test(
                    value
                )
            ) {
                throw new Err("INVALID_VALUE", "This date is not valid");
            }
            age_ =
                parseInt(new Date().getFullYear()) -
                parseInt(value.substring(0, 4));
            pool.query("UPDATE users SET age = ? WHERE user_id = ? LIMIT 1", [
                age_,
                req.user.user_id,
            ]);
            sql = "UPDATE users SET birth_date = ? WHERE user_id = ? LIMIT 1";
        } else {
            throw new Err(
                "INVALID_PROFILE_FIELD",
                "Cannot be updated at the moment"
            );
        }

        const [results] = await pool.query(sql, [value, req.user.user_id]);

        if (!results.affectedRows) {
            throw new Err("DATABASE_UPDATE_FAILED", "Something went wrong");
        }

        res.json(
            response(true, "NONE", {
                message: "Profile updated successfully",
                age_: age_ ? age_ : null,
            })
        );
    } catch (err) {
        res.json(response(false, err.code || "UNEXPECTED_ERROR", err.message));
    }
};

const get_likeusers_prepared_stmt = `
        SELECT user_id, username, name, university
        FROM users
        WHERE username LIKE ?
           OR Name LIKE ?
        LIMIT 10;`;

const getLikeUsers = async (req, res, next) => {
    try {
        // await new Promise((resolve) => setTimeout(resolve, 1000));

        const q = "%" + req.query.q.trim() + "%";

        if (q == "%%")
            return res.json({
                status: "SUCCESS",
                code: "NONE",
                data: [],
            });

        const [rows] = await pool.query(get_likeusers_prepared_stmt, [q, q]);

        res.json({
            status: "SUCCESS",
            code: "NONE",
            data: rows,
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

const insert_palproposal_prepared_stmt = `INSERT INTO pal_proposals (
    user_id_from, 
    user_id_to 
) VALUES (?, ?)`;

const sendPalProposal = async (req, res, next) => {
    try {
        await pool.query(insert_palproposal_prepared_stmt, [
            req.user.user_id,
            req.query.user_id,
        ]);

        res.json(
            response(true, "NONE", {
                message: "Sent Pal proposal!",
                pal_status: 3,
            })
        );
    } catch (err) {
        res.json(
            response(false, "CATCH_ERROR", {
                message: err.message,
            })
        );
    }
};

const removePalProposal = async (req, res, next) => {
    try {
        await pool.query(
            `DELETE FROM pal_proposals WHERE user_id_from = ? AND user_id_to = ?;`,
            [req.user.user_id, req.query.user_id]
        );

        res.json(
            response(true, "NONE", {
                message: "Removed pal request successfully!",
                pal_status: 0,
            })
        );
    } catch (err) {
        res.json(
            response(false, "CATCH_ERROR", {
                message: err.message,
            })
        );
    }
};

const removeMyPalProposal = async (req, res, next) => {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.beginTransaction();

        await conn.query(
            `DELETE FROM pal_proposals WHERE user_id_from = ? AND user_id_to = ? LIMIT 1`,
            [req.query.user_id, req.user.user_id]
        );

        console.log(req.query);

        if (req.query.accept == "true") {
            await conn.query(
                `INSERT INTO pals (user_id_from, user_id_to) VALUES (?, ?)`,
                [req.query.user_id, req.user.user_id]
            );
        }
        await conn.commit();

        res.json(
            response(true, "NONE", {
                message: "Pal proposal removed successfully",
                pal_status: req.query.accept == "true" ? 1 : 0,
            })
        );
    } catch (err) {
        if (conn) {
            await conn.rollback();
        }

        res.json(
            response(false, "CATCH_ERROR", {
                message: err.message,
            })
        );
    } finally {
        if (conn) {
            conn.release();
        }
    }
};

const removePal = async (req, res, next) => {
    try {
        await pool.query(
            `DELETE FROM pals 
            WHERE 
              (user_id_from = ? AND user_id_to = ?) 
              OR 
              (user_id_from = ? AND user_id_to = ?);`,
            [
                req.query.user_id,
                req.user.user_id,
                req.user.user_id,
                req.query.user_id,
            ]
        );

        res.json(
            response(true, "NONE", {
                message: "Removed pal successfully!",
                pal_status: 0,
            })
        );
    } catch (err) {
        res.json(
            response(false, "CATCH_ERROR", {
                message: err.message,
            })
        );
    }
};

const get_palproposals_prepared_stmt = `SELECT u.user_id, u.university, u.name, u.username
FROM pal_proposals p
INNER JOIN users u ON p.user_id_from = u.user_id
WHERE p.user_id_to = ?
LIMIT 20
OFFSET ?`;

const getMyPalProposals = async (req, res, next) => {
    try {
        const [rows] = await pool.query(get_palproposals_prepared_stmt, [
            req.user.user_id,
        ]);

        res.json(response(true, "NONE", rows));
    } catch (err) {
        res.json(
            response(false, "CATCH_ERROR", {
                message: err.message,
            })
        );
    }
};

// const get_pals_prepared_stmt = `SELECT u.user_id, u.university, u.name, u.username
// FROM pals p
// INNER JOIN users u ON p.user_id_from = u.user_id
// WHERE (p.user_id_from = ? AND p.user_id_to = ?) OR (p.user_id_from = ? AND p.user_id_to = ?)
// LIMIT 20
// OFFSET ?`;

// const getPals = async (req, res, next) => {
//     try {
//         const [rows] = await pool.query(get_palproposals_prepared_stmt, [
//             req.user.user_id,
//         ]);

//         res.json(response(true, "NONE", rows));
//     } catch (err) {
//         res.json(
//             response(false, "CATCH_ERROR", {
//                 message: err.message,
//             })
//         );
//     }
// };

export default {
    getUserWithId,
    sendPalProposal,
    removePalProposal,
    removeMyPalProposal,
    getMyPalProposals,
    removePal,
    getLikeUsers,
    betaresponse,
};
