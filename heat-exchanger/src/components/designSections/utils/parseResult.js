export function parseRating(result) {
    const { config, heatTransfer, pressure } = result;
    return {
        "main": parseRatingMain(heatTransfer, pressure),
        "config": parseRatingConfig(config),
        "heatTransfer": parseRatingHeat(heatTransfer),
        "pressure": parseRatingPressure(pressure)
    }
}
export function parseSizing(result) {
    const { config, heatTransfer, pressure } = result;
    return {
        "main": parseSizingMain(heatTransfer, pressure),
        "config": parseSizingConfig(config),
        "heatTransfer": parseSizingHeat(heatTransfer),
        "pressure": parseSizingPressure(pressure)
    }
}

function parseRatingMain(heatTransfer, pressure) {
    return [
        {
            symbol: ["T", "o,c"],
            name: "Outlet Temperature of Cold Fluid (\xB0C)",
            value: heatTransfer[heatTransfer.length - 1].T_o_c_res
        },
        {
            symbol: ["T", "o,h"],
            name: "Outlet Temperature of Hot Fluid (\xB0C)",
            value: heatTransfer[heatTransfer.length - 1].T_o_h_res
        },
        {
            symbol: ["P", "t,c"],
            name: "Total Pressure Drop of Cold Fluid (Pa)",
            value: pressure.p_t_c
        },
        {
            symbol: ["P", "t,h"],
            name: "Total Pressure Drop of Hot Fluid (Pa)",
            value: pressure.p_t_h
        }
    ]
}
function parseRatingConfig(config) {
    return [
        {
            symbol: ["k", "p"],
            name: "Plate Heat Transfer Coefficient (W/m∙K)",
            value: config.k_p
        },
        {
            symbol: ["R", "c"],
            name: "Fouling Factor of Cold Fluid",
            value: config.R_c
        },
        {
            symbol: ["R", "h"],
            name: "Fouling Factor of Hot Fluid",
            value: config.R_h
        },
        {
            symbol: ["b"],
            name: "Mean Channel Flow Gap (m)",
            value: config.b
        },
        {
            symbol: ["D", "h"],
            name: "Hydraulic Diameter (m)",
            value: config.D_h
        },
        {
            symbol: ["A", "1p"],
            name: "Projected Plate Surface Area (m\u00B2)",
            value: config.A_1p
        },
        {
            symbol: ["A", "1"],
            name: "Plate Surface Area (m\u00B2)",
            value: config.A_1
        },
        {
            symbol: ["A", "t"],
            name: "Effective Surface Area (m\u00B2)",
            value: config.A_t
        },
        // {
        //     symbol: ["N", "cp,c"],
        //     name: "Number of Channel per Pass of Cold Fluid",
        //     value: config.N_cp_h
        // },
        // {
        //     symbol: ["N", "cp,h"],
        //     name: "Number of Channel per Pass of Hot Fluid",
        //     value: config.N_cp_c
        // },
        {
            symbol: ["G", "c,h"],
            name: "Channel Mass Velocity of Hot Fluid (kg/m\u00B2∙s)",
            value: config.G_c_h
        },
        {
            symbol: ["G", "c,c"],
            name: "Channel Mass Velocity of Cold Fluid (kg/m\u00B2∙s)",
            value: config.G_c_c
        }
    ]
}
function parseRatingHeat(heatTransfer) {
    const res = [];
    for (let i = 0; i < heatTransfer.length; i++) {
        const resData = [
            {
                symbol: ["T", "o,c"],
                name: "Initial Guess of Outlet Temperature, Cold Fluid (\xB0C)",
                value: heatTransfer[i].T_o_c
            },
            {
                symbol: ["T", "o,h"],
                name: "Initial Guess of Outlet Temperature, Hot Fluid (\xB0C)",
                value: heatTransfer[i].T_o_h
            },
            {
                symbol: ["\u03BC", "c"],
                name: "Property of Cold Fluid: Dynamic Viscosity (Pa∙s)",
                value: heatTransfer[i].mu_c
            },
            {
                symbol: ["C", "p,c"],
                name: "Property of Cold Fluid: Specifc Heat Capacity (J/kg∙K)",
                value: heatTransfer[i].Cp_c
            },
            {
                symbol: ["k", "c"],
                name: "Property of Cold Fluid: Thermal Conductivity (W/m∙K)",
                value: heatTransfer[i].k_c
            },
            {
                symbol: ["Pr", "c"],
                name: "Property of Cold Fluid: Prandtl Number",
                value: heatTransfer[i].Pr_c
            },
            {
                symbol: ["\u03BC", "h"],
                name: "Property of Hot Fluid: Dynamic Viscosity (Pa∙s)",
                value: heatTransfer[i].mu_h
            },
            {
                symbol: ["C", "p,h"],
                name: "Property of Hot Fluid: Specifc Heat Capacity (J/kg∙K)",
                value: heatTransfer[i].Cp_h
            },
            {
                symbol: ["k", "h"],
                name: "Property of Hot Fluid: Thermal Conductivity (W/m∙K)",
                value: heatTransfer[i].k_h
            },
            {
                symbol: ["Pr", "h"],
                name: "Property of Hot Fluid: Prandtl Number",
                value: heatTransfer[i].Pr_h
            },
            {
                symbol: ["Re", "c"],
                name: "Renold Number of Cold Fluid",
                value: heatTransfer[i].Re_c
            },
            {
                symbol: ["Re", "h"],
                name: "Renold Number of Hot Fluid",
                value: heatTransfer[i].Re_h
            },
            {
                symbol: ["Nu", "c"],
                name: "Nusselt Number of Cold Fluid",
                value: heatTransfer[i].Nu_c
            },
            {
                symbol: ["Nu", "h"],
                name: "Nusselt Number of Hot Fluid",
                value: heatTransfer[i].Nu_h
            },
            {
                symbol: ["h", "c"],
                name: "Heat Transfer Coefficient of Cold Fluid (W/m\u00B2∙K)",
                value: heatTransfer[i].h_c
            },
            {
                symbol: ["h", "h"],
                name: "Heat Transfer Coefficient of Hot Fluid (W/m\u00B2∙K)",
                value: heatTransfer[i].h_h
            },
            {
                symbol: ["U", "f"],
                name: "Over All Heat Transfer Coefficient (W/m\u00B2∙K)",
                value: heatTransfer[i].U_f
            },
            {
                symbol: ["NTU"],
                name: "Number of Transfer Unit",
                value: heatTransfer[i].NTU
            },
            {
                symbol: ["\u03B5"],
                name: "Heat Transfer Effectiveness",
                value: heatTransfer[i].epsilon
            },
            {
                symbol: ["Q"],
                name: "Actual Heat load (W)",
                value: heatTransfer[i].Q
            },
            {
                symbol: ["T", "o,c,res"],
                name: "Outlet Temperature of Cold Fluid (\xB0C)",
                value: heatTransfer[i].T_o_c_res
            },
            {
                symbol: ["T", "o,c,res"],
                name: "Outlet Temperature of Hot Fluid (\xB0C)",
                value: heatTransfer[i].T_o_h_res
            },
        ];
        res.push(resData);
    }
    return res;
}
function parseRatingPressure(pressure) {
    return [
        {
            symbol: ["\u03F1", "c"],
            name: "Density of Cold Fluid (kg/m\u00B3)",
            value: pressure.ro_c
        },
        {
            symbol: ["\u03F1", "h"],
            name: "Density of Hot Fluid (kg/m\u00B3)",
            value: pressure.ro_h
        },
        {
            symbol: ["P", "c,c"],
            name: "Channel Pressure Drop of Cold Fluid (Pa)",
            value: pressure.p_c_c
        },
        {
            symbol: ["P", "p,c"],
            name: "Port Pressure Drop of Cold Fluid (Pa)",
            value: pressure.p_p_c
        },
        {
            symbol: ["P", "t,c"],
            name: "Total Pressure Drop of Cold Fluid (Pa)",
            value: pressure.p_t_c
        },
        {
            symbol: ["P", "c,h"],
            name: "Channel Pressure Drop of Hot Fluid (Pa)",
            value: pressure.p_c_h
        },
        {
            symbol: ["P", "p,h"],
            name: "Port Pressure Drop of Hot Fluid (Pa)",
            value: pressure.p_p_h
        },
        {
            symbol: ["P", "t,h"],
            name: "Total Pressure Drop of Hot Fluid (Pa)",
            value: pressure.p_t_h
        }
    ]
}


