import { response } from "express";
import { rating } from "./rating.js";
import { sizing } from "./sizing.js";

const calculate = async (req, res = response) => {
    const { type } = req.params;
    if (type == "rating") {
        res.json(rating(req.body));
    } else if (type == "sizing") {
        res.json(sizing(req.body));
    } else {
        console.error("URL should contain sizing or rating");
    }

}

export default calculate;