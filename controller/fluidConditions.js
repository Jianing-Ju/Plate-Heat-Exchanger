import { response } from "express";
import {nanoid} from "nanoid";
import { parse, query } from "./utils/db.js";

export async function saveFluidCond(req, res = response){
    const {data} = req.body;
    const columns = [...Object.keys(data), "id"];
    const values = [...Object.values(data), nanoid()];
    query("INSERT INTO FluidConditions (??) VALUE (?)", [columns, values]).then(()=>{
        res.json({ok: true});
    }).catch((err)=>{
        console.error("Insert into fluid", err);
        res.json({ok: false});
    })
}

export async function getFluidConds(req, res = response){
    const {userId} = req.params;
    query(`SELECT * FROM FluidConditions WHERE userId="${userId}"`).then((result)=>{
        res.json(parse(result));
    })
}