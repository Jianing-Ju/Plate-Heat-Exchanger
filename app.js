import express from "express";
import routerCal from "./routes/calculate.js";
import routerAvail from "./routes/getAvailPlateFluid.js";
import routerUser from "./routes/user.js";
import routerDesigns from "./routes/designs.js";
import routerFolders from "./routes/folders.js";
import routerCharts from "./routes/charts.js"
import cors from "cors";
import { dirname } from 'path';

const app = express();
const port = 5000;
const paths = {
    calculate: "/api/calculate",
    getAvailPlateFluid: "/api/get-avail",
    user: "/api/user",
    designs: "/api/designs",
    folders: "/api/folders",
    charts: "/api/charts"
}

// CORS
app.use(cors());

// serve static files
app.use(express.static('public'))

// parser
app.use(express.json())

// routes
app.use(paths.calculate, routerCal);
app.use(paths.getAvailPlateFluid, routerAvail);
app.use(paths.user, routerUser);
app.use(paths.designs, routerDesigns);
app.use(paths.folders, routerFolders);
app.use(paths.charts, routerCharts);

// listen
app.listen(port, ()=>{
    console.log("Server started.");
})