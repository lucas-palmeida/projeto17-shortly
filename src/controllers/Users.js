import { db } from "../database/connection.js";

export async function getUser(req, res) {
    const session = res.locals.session;

    try {
        const requestedUser = await db.query(`
            SELECT 
                users.id,
                users.name,
                COALESCE(SUM(urls.views), 0) AS "visitCount"
            FROM users
            LEFT JOIN urls ON users.id = urls."userId"
            WHERE users.id = $1
            GROUP BY users.id`, [session.userId]);

        const checkUrls = await db.query(`
            SELECT 
                id, "shortUrl", url, views AS "visitCount" 
            FROM urls 
            WHERE "userId" = $1`, [session.userId]
        );

        requestedUser.rows[0].shortenedUrls = checkUrls.rows;

        console.log(requestedUser.rows[0]);
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}