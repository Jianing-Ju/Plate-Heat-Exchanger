import { response } from "express";
import { nanoid } from "nanoid";
import { query, now } from "./utils/db.js";
import { flatten, unFlatten } from "./utils/inputConverter.js";

export async function designExists(req, res = response) {
    const { designId } = req.params;
    query(`SELECT inputId FROM Designs WHERE id="${designId}"`).then(result => {
        const design = JSON.parse(JSON.stringify(result))[0];
        if (!design) {
            res.json({ exists: false, inputId: "" });
        } else {
            res.json({ exists: true, inputId: design.inputId });
        }
    }).catch(err => {
        console.error("Query design id", err);
    });

}

export async function updateDesign(req, res = response) {
    const { inputId, inputs} = req.body;
    const updateInput = flatten(inputs);
    query(`UPDATE Designs SET lastModified = "${now()}" WHERE inputId = "${inputId}"`).catch(err =>{
        console.error(err);
    })
    query(`UPDATE Inputs SET ? WHERE id = "${inputId}"`, updateInput).then(result => {
        // console.log("exist", result);
        res.json({ success: true });
    }).catch(err => {
        console.error(err);
    });
}

export async function saveDesign(req, res = response) {
    const { userId, designId, inputs, type, name} = req.body;
    const inputId = nanoid();
    // add in input
    const columns = ["id"], values = [inputId];
    Object.values(inputs).forEach(type => {
        Object.entries(type).forEach(input => {
            columns.push(input[0]);
            values.push(input[1]);
        })

    });
    query("INSERT INTO Inputs (??) VALUES (?)", [columns, values]).catch((err) => {
        console.error("Insert into Inputs", err);
    })

    // add in design
    // if already has name, add (2) behind
    let finalName = name, valid = false;
    while (!valid) {
        finalName = await query(`SELECT count(*) FROM Designs WHERE userId="${userId}" AND name="${finalName}"`)
            .then((result) => {
                const count = JSON.parse(JSON.stringify(result))[0]["count(*)"];
                if (count == 1){
                    const last = finalName.lastIndexOf("(");
                    const dup = +finalName.slice(last+1, finalName.length - 1);
                    if (!isNaN(dup)) return Promise.resolve(`${finalName.slice(0,finalName.length-3)}(${dup+1})`);
                    else return Promise.resolve(finalName + "(2)");
                }
                else {
                    valid = true;
                    return Promise.resolve(finalName);
                }
            }).catch((err) => {
                console.error("Query name in Designs", err);
            })
    }
    const designCols = ["id", "designType", "userId", "inputId", "name", "lastModified"];
    const designVals = [designId, type, userId, inputId, finalName, now()];
    query("INSERT INTO Designs (??) VALUES (?)", [designCols, designVals]).then((result) => {
        res.json({ name: finalName });
    }).catch((err) => {
        console.error("Insert into Deisgns", err);
    });
}

export async function getDesigns(req, res = response) {
    const { userId } = req.params;
    query(`SELECT * FROM Designs WHERE userId="${userId}"`).then(result=>{
        const designs = JSON.parse(JSON.stringify(result));
        // console.log(designs);
        res.json(designs);
    }).catch(err => {
        console.error("Get all designs", err);
    })
}

export async function getInput(req, res = response){
    const { designId } = req.params;
    // get inputId of designId
    const inputId = await getInputId(designId);
    query(`SELECT * FROM Inputs WHERE id="${inputId}"`).then(result=>{
        const inputs = JSON.parse(JSON.stringify(result))[0];
        // to correct format
        const formattedInput = unFlatten(inputs);
        res.json(formattedInput);
    }).catch(err => {
        console.error("Get input", err);
    })
}

export async function deleteDesign(req, res = response){
    const {designId} = req.params;
    // get inputId of designId
    const inputId = await getInputId(designId);
    // delete design
    await query(`DELETE FROM Designs WHERE id="${designId}"`).then(result=>{
        return Promise.resolve();
    }).catch(err=>{
        console.error("Delete deisgn", err);
    })
    // delete input
    query(`DELETE FROM Inputs WHERE id="${inputId}"`).then(result=>{
        res.json({ok: true});
    }).catch(err=>{
        console.error("Delete input", err);
    })
}

async function getInputId(designId){
    return await query(`SELECT inputId FROM Designs WHERE id="${designId}"`).then(result=>{
        return Promise.resolve(JSON.parse(JSON.stringify(result))[0].inputId);
    })
}