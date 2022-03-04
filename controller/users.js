import { json, response } from "express";
import { query } from "./utils/db.js";
import { nanoid } from "nanoid";

export async function register(req, res = response) {
    const { email, password } = req.body;
    const id = nanoid();
    // add to db
    query("INSERT INTO Users VALUES (?)", [[id, email, password]])
        .then((result) => {
            console.log("Affected rows: " + result.affectedRows);
            res.json({ success: true, id: id });
        })
        .catch(err => {
            console.error(err);
            res.json({ success: false, id: "" });
        })
}

export async function login(req, res = response) {
    const { email, password } = req.body;
    console.log("login");
    query("SELECT id, password FROM Users WHERE email=?", [email])
        .then(result => {
            const user = JSON.parse(JSON.stringify(result))[0]
            if (!user) {
                res.json({ success: false, id: "" });
            } else {
                const { password: correctPassword, id } = user;
                console.log(correctPassword);
                if (password == correctPassword) {
                    res.json({ success: true, id: id });
                } else {
                    res.json({ success: false, id: "" });
                }
            }
        })
        .catch(err => {
            console.error(err);
        })
}