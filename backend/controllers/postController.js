const pool = require("../database");

const insert_post_prepared_stmt = `INSERT INTO posts (
    user_id, 
    is_anonymous, 
    visibility, 
    created_at, 
    content
) VALUES (?, ?, ?, ?, ?)`;

exports.addPost = async (req, res, next) => {
    try {
        const timestamp = new Date();

        const [result] = await pool.query(insert_post_prepared_stmt, [
            req.user.user_id,
            req.body.hideme,
            req.body.visibility,
            timestamp,
            req.body.content,
        ]);

        const [rows] = await pool.query(
            "SELECT * FROM posts WHERE post_id = ?",
            [result.insertId]
        );

        const post_ = rows[0];
        console.log(rows);
        console.log("at here");
        console.log(post_);
        res.json({
            status: "SUCCESS",
            code: "NONE",
            data: post_,
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

/*This query should me modified! [Post filtering algorithm]*/
const get_posts_prepared_stmt = `SELECT * FROM posts LIMIT 10 OFFSET ?`;

exports.getPosts = async (req, res, next) => {
    try {
        console.log("Get Posts");
        const offset = parseInt(req.query.from);

        let [rows] = await pool.query(get_posts_prepared_stmt, [offset]);

        rows.forEach((item) => {
            item.comments = [];
        });

        await new Promise((resolve) => setTimeout(resolve, 5000));

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

const insert_comment_prepared_stmt = `INSERT INTO comments (
    post_id, 
    user_id, 
    created_at, 
    content
) VALUES (?, ?, ?, ?)`;

exports.addComment = async (req, res, next) => {
    try {
        const timestamp = new Date();

        console.log("add comment req");
        console.log(
            req.params.post_id,
            req.user.user_id,
            timestamp,
            req.body.content
        );

        const [result] = await pool.query(insert_comment_prepared_stmt, [
            req.params.post_id,
            req.user.user_id,
            timestamp,
            req.body.content,
        ]);

        const [rows] = await pool.query(
            `SELECT * FROM comments WHERE comment_id = ?`,
            [result.insertId]
        );

        console.log(rows);

        res.json({
            status: "SUCCESS",
            code: "NONE",
            data: rows[0],
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

const get_comments_prepared_stmt = `SELECT * FROM comments WHERE post_id = ? LIMIT 5 OFFSET ?`;

exports.getComments = async (req, res, next) => {
    try {
        const post_id = parseInt(req.params.post_id);
        const offset = parseInt(req.query.from);

        let [rows] = await pool.query(get_comments_prepared_stmt, [
            post_id,
            offset,
        ]);

        await new Promise((resolve) => setTimeout(resolve, 5000));

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
