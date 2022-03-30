import express from "express";
import routerCal from "./routes/calculate.js";
import routerAvail from "./routes/getAvailPlateFluid.js";
import routerUser from "./routes/user.js";
import routerDesigns from "./routes/designs.js";
import routerFolders from "./routes/folders.js";
import routerCharts from "./routes/charts.js";
import routerPlateGeo from "./routes/plateGeometries.js";
import routerFluidCond from "./routes/fluidConditions.js";
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
    charts: "/api/charts",
    plateGeometries: "/api/plate-geo",
    fluidConditions: "/api/fluid-cond"
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
app.use(paths.plateGeometries, routerPlateGeo);
app.use(paths.fluidConditions, routerFluidCond);

// listen
app.listen(process.env.PORT || port, ()=>{
    console.log("Server started.");
})