import { response } from "express";
import { parseAsync } from "json2csv";
import { promises as fs } from "fs";
import { parse, query, now } from "./utils/db.js";
import { rating } from "./calculator/rating.js";
import { sizing } from "./calculator/sizing.js";
import { unFlatten } from "./utils/inputConverter.js";
// import fs from "fs";
import csvtojson from "csvtojson";
import { nanoid } from "nanoid";

export async function exportCharts(req, res = response) {
    const { designId: designIds } = req.body;
    const allData = [];
    let errorCount = 0;
    designIds.reduce((p, designId, index) => p.then(async() => {
        // get name and input
        const { inputId, name, designType } =
            await query(`SELECT inputId, name, designType FROM Designs WHERE id="${designId}"`).then(result => {
                return parse(result)[0];
            }).catch(err => {
                console.err("Get deisgns", err);
            })
        console.log("inputId", inputId)
        // dup!!
        const flatInput = await query(`SELECT * FROM Inputs WHERE id="${inputId}"`).then(result => {
            return JSON.parse(JSON.stringify(result))[0];
        }).catch(err => {
            console.error("Get input", err);
        })
        // calculate results
        const input = unFlatten(flatInput);
        let calRes;
        if (designType == "rating") {
            calRes = rating(input);
        } else {
            calRes = sizing(input);
        }
        // if not okay, return
        if (!calRes.ok) {
            errorCount += 1;
            return;
        }
        // compile data
        const iterData = calRes.heatTransfer.reduce((obj, iter, i) => {
            const iterWithCaption = Object.entries(iter).reduce((obj, pair) => ({
                ...obj,
                [`iter${i + 1}-${pair[0]}`]: pair[1]
            }), {});
            return {
                ...obj,
                ...iterWithCaption
            }
        }, {})
        const singleData = {
            name: name,
            type: designType,
            ...flatInput,
            ...calRes.config,
            ...iterData,
            ...calRes.pressure,
        }
        // console.log(singleData)
        allData.push(singleData);
        if (index == designIds.length - 1) {
            if (errorCount == designId.length){
                res.status(400).send("Cannot calculate");
                return;
            }
            parseAsync(allData, { fields: Object.keys(allData[0]) }).then(async csv => {
                const filename = `./csv/design-${designId}.csv`;
                await fs.writeFile(filename, csv);
                res.download(filename, "download.csv")
            })
        }

    }), Promise.resolve());

    // // get name and input
    // const { inputId, name, designType } =
    //     await query(`SELECT inputId, name, designType FROM Designs WHERE id="${designId}"`).then(result => {
    //         return parse(result)[0];
    //     }).catch(err => {
    //         console.err("Get deisgns", err);
    //     })
    // console.log("inputId", inputId)
    // // dup!!
    // const flatInput = await query(`SELECT * FROM Inputs WHERE id="${inputId}"`).then(result => {
    //     return JSON.parse(JSON.stringify(result))[0];
    // }).catch(err => {
    //     console.error("Get input", err);
    // })
    // // calculate results
    // const input = unFlatten(flatInput);
    // let calRes;
    // if (designType == "rating") {
    //     calRes = rating(input);
    // } else {
    //     calRes = sizing(input);
    // }
    // // if not okay, return
    // if (!calRes.ok){
    //     res.status(400).send("Cannot calculate");
    //     return;
    // }
    // // save as csv
    // const iterData = calRes.heatTransfer.reduce((obj, iter, i) => {
    //     const iterWithCaption = Object.entries(iter).reduce((obj, pair) => ({
    //         ...obj,
    //         [`iter${i + 1}-${pair[0]}`]: pair[1]
    //     }), {});
    //     return {
    //         ...obj,
    //         ...iterWithCaption
    //     }
    // }, {})
    // const singleData = {
    //     name: name,
    //     type: designType,
    //     ...flatInput,
    //     ...calRes.config,
    //     ...iterData,
    //     ...calRes.pressure,
    // }
    // // console.log(singleData)

    // parseAsync(singleData, { fields: Object.keys(singleData) }).then(async csv => {
    //     const filename = `./csv/design-${designId}.csv`;
    //     await fs.writeFile(filename, csv);
    //     res.download(filename, "download.csv")
    // })

}

export async function uploadChart(req, res = response) {
    const file = req.file;
    const { userId } = req.params;
    const obj = await csvtojson().fromString(file.buffer.toString('utf8'));
    obj.reduce((p, row, i) => p.then(async () => {
        // add to database
        const { name, type } = row;
        console.log(name);
        const inputs = Object.entries(row).filter((pair) => pair[0].search("plate") == 0 ||
            pair[0].search("fluid") == 0 || pair[0].search("flow") == 0).reduce((obj, pair) => ({
                ...obj,
                [pair[0]]: pair[1]
            }), {});
        // dup!! from designs
        const inputId = nanoid();
        const designId = nanoid();
        // add in input
        const columns = ["id"], values = [inputId];
        // diff!!
        Object.entries(inputs).forEach(input => {
            columns.push(input[0]);
            values.push(input[1]);
        });
        // diff!!
        await query("INSERT INTO Inputs (??) VALUES (?)", [columns, values]).catch((err) => {
            console.error("Insert into Inputs", err);
        })

        // add in design
        // if already has name, add (2) behind
        let finalName = name, valid = false;
        while (!valid) {
            finalName = await query(`SELECT count(*) FROM Designs WHERE userId="${userId}" AND name="${finalName}"`)
                .then((result) => {
                    const count = JSON.parse(JSON.stringify(result))[0]["count(*)"];
                    if (count == 1) {
                        const last = finalName.lastIndexOf("(");
                        const dup = +finalName.slice(last + 1, finalName.length - 1);
                        if (!isNaN(dup)) return Promise.resolve(`${finalName.slice(0, finalName.length - 3)}(${dup + 1})`);
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
            // diff!
            if (i == obj.length - 1) {
                res.json({ ok: true });
            }
            // diff!
        }).catch((err) => {
            console.error("Insert into Deisgns", err);
        });
        // dup!!

    }), Promise.resolve())
}