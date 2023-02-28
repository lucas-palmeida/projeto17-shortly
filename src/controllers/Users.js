import { db } from "../database/connection.js";

export async function registerUser(req, res) {
    const { name, email, password } = req.body;

    try {
        const userExists = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if(userExists.rows[0]) return res.status(409).send("Não foi possível concluir o cadastro.");

        await db.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, password]);

        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}