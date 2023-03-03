import { db } from "../database/connection.js";
import { nanoid } from "nanoid";

export async function insertUrl(req, res) {
    const session = res.locals.session;
    const { url } = req.body;

    try {
        const shortUrl = nanoid(6);

        await db.query('INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3)', [url, shortUrl, session.userId]);

        const id = await db.query("SELECT id FROM urls WHERE url = $1", [url]);

        return res.status(201).send({id: id.rows[0].id, shortUrl});
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getUrlById(req, res) {
    const requestedId = req.params.id;

    try {
        const getUrl = await db.query('SELECT * FROM urls WHERE id = $1', [requestedId]);

        if(!getUrl.rows[0]) return res.sendStatus(404);

        const result = {
            id: getUrl.rows[0].id,
            shortUrl: getUrl.rows[0].shortUrl,
            url: getUrl.rows[0].url
        }

        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function openUrl(req, res) {
    const requestedUrl = req.params.shortUrl;

    try {
        const getUrl = await db.query('SELECT * FROM urls WHERE "shortUrl" = $1', [requestedUrl]);

        if(!getUrl.rows[0]) return res.sendStatus(404);

        await db.query("UPDATE urls SET views = $1 WHERE id = $2", [(getUrl.rows[0].views + 1), getUrl.rows[0].id]);

        res.redirect(getUrl.rows[0].url);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function deleteUrl(req, res) {
    const requestedId = req.params.id;
    const session = res.locals.session;

    try {
        const checkUrl = await db.query('SELECT * FROM urls WHERE id = $1', [requestedId]);

        if(!checkUrl.rows[0]) return res.sendStatus(404);

        if(session.userId !== checkUrl.rows[0].userId) return res.sendStatus(401);

        await db.query("DELETE FROM urls WHERE id = $1", [requestedId]);

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}