function parseSizingMain(heatTransfer, pressure) {
    return [
        {
            symbol: ["N", "t"],
            name: "Total Number of Plates",
            value: heatTransfer[heatTransfer.length - 1].N_t
        },
        {
            symbol: ["P", "t,c"],
            name: "Total Pressure Drop of Cold Fluid (Pa)",
            value: pressure.p_t_c
        },
        {
            symbol: ["P", "t,h"],
            name: "Total Pressure Drop of Hot Fluid (Pa)",
            value: pressure.p_t_h
        }
    ]
}

function parseSizingConfig(config) {
    return [
        {
            symbol: ["\u03BC", "c"],
            name: "Property of Cold Fluid: Dynamic Viscosity (Pa∙s)",
            value: config.mu_c
        },
        {
            symbol: ["C", "p,c"],
            name: "Property of Cold Fluid: Specifc Heat Capacity (J/kg∙K)",
            value: config.Cp_c
        },
        {
            symbol: ["k", "c"],
            name: "Property of Cold Fluid: Thermal Conductivity (W/m∙K)",
            value: config.k_c
        },
        {
            symbol: ["Pr", "c"],
            name: "Property of Cold Fluid: Prandtl Number",
            value: config.Pr_c
        },
        {
            symbol: ["\u03BC", "h"],
            name: "Property of Hot Fluid: Dynamic Viscosity (Pa∙s)",
            value: config.mu_h
        },
        {
            symbol: ["C", "p,h"],
            name: "Property of Hot Fluid: Specifc Heat Capacity (J/kg∙K)",
            value: config.Cp_h
        },
        {
            symbol: ["k", "h"],
            name: "Property of Hot Fluid: Thermal Conductivity (W/m∙K)",
            value: config.k_h
        },
        {
            symbol: ["Pr", "h"],
            name: "Property of Hot Fluid: Prandtl Number",
            value: config.Pr_h
        },
        {
            symbol: ["b"],
            name: "Mean Channel Flow Gap (m)",
            value: config.b
        },
        {
            symbol: ["D", "h"],
            name: "Hydraulic Diameter (m)",
            value: config.D_h
        },
        {
            symbol: ["A", "1p"],
            name: "Projected Plate Surface Area (m\u00B2)",
            value: config.A_1p
        },
        {
            symbol: ["A", "1"],
            name: "Plate Surface Area (m\u00B2)",
            value: config.A_1
        }
    ]
}

