import { db } from "../database/connection.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export async function signUp(req, res) {
    const { name, email, password } = req.body;

    try {
        const userExists = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if(userExists.rows[0]) return res.status(409).send("Não foi possível concluir o cadastro.");

        await db.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, bcrypt.hashSync(password, 10)]);

        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const checkUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if(!checkUser.rows[0]) return res.status(401).send("Verifique o email e/ou senha.");

        const checkPassword = bcrypt.compareSync(password, checkUser.rows[0].password);

        if(!checkPassword) return res.status(401).send("Verifique o email e/ou senha.");

        const token = uuidv4();

        await db.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2)', [checkUser.rows[0].id, token]);

        return res.status(200).send({token});
    } catch (error) {
        return res.status(500).send(error.message);
    }
}