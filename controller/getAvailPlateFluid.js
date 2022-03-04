import { response } from "express";
import { fluidProps, plateMats } from "./utils/constants.js";

function getFluids(){
    return Object.keys(fluidProps).reduce((obj, key)=>{
        const first = fluidProps[key].t[0];
        const last = fluidProps[key].t[fluidProps[key].t.length - 1];
        return {
            ...obj,
            [key]: [Math.min(first, last), Math.max(first, last)]
        }
    }, {});
}

function getPlates(){
    return Object.keys(plateMats);
}

async function getAvail(req, res = response){
    res.json({
        fluids: getFluids(),
        plates: getPlates()
    })
}

export default getAvail;