function parseSizingHeat(heatTransfer) {
    const res = [];
    for (let i = 0; i < heatTransfer.length; i++) {
        const resData = [
            {
                symbol: ["Re", "c"],
                name: "Initial Guess of Renold Number, Cold Fluid",
                value: heatTransfer[i].Re_c
            },
            {
                symbol: ["Re", "h"],
                name: "Initial Guess of Renold Number, Hot Fluid",
                value: heatTransfer[i].Re_h
            },
            {
                symbol: ["Nu", "c"],
                name: "Nusselt Number of Cold Fluid",
                value: heatTransfer[i].Nu_c
            },
            {
                symbol: ["Nu", "h"],
                name: "Nusselt Number of Hot Fluid",
                value: heatTransfer[i].Nu_h
            },
            {
                symbol: ["h", "c"],
                name: "Heat Transfer Coefficient of Cold Fluid (W/m\u00B2∙K)",
                value: heatTransfer[i].h_c
            },
            {
                symbol: ["h", "h"],
                name: "Heat Transfer Coefficient of Hot Fluid (W/m\u00B2∙K)",
                value: heatTransfer[i].h_h
            },
            {
                symbol: ["U", "f"],
                name: "Over All Heat Transfer Coefficient (W/m\u00B2∙K)",
                value: heatTransfer[i].U_f
            },
            {
                symbol: ["LMTD"],
                name: "Log Mean Temperature Difference (\xB0C)",
                value: heatTransfer[i].LMTD
            },
            {
                symbol: ["NTU"],
                name: "Number of Transfer Unit",
                value: heatTransfer[i].NTU
            },
            {
                symbol: ["F"],
                name: "LMTD Correction Factor",
                value: heatTransfer[i].F
            },
            {
                symbol: ["T", "eff"],
                name: "Effective Temperature Differnece",
                value: heatTransfer[i].T_eff
            },
            {
                symbol: ["Q"],
                name: "Actual Heat load (W)",
                value: heatTransfer[i].Q
            },
            {
                symbol: ["A", "t"],
                name: "Effective Surface Area (m\u00B2)",
                value: heatTransfer[i].A_t
            },
            {
                symbol: ["G", "c,h"],
                name: "Channel Mass Velocity of Hot Fluid (kg/m\u00B2∙s)",
                value: heatTransfer[i].G_c_h
            },
            {
                symbol: ["G", "c,c"],
                name: "Channel Mass Velocity of Cold Fluid (kg/m\u00B2∙s)",
                value: heatTransfer[i].G_c_c
            },
            {
                symbol: ["Re", "c,res"],
                name: "Renold Number of Cold Fluid",
                value: heatTransfer[i].Re_c
            },
            {
                symbol: ["Re", "h,res"],
                name: "Renold Number of Hot Fluid",
                value: heatTransfer[i].Re_h
            }
        ];
        res.push(resData);
    }
    return res;
}

function parseSizingPressure(pressure) {
    return [
        {
            symbol: ["P", "c,c"],
            name: "Channel Pressure Drop of Cold Fluid (Pa)",
            value: pressure.p_c_c
        },
        {
            symbol: ["P", "p,c"],
            name: "Port Pressure Drop of Cold Fluid (Pa)",
            value: pressure.p_p_c
        },
        {
            symbol: ["P", "t,c"],
            name: "Total Pressure Drop of Cold Fluid (Pa)",
            value: pressure.p_t_c
        },
        {
            symbol: ["P", "c,h"],
            name: "Channel Pressure Drop of Hot Fluid (Pa)",
            value: pressure.p_c_h
        },
        {
            symbol: ["P", "p,h"],
            name: "Port Pressure Drop of Hot Fluid (Pa)",
            value: pressure.p_p_h
        },
        {
            symbol: ["P", "t,h"],
            name: "Total Pressure Drop of Hot Fluid (Pa)",
            value: pressure.p_t_h
        }
    ]
}