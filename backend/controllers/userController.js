const pool = require("../database");
const moment = require("moment");

const get_user_prepared_stmt__user_id = `SELECT * FROM users WHERE user_id = ?`;

exports.getUserWithId = async (req, res, next) => {
    try {
        console.log(req.query);
        await new Promise((resolve) => setTimeout(resolve, 5000));

        const [rows] = await pool.query(get_user_prepared_stmt__user_id, [
            req.query.id == "myprofile" ? req.user.user_id : req.query.user_id,
        ]);

        const user_ = rows[0];

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

        console.log({
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
            },
        });

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
