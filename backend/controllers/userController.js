const pool = require("../database");
const moment = require("moment");
const response = require("../utilities/response");

const get_user_prepared_stmt__user_id = `SELECT * FROM users WHERE user_id = ? LIMIT 1`;

exports.getUserWithId = async (req, res, next) => {
    try {
        console.log(req.query);
        // await new Promise((resolve) => setTimeout(resolve, 5000));
        let pal_status = 0;

        const user_id =
            req.query.id == "myprofile" ? req.user.user_id : req.query.user_id;

        const [rows_q1] = await pool.query(get_user_prepared_stmt__user_id, [
            user_id,
        ]);

        const [rows_q3] = await pool.query(
            `SELECT EXISTS(SELECT 1 FROM pals WHERE (user_id_from = ? AND user_id_to = ?) OR (user_id_from = ? AND user_id_to = ?) LIMIT 1) AS pals_`,
            [req.user.user_id, user_id, user_id, req.user.user_id]
        );

        console.log({ rows_q3 });

        if (rows_q3[0].pals_) pal_status = 1;

        if (pal_status == 0) {
            const [rows_q2] = await pool.query(
                `SELECT user_id_from, user_id_to FROM pal_proposals WHERE (user_id_from = ? AND user_id_to = ?) OR (user_id_from = ? AND user_id_to = ?) LIMIT 1;`,
                [req.user.user_id, user_id, user_id, req.user.user_id]
            );

            if (0 < rows_q2.length) {
                if (rows_q2[0].user_id_from == req.user.user_id) pal_status = 3;
                else pal_status = 2;
            }

            console.log({ rows_q2 });
        }

        const user_ = rows_q1[0];

        if (!user_)
            return res.json({
                status: "ERROR",
                code: "INVALID_USER_ID",
                data: {
                    message: "This person doesn't exist",
                },
            });

        // user_.lastOnline_formatted = moment(user_.lastOnline).format(
        //     "YYYY-MM-DD hh:mm A"
        // );

        res.json({
            status: "SUCCESS",
            code: "NONE",
            data: {
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

exports.betaresponse = async (req, res, next) => {
    try {
        console.log("betaresponse req recieved!");
        console.log(req.body);

        let sql = "";

        const field = req.body.field;

        if (field === "Username") {
            sql = "UPDATE users SET username = ? WHERE user_id = ?";
        } else if (field === "Name") {
            sql = "UPDATE users SET name = ? WHERE user_id = ?";
        } else if (field === "Age") {
            sql = "UPDATE users SET age = ? WHERE user_id = ?";
        } else if (field === "Major") {
            sql = "UPDATE users SET major = ? WHERE user_id = ?";
        } else if (field === "Batch") {
            sql = "UPDATE users SET batch = ? WHERE user_id = ?";
        } else if (field === "Relationship status") {
            sql = "UPDATE users SET relationship_status = ? WHERE user_id = ?";
        } else if (field === "Gender") {
            sql = "UPDATE users SET gender = ? WHERE user_id = ?";
        } else if (field === "Contact No") {
            sql = "UPDATE users SET contact = ? WHERE user_id = ?";
        } else if (field === "Personal email") {
            sql = "UPDATE users SET personal_email = ? WHERE user_id = ?";
        } else if (field === "Personal website") {
            sql = "UPDATE users SET website = ? WHERE user_id = ?";
        } else if (field === "Interested in") {
            sql = "UPDATE users SET interested_in = ? WHERE user_id = ?";
        } else if (field === "Date of birth") {
            sql = "UPDATE users SET birth_date = ? WHERE user_id = ?";
        } else {
            return res.json({
                status: "ERROR",
                code: "INVALID_PROFILE_FIELD",
                data: {
                    message: "Cannot be updated at the moment!",
                },
            });
        }

        console.log(sql);

        const [results] = await pool.query(sql, [
            req.body.value,
            req.user.user_id,
        ]);
        console.log(results);

        if (results.changedRows != 1) {
            return res.json({
                status: "ERROR",
                code: "DATABASE_UPDATE_FAILED",
                data: { message: "Something went wrong!" },
            });
        }

        res.json({
            status: "SUCCESS",
            code: "NONE",
            data: { message: "Profile updated successfully!" },
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

const get_likeusers_prepared_stmt = `
        SELECT user_id, username, name, university
        FROM users
        WHERE username LIKE ?
           OR Name LIKE ?
        LIMIT 10;`;

exports.getLikeUsers = async (req, res, next) => {
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

exports.sendPalProposal = async (req, res, next) => {
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

exports.removePalProposal = async (req, res, next) => {
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

exports.removeMyPalProposal = async (req, res, next) => {
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

exports.removePal = async (req, res, next) => {
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

exports.getMyPalProposals = async (req, res, next) => {
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

// exports.getPals = async (req, res, next) => {
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
