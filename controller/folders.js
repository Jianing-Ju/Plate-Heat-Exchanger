import { response } from "express";
import { query } from "./utils/db.js";
import { nanoid } from "nanoid";

export function addFolder(req, res=response){
    const {name, userId, rank} = req.body;
    // new folder
    const id = nanoid();
    query("INSERT INTO Folders VALUES (?)", [[id, name, userId, rank]]).then(()=>{
        res.json({ok: true});
    })
    .catch((err)=>{
        console.error("Insert to folders", err);
    })
}

export function getFolders(req, res=response){
    const {userId} = req.params;
    query(`SELECT * FROM Folders WHERE userId="${userId}"`).then((result)=>{
        res.json(JSON.parse(JSON.stringify(result)));
    }).catch((err)=>{
        console.error("Select folders", err);
    })
}

// export function setFolder(req, res=response){
//     const {folderId, designId} = req.body;
//     query(`UPDATE Designs SET folderId="${folderId}" WHERE id="${designId}"`).then(()=>{
//         res.json({ok: true});
//     }).catch((err)=>{
//         console.error("Set design folder", err);
//     })
// }
export function setFolder(req, res=response){
    const {folderId, designId} = req.body;
    const designIdString = designId.join('","');
    query(`UPDATE Designs SET folderId="${folderId}" WHERE id IN ("${designIdString}")`).then(()=>{
        res.json({ok: true});
    }).catch((err)=>{
        console.error("Set design folder", err);
    })
}

export async function deleteFolder(req, res=response){
    const {folderId} = req.params;
    // set designs in folder to have NULL folder
    await query(`UPDATE Designs SET folderId=NULL WHERE folderId="${folderId}"`)
    .then(()=>{return Promise.resolve()})
    .catch((err)=> console.error("Set folder to NULL", err));
    // delete folder
    query(`DELETE FROM Folders WHERE id="${folderId}"`).then(()=>{
        res.json({ok: true});
    }).catch((err)=>{
        console.error("Delete folder", err);
    })
}