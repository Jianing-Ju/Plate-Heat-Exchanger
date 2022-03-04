export function Input(autofill = false, plateMat = "", plateThick = "", plateEnlarge = "", plateBeta = "",
    platePortDia = "", plateWidth = "", platePortDisH = "", platePortDisV = "", plateLength = "",
    platePitch = "", plateNum = "", fluidTypeH = "", fluidTypeC = "", fluidInTempH = "",
    fluidInTempC = "", fluidOutTempH = "", fluidOutTempC = "", fluidMRateH = "", fluidMRateC = "",
    fluidMaxPDropH = "", fluidMaxPDropC = "", flowPassH = "", flowPassC = "",
    fluidFoulingH = "", fluidFoulingC = "", plateCond = "") {
    if (!autofill) {
        this.plate = {
            plateMat: plateMat,
            plateThick: plateThick,
            plateEnlarge: plateEnlarge,
            plateBeta: plateBeta,
            platePortDia: platePortDia,
            plateWidth: plateWidth,
            platePortDisH: platePortDisH,
            platePortDisV: platePortDisV,
            plateLength: plateLength,
            platePitch: platePitch,
            plateNum: plateNum,
            plateCond: plateCond
        }
        this.fluid = {
            fluidTypeH: fluidTypeH,
            fluidTypeC: fluidTypeC,
            fluidInTempH: fluidInTempH,
            fluidInTempC: fluidInTempC,
            fluidOutTempH: fluidOutTempH,
            fluidOutTempC: fluidOutTempC,
            fluidMRateH: fluidMRateH,
            fluidMRateC: fluidMRateC,
            fluidMaxPDropH: fluidMaxPDropH,
            fluidMaxPDropC: fluidMaxPDropC,
            fluidFoulingH: fluidFoulingH,
            fluidFoulingC: fluidFoulingC
        }
        this.flow = {
            flowPassH: flowPassH,
            flowPassC: flowPassC
        }

    } else {
        this.plate = {
            plateMat: "Stainless Steel (ANSI 304)",
            plateThick: 0.6,
            plateEnlarge: 1.14,
            plateBeta: 45,
            platePortDia: 0.2,
            plateWidth: 0.55,
            platePortDisH: 0.35,
            platePortDisV: 1.55,
            plateLength: 1.35,
            platePitch: 3.6,
            plateNum: 105,
            plateCond: plateCond
        }
        this.fluid = {
            fluidTypeH: "Water",
            fluidTypeC: "Water",
            fluidInTempH: 60,
            fluidInTempC: 10,
            fluidOutTempH: 15,
            fluidOutTempC: 45,
            fluidMRateH: 140,
            fluidMRateC: 140,
            fluidMaxPDropH: 1000000,
            fluidMaxPDropC: 1000000,
            fluidFoulingH: fluidFoulingH,
            fluidFoulingC: fluidFoulingC
        }
        this.flow = {
            flowPassH: 2,
            flowPassC: 2
        }
    }



}