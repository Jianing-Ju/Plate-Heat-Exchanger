import { response } from "express";
import { parse, query } from "./utils/db.js";
import {nanoid} from "nanoid";

export async function savePlateGeo(req, res = response) {
    const { data } = req.body;
    const columns = [...Object.keys(data), "id"];
    const values = [...Object.values(data), nanoid()];
    query("INSERT INTO PlateGeometries (??) VALUES (?)", [columns, values]).then(() => {
        res.json({ ok: true });
    }).catch((err) => {
        console.error("Insert to plate", err);
        res.json({ ok: false });
    })
}

export async function getPlateGeos(req, res = response){
    const {userId} = req.params;
    query(`SELECT * FROM PlateGeometries WHERE userId="${userId}"`).then((result)=>{
        res.json(parse(result));
    })
}