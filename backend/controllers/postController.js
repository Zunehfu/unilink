import pool from "../utils/database.js";
import Err from "../utils/customErr.js";
import response from "../utils/response.js";

const insert_post_prepared_stmt = `INSERT INTO posts (
    user_id, 
    is_anonymous, 
    visibility, 
    created_at, 
    content
) VALUES (?, ?, ?, ?, ?)`;

const addPost = async (req, res, next) => {
    try {
        const timestamp = new Date();

        console.log(req.body);

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
        res.json(response(true, "ADD_POST", post_));
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

/*This query should be modified! [Post filtering algorithm]*/
const get_posts_prepared_stmt = `
SELECT 
    posts.*, 
    users.username, 
    users.name,
    (SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.post_id) AS like_count,
    (SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.post_id) AS comment_count,
    CASE 
        WHEN likes.user_id IS NULL THEN 0 
        ELSE 1 
    END AS liked
FROM posts 
JOIN users ON posts.user_id = users.user_id 
LEFT JOIN likes ON posts.post_id = likes.post_id AND likes.user_id = ?
LIMIT 10 OFFSET ?`;

const getPosts = async (req, res, next) => {
    let conn;
    try {
        const offset = parseInt(req.query.from, 10);
        const userId = req.user.user_id;

        conn = await pool.getConnection();

        const [posts] = await conn.query(get_posts_prepared_stmt, [
            userId,
            offset,
        ]);

        res.json(
            response(
                true,
                "GET_POSTS",
                posts.map((post) => ({
                    ...post,
                    liked: post.liked === 1,
                }))
            )
        );

        console.log(posts);
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

const insert_comment_prepared_stmt = `INSERT INTO comments (
    post_id, 
    user_id, 
    created_at, 
    content
) VALUES (?, ?, ?, ?)`;

const addComment = async (req, res, next) => {
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

        res.json(response(true, "ADD_COMMENT", rows[0]));
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

const get_comments_prepared_stmt = `SELECT comments.*, users.username, users.name 
FROM comments 
JOIN users 
ON comments.user_id = users.user_id
WHERE comments.post_id = ? 
LIMIT 5 OFFSET ?;`;

const getComments = async (req, res, next) => {
    try {
        const post_id = parseInt(req.params.post_id);
        const offset = parseInt(req.query.from);

        let [rows] = await pool.query(get_comments_prepared_stmt, [
            post_id,
            offset,
        ]);

        await new Promise((resolve) => setTimeout(resolve, 5000));

        res.json(response(true, "GET_COMMENTS", rows));
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

const add_like_stmt = `
INSERT INTO likes (post_id, user_id, created_at)
VALUES (?, ?, ?);
`;

const addLike = async (req, res, next) => {
    try {
        await pool.query(add_like_stmt, [
            req.params.post_id,
            req.user.user_id,
            new Date(),
        ]);

        res.json(response(true, "ADD_LIKE", {}));
    } catch (err) {
        console.log(err);
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

const remove_like_stmt = `DELETE FROM likes
WHERE user_id = ? AND post_id = ?;
`;

const removeLike = async (req, res, next) => {
    console.log("fwafaw");
    try {
        await pool.query(remove_like_stmt, [
            req.user.user_id,
            req.params.post_id,
        ]);
        res.json(response(true, "REMOVE_LIKE", {}));
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
    addPost,
    addLike,
    removeLike,
    addComment,
    getComments,
    getPosts,
};
