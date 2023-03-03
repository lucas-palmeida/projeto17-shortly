import { db } from "../database/connection.js";

export async function authValidation(req, res, next) {
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");

    if(!token) return res.status(401).send("Informe um token.");

    try {
        const checkSession = await db.query("SELECT * FROM sessions WHERE token = $1", [token]);

        if(!checkSession.rows[0]) return res.status(401).send("Informe um token válido.");

        res.locals.session = checkSession.rows[0];

        return next();
    } catch (error) {
        return res.status(500).send(error.message);
    }
}