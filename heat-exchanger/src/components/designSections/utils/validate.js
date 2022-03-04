export const validData = {
    plateThick: [0.5, 1.2],
    plateEnlarge: [1.1, 1.5],
    plateBeta: [25, 65],
    platePortDia: [0.03, 0.45],
    plateWidth: [0.1, 2.4],
    platePortDisH: [0.1, 2.4],
    platePortDisV: [0.3, 4.3],
    plateLength: [0.3, 4.3],
    platePitch: [2.5, 6.2],
    plateNum: [10, 700],
    plateCond: [1, 500],

    fluidInTempH: [],
    fluidInTempC: [],
    fluidOutTempH: [],
    fluidOutTempC: [],
    fluidMRateH: [0.05, 1400],
    fluidMRateC: [0.05, 1400],
    fluidMaxPDropH: [0, 100000000],
    fluidMaxPDropC: [0, 100000000],
    fluidFoulingH: [0, 0.01],
    fluidFoulingC: [0, 0.01],

    flowPassH: [1, 4],
    flowPassC: [1, 4]
}

export function validate(value, range) {
    return value >= range[0] && value <= range[1];
}

export function updateGeo(name, geoData) {
    if (name == "platePortDia") {
        if (geoData["platePortDisH"])
            geoData["plateWidth"] = geoData["platePortDisH"] + geoData[name];
        if (geoData["plateWidth"])
            geoData["platePortDisH"] = geoData["plateWidth"] - geoData[name];
        if (geoData["platePortDisV"])
            geoData["plateLength"] = geoData["platePortDisV"] + geoData[name];
        if (geoData["plateLength"])
            geoData["platePortDisV"] = geoData["plateLength"] - geoData[name];
    } else if (name == "platePortDisH") {
        if (geoData["platePortDia"])
            geoData["plateWidth"] = geoData["platePortDia"] + geoData[name];
        if (geoData["plateWidth"])
            geoData["platePortDia"] = geoData["plateWidth"] - geoData[name];
    } else if (name == "plateWidth") {
        if (geoData["platePortDia"])
            geoData["platePortDisH"] = geoData[name] - geoData["platePortDia"];
        if (geoData["platePortDisH"])
            geoData["platePortDia"] = geoData[name] - geoData["platePortDisH"];
    } else if (name == "platePortDisV") {
        if (geoData["platePortDia"])
            geoData["plateLength"] = geoData[name] - geoData["platePortDia"];
        if (geoData["plateLength"])
            geoData["platePortDia"] = geoData[name] - geoData["plateLength"];
    } else if (name == "plateLength") {
        if (geoData["platePortDia"])
            geoData["platePortDisV"] = geoData["platePortDia"] + geoData[name];
        if (geoData["platePortDisV"])
            geoData["platePortDia"] = geoData["platePortDisV"] - geoData[name];
    }
}