import { pool } from "../utils/database.js";
import { response } from "../utils/response.js";
import { values } from "../utils/config/values.js";

import moment from "moment";
import { Err } from "../utils/error.js";
import {
    getGenderByGenderId,
    getInterestedInByInterestedInId,
    getMajorByUniIdAndMajorId,
    getRelationshipStatusByRelationshipId,
    getUniNameByUniId,
} from "../utils/config/valuesRead.js";

const getUserWithId = async (req, res, next) => {
    let conn;
    try {
        // await new Promise((resolve) => setTimeout(resolve, 5000));
        let pal_status = 0;
        conn = await pool.getConnection();
        const user_id =
            req.query.user_id == "myprofile"
                ? req.user.user_id
                : req.query.user_id;
        const [rows_q1] = await conn.query(
            `SELECT * FROM users WHERE user_id = ? LIMIT 1`,
            [user_id]
        );
        const user_ = rows_q1[0];
        if (!user_) throw new Err("INVALID_USER_ID");
        const [rows_q2] = await conn.query(
            `SELECT EXISTS(SELECT 1 FROM pals WHERE (user_id = ? AND pal_user_id = ?) LIMIT 1) AS pals_`,
            [req.user.user_id, user_id]
        );
        if (rows_q2[0].pals_) pal_status = 1;
        if (!pal_status) {
            const [rows_q3] = await conn.query(
                `SELECT user_id_from, user_id_to FROM pal_proposals WHERE (user_id_from = ? AND user_id_to = ?) OR (user_id_from = ? AND user_id_to = ?) LIMIT 1;`,
                [req.user.user_id, user_id, user_id, req.user.user_id]
            );
            if (0 < rows_q3.length) {
                if (rows_q3[0].user_id_from == req.user.user_id) pal_status = 3;
                else pal_status = 2;
            }
        }

        // Count mutual pals
        let mutual_pals_count = 0;
        if (req.user.user_id != user_id) {
            const [rows_q4] = await conn.query(
                `SELECT COUNT(*) AS mutual_pals_count
                FROM 
                    pals p1
                JOIN 
                    pals p2
                ON 
                    p1.pal_user_id = p2.pal_user_id
                WHERE 
                    p1.user_id = ? AND p2.user_id =?
                GROUP BY 
                    p1.user_id, p2.user_id;
                `,
                [req.user.user_id, user_id]
            );

            console.log(req.user.user_id, user_id, rows_q4);

            mutual_pals_count = rows_q4[0]?.mutual_pals_count || 0;
        }

        const [rows_q5] = await conn.query(
            `SELECT COUNT(*) AS post_count
            FROM posts
            WHERE user_id = ? AND is_anonymous = 0;
            `,
            [user_id]
        );
        const post_count = rows_q5[0].post_count;

        const [rows_q6] = await conn.query(
            `SELECT COUNT(*) AS pal_count
            FROM pals
            WHERE user_id = ?;`,
            [user_id]
        );

        const pal_count = rows_q6[0].pal_count;

        res.json(
            response(true, "GET_USER", {
                name: user_.name,
                created_at: moment(user_.created_at).format("YYYY-MM-DD"),
                age: user_.age,
                major: user_.major
                    ? getMajorByUniIdAndMajorId(user_.university, user_.major)
                    : null,
                batch: user_.batch,
                relationship_status: user_.relationship_status
                    ? getRelationshipStatusByRelationshipId(
                          user_.relationship_status
                      )
                    : null,
                gender: user_.gender ? getGenderByGenderId(user_.gender) : null,
                username: user_.username,
                university: getUniNameByUniId(user_.university),
                contact: user_.contact,
                email: user_.email,
                personal_email: user_.personal_email,
                website: user_.website,
                interested_in: user_.interested_in
                    ? getInterestedInByInterestedInId(user_.interested_in)
                    : null,
                birth_date: user_.birth_date,
                pal_status,
                mutual_pals_count,
                post_count,
                pal_count,
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

        switch (field) {
            case "Username":
                const [user_check] = await pool.query(
                    `SELECT EXISTS(SELECT 1 FROM users WHERE username = ? LIMIT 1) AS is_valid`,
                    [value]
                );

                if (user_check[0].is_valid) {
                    throw new Err("INVALID_VALUE_USERNAME");
                }

                sql = "UPDATE users SET username = ? WHERE user_id = ? LIMIT 1";
                break;

            case "Name":
                if (value.length < 3 || value.length > 64) {
                    throw new Err("INVALID_VALUE_NAME");
                }
                sql = "UPDATE users SET name = ? WHERE user_id = ? LIMIT 1";
                break;

            case "Major":
                value = svalues.major_l.find(
                    (val) => val.toLowerCase() === lvalue
                );
                if (!value) {
                    throw new Err("INVALID_VALUE_MAJOR");
                }
                sql = "UPDATE users SET major = ? WHERE user_id = ? LIMIT 1";
                break;

            case "Batch":
                if (!/^(201[5-9]|202[0-4])$/.test(value)) {
                    throw new Err("INVALID_VALUE_BATCH");
                }
                sql = "UPDATE users SET batch = ? WHERE user_id = ? LIMIT 1";
                break;

            case "Relationship status":
                value = values.relationship_status.find(
                    (val) => val.name.toLowerCase() === lvalue
                );
                if (!value) value = null;
                sql =
                    "UPDATE users SET relationship_status = ? WHERE user_id = ? LIMIT 1";
                break;

            case "Gender":
                value = values.gender.find(
                    (val) => val.name.toLowerCase() === lvalue
                );
                if (!value) value = null;
                sql = "UPDATE users SET gender = ? WHERE user_id = ? LIMIT 1";
                break;

            case "Contact No":
                if (!/^\+?[0-9]{10,15}$/.test(value)) {
                    throw new Err("INVALID_VALUE_CONTACT");
                }
                sql = "UPDATE users SET contact = ? WHERE user_id = ? LIMIT 1";
                break;

            case "Personal email":
                if (
                    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                        value
                    )
                ) {
                    throw new Err("INVALID_VALUE_EMAIL");
                }
                sql =
                    "UPDATE users SET personal_email = ? WHERE user_id = ? LIMIT 1";
                break;

            case "Personal website":
                if (!urlPattern.test(value)) {
                    throw new Err("INVALID_VALUE_WEBSITE");
                }
                sql = "UPDATE users SET website = ? WHERE user_id = ? LIMIT 1";
                break;

            case "Interested in":
                value = values.interested_in.find(
                    (val) => val.name.toLowerCase() === lvalue
                );
                if (!value) value = null;
                sql =
                    "UPDATE users SET interested_in = ? WHERE user_id = ? LIMIT 1";
                break;

            case "Date of birth":
                if (
                    !/^(?:(?!0000)\d{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/.test(
                        value
                    )
                ) {
                    throw new Err("INVALID_VALUE_BIRTHDATE");
                }
                age_ =
                    parseInt(new Date().getFullYear()) -
                    parseInt(value.substring(0, 4));
                await pool.query("UPDATE users SET age = ? WHERE user_id = ?", [
                    age_,
                    req.user.user_id,
                ]);
                sql =
                    "UPDATE users SET birth_date = ? WHERE user_id = ? LIMIT 1";
                break;

            default:
                throw new Err("INVALID_PROFILE_FIELD");
        }

        const [results] = await pool.query(sql, [value, req.user.user_id]);

        if (!results.affectedRows) {
            throw new Err("DATABASE_UPDATE_FAILED");
        }

        res.json(
            response(true, "PROFILE_UPDATE", {
                age_: age_ ? age_ : null,
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

        if (q == "%%") return res.json(response(true, "SEARCH_USERS", []));

        const [rows] = await pool.query(get_likeusers_prepared_stmt, [q, q]);

        rows.forEach((row) => {
            row.university = getUniNameByUniId(row.university);
        });

        res.json(response(true, "SEARCH_USERS", rows));
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

const sendPalProposal = async (req, res, next) => {
    let conn;
    try {
        // same person check
        if (req.query.user_id == req.user.user_id)
            throw new Err("SELF_PROPOSAL");

        conn = await pool.getConnection();
        await conn.beginTransaction();

        // checking whether they are already pals?
        const [rows_q1] = await conn.query(
            `SELECT EXISTS(SELECT 1 FROM pals WHERE (user_id = ? AND pal_user_id = ?) OR (user_id = ? AND pal_user_id = ?) LIMIT 1) AS pals_`,
            [
                req.query.user_id,
                req.user.user_id,
                req.user.user_id,
                req.query.user_id,
            ]
        );
        if (rows_q1[0].pals_) throw new Err("ALREADY_PALS");

        // checking whether if there are any existing proposals between 2?
        const [rows_q2] = await conn.query(
            `SELECT EXISTS(SELECT 1 FROM pal_proposals WHERE (user_id_from = ? AND user_id_to = ?) OR (user_id_from = ? AND user_id_to = ?) LIMIT 1) AS pals_`,
            [
                req.query.user_id,
                req.user.user_id,
                req.user.user_id,
                req.query.user_id,
            ]
        );
        if (rows_q2[0].pals_) throw new Err("PROPOSAL_DUPLICATION");

        // no expected errors proceed
        await conn.query(
            `INSERT INTO pal_proposals (
            user_id_from, 
            user_id_to 
        ) VALUES (?, ?)`,
            [req.user.user_id, req.query.user_id]
        );

        conn.commit();

        res.json(
            response(true, "SEND_PROPOSAL", {
                pal_status: 3,
            })
        );
    } catch (err) {
        if (conn) {
            await conn.rollback();
        }

        if (err instanceof Err) {
            res.json(response(false, err.message, {}));
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

const removePalProposal = async (req, res, next) => {
    try {
        await pool.query(
            `DELETE FROM pal_proposals WHERE user_id_from = ? AND user_id_to = ?;`,
            [req.user.user_id, req.query.user_id]
        );

        res.json(
            response(true, "WITHDRAW_PROPOSAL", {
                message: "Removed pal request successfully!",
                pal_status: 0,
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
                `INSERT INTO pals 
                (user_id, pal_user_id, from_user_id, to_user_id) 
                    VALUES 
                    (?, ?, ?, ?),
                    (?, ?, ?, ?)`,
                [
                    req.query.user_id,
                    req.user.user_id,
                    req.query.user_id,
                    req.user.user_id,
                    req.user.user_id,
                    req.query.user_id,
                    req.query.user_id,
                    req.user.user_id,
                ]
            );
        }
        await conn.commit();

        res.json(
            response(
                true,
                req.query.accept == "true"
                    ? "ACCEPT_PROPOSAL"
                    : "REJECT_PROPOSAL",
                {
                    pal_status: req.query.accept == "true" ? 1 : 0,
                }
            )
        );
    } catch (err) {
        if (conn) {
            await conn.rollback();
        }

        if (err instanceof Err) {
            res.json(response(false, err.message, {}));
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

const removePal = async (req, res, next) => {
    try {
        await pool.query(
            `DELETE FROM pals 
            WHERE 
              (user_id = ? AND pal_user_id = ?) 
              OR 
              (user_id = ? AND pal_user_id = ?) LIMIT 2;`,
            [
                req.query.user_id,
                req.user.user_id,
                req.user.user_id,
                req.query.user_id,
            ]
        );

        res.json(
            response(true, "UNPAL", {
                pal_status: 0,
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

        res.json(response(true, "GET_PROPOSALS", rows));
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

const checkUsername = async (req, res, next) => {
    try {
        const [user_check] = await pool.query(
            `SELECT EXISTS(SELECT 1 FROM users WHERE username = ? LIMIT 1) AS is_valid`,
            [req.query.username]
        );
        if (user_check[0].is_valid) throw new Err("INVALID_VALUE_USERNAME");

        res.json(response(true, "USERNAME_CHECK", {}));
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
    checkUsername,
};
